// Safety test: two trucks must never see or change each other's data.
// Run with: node tests/isolation.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const cfg = readFileSync(new URL("../src/lib/supabase/config.ts", import.meta.url), "utf8");
const URL_ = cfg.match(/"(https:\/\/[^"]+)"/)[1];
const KEY = cfg.match(/"(sb_publishable_[^"]+)"/)[1];
const opts = { auth: { persistSession: false, autoRefreshToken: false } };

let pass = 0, fail = 0;
const check = (ok, what) => { ok ? pass++ : fail++; console.log(`${ok ? "OK  " : "FAIL"}  ${what}`); };

async function makeTruck(label) {
  const c = createClient(URL_, KEY, opts);
  const email = `rb-test-${label}-${Date.now()}@example.com`;
  const { error } = await c.auth.signUp({ email, password: "testpassword123", options: { data: { truck_name: `Testbil ${label}`, city: "Malmö" } } });
  if (error) throw error;
  const { data: truck } = await c.from("trucks").select("*").single();
  return { c, truck };
}

const A = await makeTruck("A");
const B = await makeTruck("B");
check(A.truck?.name === "Testbil A" && B.truck?.name === "Testbil B", "Each truck sees exactly its own truck after sign-up");

// Orders
const { data: a1 } = await A.c.rpc("new_order");
const { data: a2 } = await A.c.rpc("new_order");
const { data: b1 } = await B.c.rpc("new_order");
check(a1?.number === 1 && a2?.number === 2 && b1?.number === 1, "Order numbers count separately per truck (A: 1,2  B: 1)");

const { data: bTrucks } = await B.c.from("trucks").select("*");
check(bTrucks.length === 1 && bTrucks[0].id === B.truck.id, "Truck B can only list its own truck");
const { data: bOrders } = await B.c.from("orders").select("*");
check(bOrders.length === 1 && bOrders.every((o) => o.truck_id === B.truck.id), "Truck B can only list its own orders");
const { data: peek } = await B.c.from("orders").select("*").eq("truck_id", A.truck.id);
check(peek.length === 0, "Truck B gets nothing when asking directly for Truck A's orders");

const { error: e1 } = await B.c.rpc("set_order_status", { order_id: a1.id, new_status: "ready" });
check(!!e1, "Truck B cannot mark Truck A's order as ready");
const { error: e2 } = await B.c.from("orders").insert({ truck_id: A.truck.id, number: 99 });
check(!!e2, "Truck B cannot add an order to Truck A");
const { error: e3, count: c3 } = await B.c.from("orders").delete({ count: "exact" }).eq("id", a1.id);
check(!!e3 || c3 === 0, "Truck B cannot delete Truck A's order");
const { data: upd } = await B.c.from("trucks").update({ name: "Hackad" }).eq("id", A.truck.id).select();
check(!upd || upd.length === 0, "Truck B cannot rename Truck A");
const { error: e4 } = await B.c.from("trucks").update({ next_number: 500 }).eq("id", B.truck.id);
check(!!e4, "A truck cannot set its own order counter directly (only via buttons)");
const { error: e5 } = await B.c.from("trucks").update({ owner_id: A.truck.owner_id }).eq("id", B.truck.id);
check(!!e5, "A truck cannot change who owns it");

await B.c.rpc("reset_numbers");
const { data: aAfter } = await A.c.from("orders").select("*").neq("status", "collected");
check(aAfter.length === 2, "Truck B pressing 'Reset numbers' does not affect Truck A");

// Logo storage
const png = new Blob([new Uint8Array([137, 80, 78, 71])], { type: "image/png" });
const { error: s1 } = await B.c.storage.from("logos").upload(`${A.truck.owner_id}/evil.png`, png);
check(!!s1, "Truck B cannot upload a logo into Truck A's folder");

// Public, logged-out visitor
const anon = createClient(URL_, KEY, opts);
const { data: anonT } = await anon.from("trucks").select("*");
const { data: anonO } = await anon.from("orders").select("*");
check((anonT ?? []).length === 0 && (anonO ?? []).length === 0, "A logged-out visitor cannot list trucks or orders");
const { data: disp } = await anon.rpc("get_display", { display_slug: A.truck.slug });
check(disp?.name === "Testbil A" && JSON.stringify(disp.preparing) === "[1,2]" && !("owner_id" in disp), "Public display shows only Truck A's numbers, name and look");
const { error: e6 } = await anon.rpc("new_order");
check(!!e6, "A logged-out visitor cannot create orders");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
