# Competitors: "order ready" displays, KDS and queue systems for food trucks and takeaway (Sweden/Nordics and international)

Research date: 2026-11-15. Method: web search only. WebFetch was blocked by the session's network allowlist for vendor sites (onslip.com, ancon.io, purspot.com failed to resolve), so most findings come from search-result snippets of vendor pages and comparison sites, not full-page reads. Prices from snippets should be re-checked on the vendor page before publication. SEK conversions marked "approx." use rough rates (1 USD ~ 9.5 SEK, 1 GBP ~ 12.5 SEK, 1 EUR ~ 11 SEK, 1 NOK ~ 0.95 SEK). These rates are my own assumption, not sourced.

## 1. Which POS systems are common among Swedish food trucks and small takeaway businesses, and what order-ready/KDS/customer-display features do they include or sell, at what price?

### Takeaway
No reliable market-share data exists for Swedish food trucks. Zettle and SumUp are the default card/POS choices for small mobile sellers, and neither offers a pickup screen that customers can see: Zettle has only printed kitchen tickets (köksbong), and SumUp sells a KDS mainly in the UK. The Swedish restaurant POS vendors (Caspeco/Trivec, Ancon, Munu, OrderFood, PursPot, Kassacentralen) do offer KDS and pickup screens ("upphämtningsskärm", "gästskärm", "ordernummerskärm"), but they price by quote or per screen per month, sell them as part of a full restaurant setup, and often require long contracts.

### Cited Findings
**Market structure / small sellers**
- I found no reliable market-share figures for POS among Swedish food trucks. Comparison sites say five suppliers dominate Swedish card acceptance: Nets, Zettle, SumUp, Worldline and Swedbank Pay. — [kortterminal.se: Kortterminal jämförelse 2026](https://www.kortterminal.se/kortterminal-jamforelse)
- SumUp Solo has a built-in SIM card, which suits markets and food trucks. The Zettle Reader 2 needs a smartphone connected over Bluetooth. — [kortterminal.se: Zettle vs SumUp](https://www.kortterminal.se/zettle-vs-sumup)
- Reported Zettle card fees conflict: 1.30%, ~1.75% and 1.85% in different guides. SumUp is generally listed at 1.69%. — [kortterminal.se](https://www.kortterminal.se/zettle-vs-sumup); [kassaguiden.se](https://www.kassaguiden.se/basta-kassasystem)
- Swish: with Zettle, Swish runs through the Zettle app. SumUp has no Swish integration, so sellers use the separate Swish app. Swish in the terminal is reportedly offered only by Nets and Swedbank Pay. — [kortterminal.se: Kortterminal med Swish](https://www.kortterminal.se/kortterminal-med-swish)
- A 2026 Swedish guide says a food truck needs a mobile system that works on 4G, has an offline mode, a compact battery-powered terminal and a Swish button, and that the cash register must be certified (certifierat kassaregister). — [viralconvert.com: Kassasystem för food truck](https://viralconvert.com/kunskap/kassasystem-for-food-truck/)

**Zettle by PayPal**
- I found no evidence of a native Zettle KDS or customer order-status screen. Reseller feature lists show only "Köksbong" (printed kitchen ticket). The Zettle Terminal is a standalone 7-inch device without a built-in printer. — [Kassahuset: Zettle kassasystem för restaurang och café](https://www.kassahuset.se/webbutik/zettle/zettle-startpaket/zettle-kassasystem-restaurang/)

**SumUp (incl. Goodtill / "SumUp POS Pro")**
- SumUp KDS routes tickets to prep stations, and staff set statuses such as "In preparation" and "Completed" with a tap. Kiosk and QR orders also appear on it. — [SumUp setup: hospitality](https://setup.sumup.com/pos/hospitality)
- KDS pricing in sources: a third-party review says £9 per display per month on the Plus/Pro plans, excluding VAT (approx. 110 SEK). Older figures are a £599 quick-service bundle and Goodtill at £49 per till per month, which are probably outdated. — [MobileTransaction SumUp POS review](https://www.mobiletransaction.org/sumup-point-of-sale-review); [Caterer Licensee](https://catererlicensee.com/recommends/sumup23/)
- The KDS app is "SumUp POS Pro - KDS" (formerly Goodtill KDS) on the App Store. It is UK-focused, and I found no evidence that it is offered with the Swedish SumUp app. — [App Store](https://apps.apple.com/gb/app/goodtill-kds/id1369875998)
- SumUp also sells a self-order kiosk (SumUp Kiosk) in the UK and AU. — [SumUp Kiosk](https://sumup.com/en-gb/sumup-kiosk)

**Caspeco (now includes Trivec)**
- The Caspeco Checkout KDS manual says the köksskärm is used at kitchen stations instead of paper tickets and can drive an "upphämtningsskärm" that shows order status to guests. Removing a "Klar" order also removes it from the guest screen. Settings include a sound for new orders, item prices, auto-print and time thresholds for old orders. KDS tickets can be printed to put on the bag or tray. The doc is about 2 years old. — [Caspeco docs: KDS (Köksskärm)](https://portals.docsie.io/caspeco-ab/caspeco-ab-docs/caspeco-checkout/deployment_CcmuQqT6ksIW0vuFl/?doc=%2Fmanual-kassa%2Fkds-koksskarm%2F)
- Caspeco publishes no price list ("each solution is tailored"). Pricing depends on the modules chosen. — [businesswith.se: Caspeco](https://businesswith.se/system/caspeco/); [saasverket.se](https://saasverket.se/kassa/restaurang/)
- Trivec has been part of Caspeco since spring 2025. Trivec launched digital kitchen screens in 2019. One comparison site lists Trivec at 890 kr/month with a 36-month minimum term plus hardware. A full restaurant setup (fixed terminal, printer, card reader) often costs 15,000–25,000 kr. — [Trivec: Lansering av digitala köksskärmar](https://www.trivec.se/nyheter/lansering-av-digitala-koksskarmar/); [Trivec pris](https://www.trivec.se/produkter/kassasystem-restaurang/pris/); [saasverket.se](https://saasverket.se/kassa/restaurang/); [Caspeco: Trivec](https://caspeco.com/produkt/trivec-kassa/)

**Ancon**
- Ancon's restaurant page says a "gästskärm" can be added to the bongsystem (ticket system) "so the guest stays updated on their order". The price was not visible in the snippet, and the full page could not be fetched. — [Ancon: Kassasystem till restaurang](https://ancon.io/branscher/restaurang/)

**Munu (Nordic, Norway-based)**
- Munu Make is a KDS integrated with Munu POS, kiosk and webshop. It runs on commercial Android/iOS tablets or large kitchen screens and needs stable Wi-Fi and Munu Cloud. The reported price is 349 NOK per month per screen (approx. 330 SEK), which may have changed. Pickup notification was not confirmed. — [Munu Make](https://munu.cloud/product/munu-make/); [Munu KDS](https://munu.cloud/?p=2034)

**WEIQ**
- WEIQ markets a POS for food trucks from 0 SEK/month (you pay only the monthly fee plus a transaction fee) and supports card, Swish, Apple Pay and Google Pay. I found no WEIQ KDS or pickup-screen information. — [WEIQ cash register system](https://weiq.tech/en/cash-register-system/)

**Onslip**
- No information was retrievable. Search returned nothing relevant, and onslip.com was blocked from fetching. This is a gap.

**Other Swedish vendors with pickup screens**
- Kassacentralen (TruePOS): an "upphämtningsskärm" where orders sent from "Chef Channel" (KDS) show their order number on screen. — [Kassacentralen: restaurang](https://www.kassacentralen.se/branscher/restaurang/)
- PursPot: kitchen staff tick off finished orders on the KDS screen, and they appear on the customer's "OrderNummer-Skärm". Sold alongside self-service kiosks. — [PursPot: Expresskassa/kiosk](https://purspot.com/info/expresskassa-kiosk-sjalvbetjaning); [PursPot tillbehör](https://purspot.com/info/tillbehor)
- OrderFood.se: the KDS shows orders in columns from new to ready, with time since order. A separate guest screen shows the order number and optionally the guest's first name. Order number is printed on the receipt, and the customer can follow the order on a mobile order page. Staff mark an order ready with one tap. Pricing is "book a demo" only. — [OrderFood KDS](https://orderfood.se/funktioner/kds); [OrderFood](https://orderfood.se/)

**International POS (reference)**
- Square KDS (US): $30/month per device on Plus and $20/month on Premium (approx. 190–285 SEK). It is not available on the Free plan, and a paid plan is required. UK: from £15/month per device after a 30-day trial. Features: ticket routing, timers, real-time updates. Order-ready texts are for online/mobile pickup orders. I found no confirmed native customer-facing pickup screen. A Square community thread shows users asking for one, and a third party building it. — [Square pricing](https://squareup.com/us/en/pricing); [Square UK KDS](https://squareup.com/gb/en/point-of-sale/restaurants/kitchen-display-system); [Square Community: Pickup Display Screen](https://community.squareup.com/t5/Orders-Menu-Items-Catalog/Pickup-Display-Screen/m-p/657488)
- Toast has a KDS (platform docs). Toast is not sold in Sweden as far as I found. — [Toast KDS overview](https://doc.toasttab.com/doc/platformguide/platformKDSOverview.html)
- Lightspeed (K-Series) and Xenial support a dedicated "Order Ready" screen type with In Progress / Ready sections and configurable names per row. — [Xenial: create order ready display](https://resources.xenial.com/product-documentation/en/data-management/kitchen-settings/create-order-ready-display.html); [Lightspeed K-Series support](https://k-series-support.lightspeedhq.com/hc/articles/22708154090267)

### Inferences
- The POS systems that small Swedish food trucks most likely use (Zettle, SumUp, and simple Swish) have no Swedish customer-facing "order ready" screen. That is the clearest gap for ReadyBoard.
- Swedish vendors that do have pickup screens (Caspeco/Trivec, Ancon, PursPot, Kassacentralen, OrderFood, Munu) target sit-down or fixed-location restaurants. They sell by quote or demo, and Trivec has a 36-month term. That is a poor fit for a seasonal food truck.
- Per-screen KDS pricing clusters around 110–330 SEK/month (SumUp £9, Square $20–30, Munu 349 NOK, Fresh $16–20) and usually requires an underlying paid POS plan.

### Gaps
- Onslip, Weiq and Ancon KDS/guest-screen prices are not found (sites not fetchable, and no snippet prices).
- No market-share data for POS among Swedish food trucks. A survey or interviews would be needed.
- Whether Zettle has any third-party KDS integration via its API in Sweden was not confirmed.
- Whether SumUp KDS is available in Sweden was not confirmed.

## 2. Dedicated order-ready / queue display products: features, pricing, limitations

### Takeaway
Standalone options fall into four groups:
- **Cloud KDS with SMS:** Fresh KDS, about $16–20 per screen per month.
- **Simple order-number TV apps:** OrderReady.app, $19.99/month, with a free tier capped at 10 orders per day.
- **Enterprise queue software:** Qminder at hundreds of USD per month, Waitwhile from about $0–55 per month.
- **Hardware:** pagers and pucks (about 1,700–12,000 SEK for a kit), and Swedish LED "Nu betjänas" number displays (about 3,500–6,000 SEK excl. VAT).

None of them is Swedish-language, web-only and food-truck-priced.

### Cited Findings
**Fresh KDS (Fresh Technology, international)**
- A third-party 2026 review lists the per-screen plan at $16/month each with a free trial. It can text the customer when the order is ready, and costs creep up with many stations. — [MakerStack: Fresh KDS review 2026](https://makerstack.co/reviews/fresh-kds-review/)
- Fresh's food-truck page lists $20 per month per screen (approx. 190 SEK). — [Fresh: KDS for Food Trucks](https://www.fresh.technology/restaurants/food-trucks)
- Fresh's API includes the customer phone in E.164 format and an SMS opt-in flag. — [Fresh KDS API docs](https://fresh-technology.github.io/fresh.kds.docs.mobile-local-network-integration/docs/api/api_kds_orders)
- Fresh integrates with Lightspeed, Arryved, ROLLER and others. Its subscription is billed separately from the POS. — [Lightspeed: Fresh KDS](https://www.lightspeedhq.com/uk/integrations/fresh-kds/); [Arryved: FreshKDS integration](https://support.arryved.com/portal/en/kb/articles/freshkds-integration-overview)

**Order-number display apps**
- OrderReady.app: a phone app connected to a smart TV or PC monitor, where staff enter ready numbers. The free tier is a maximum of 10 order numbers per day. The full version is $19.99/month or $199.99/year (approx. 190 SEK/month). It has a web demo. — [OrderReady pricing](https://www.orderready.app/pricing.do); [OrderReady](https://www.orderready.app/)
- "OrderReady TV Screen Alert" (App Store): free with in-app purchases, needs iPadOS 11+, and is an order-number TV display. — [App Store](https://apps.apple.com/ph/app/orderready-tv-screen-alert/id1420383805)
- ZiiADS (App Store, iPad): free "order activity display screen" that alerts customers when orders are ready. It has few reviews. — [App Store](https://apps.apple.com/us/app/-/id6456042603)
- Open-source example (GitHub): staff tap Ready on a phone, and the number shows on the TV with a chime. It runs on a self-hosted Python/Flask server. — [GitHub: order-ready](https://github.com/Lady-Pickle/order-ready)
- Epson TrueOrder KDS customer-facing display: the order number shows as Preparing, then moves to a Ready queue when bumped. — [Epson TrueOrder CFD manual (PDF)](https://files.support.epson.com/pdf/pos/kds/111-56-qum-001_r3.36_trueorder_kds_customer_facing_display-quick_user_manual.pdf)
- Danish nemtakeaway.dk sells "display screens" for takeaway pickup (Nordic competitor). Details were not retrieved. — [nemtakeaway: Display screens](https://www.nemtakeaway.dk/en/display-screens/)

**Queue management software**
- Qminder: sources conflict.
  - A recent comparison says $869/month with unlimited locations.
  - Another listing says Business $869/month and Premium $1,149/month.
  - Toolradar says $789/month, and GetApp $429.
  - An older Qminder support page says $249/month per location.
  It is clearly enterprise-priced. — [hackceleration: best queue management software 2026](https://hackceleration.com/labs/best/queue-management-software); [Toolradar: Qminder pricing](https://toolradar.com/tools/qminder/pricing); [Qminder support: pricing](https://support.qminder.com/en/articles/2308106-pricing)
- Waitwhile: Free ($0, up to 50 visits/month, 1 location), Starter $31, Business $55, Enterprise custom. — [Toolradar: Waitwhile pricing](https://toolradar.com/tools/waitwhile/pricing); [GetApp: Waitwhile](https://www.getapp.com/waitlist-software/a/waitwhile)
- TablesReady (US) markets SMS-based paging as a replacement for pagers ("why they suck"). — [TablesReady: restaurant pagers](https://tablesready.com/blog/restaurant-pagers)

**Pagers / pucks (hardware)**
- General pricing: basic pager systems run $200–500, advanced $1,000–5,000, and individual pagers $10–60+. A VEVOR 10-buzzer kit costs $69.99. — [TablesReady: best restaurant pager systems](https://tablesready.com/blog/best-restaurant-pager-systems)
- LRS Guest Connect Pager Kit 15 costs $1,188 (approx. 11,300 SEK). — [LRS shop](https://shop.lrsus.com/collections/all/products/lrs-connect-guest-pager-pro-kit)
- A Norwegian retailer sells a generic 20-coaster pager kit for NOK 1,749 (list price NOK 2,599) plus NOK 86.99 shipping. — [Fruugo Norge](https://www.fruugonorge.com/restaurant-pager-system-20-pagers-wireless-coaster-style-for-hotels-bars-restaurants-efficient-communication-and-order-management/p-425064923-893334990)
- AllCall (Sweden): pucksystem/personsökare for restaurants, plus "AllCall Kösystem på skärm", a TV-screen queue system that needs no integration, comes pre-programmed and shows the next number when a transmitter is pressed. Pricing is on request. — [AllCall: Kösystem på skärm](https://www.allcall.se/allcall-kosystem-pa-skarm/); [AllCall: restaurang](https://www.allcall.se/restaurang/)
- Trivec/Caspeco also sells a pager system for restaurants. — [Trivec: Pager system](https://trivec.dev.swace.se/?p=12417)

**Swedish kösystem / nummerlapp vendors**
- Kassakungen: 3-digit red LED number display with removable "Nu betjänas" sign (43×8 cm), for indoor use, 5,990 kr excl. VAT. — [Kassakungen](https://kassakungen.se/restaurang-turnummersystem-3-siffrig-k%C3%B6system.html)
- Enetto: Meto D900 Pro package at 3,495 SEK. Both Enetto and Kassakungen cite a "ca pris i handeln" (approx. retail price) of 17,950 kr. — [Enetto](https://enetto.com/restaurang-turnummersystem-3-siffrig-k%C3%B6system.html); [Enetto kösystem](https://enetto.com/kosystem)
- Nemo-Q: claims to be "Sveriges ledande" (Sweden's leading) supplier of queue systems, ticket systems and digital queue tickets since 1978, with multi-language touchscreens. — [Nemo-Q](https://www.nemoq.se/)
- Tingstad sells number dispensers, tickets and "My-Turn" smart queue systems. — [Tingstad kösystem](https://www.tingstad.com/se-sv/skyltning-kosystem/kosystem)
- Amazon.se sells generic wireless "take a number" systems (1 keypad + 2 screens). — [Amazon.se](https://www.amazon.se/Tr%C3%A5dl%C3%B6st-k%C3%B6system-Paging-V%C3%A4ntenummersystem-Kundnummersystem/dp/B0BD4CLHPT)

**Generic KDS cost benchmarks**
- A tablet-based KDS costs $150–600 per station, and a commercial touchscreen $400–1,500 per station. Software adds about $20–100+ per screen per month. — [Menusifu: KDS price](https://www.menusifu.com/blog/kitchen-display-system-price)
- Ordering Stack's KDS module costs 17 EUR/month per location and per KDS. The page is about 3.5 years old. — [Ordering Stack pricing](https://orderingstack.com/pricing)

### Inferences
- The closest direct competitor to ReadyBoard is OrderReady.app: phone input to a TV, around 190 SEK/month, with a 10-orders/day free tier. It is English and US-focused, with no evidence of Swedish localization.
- Swedish LED "Nu betjänas" displays and pucks are one-off hardware purchases (about 1,700–12,000 SEK). They are mains-powered or indoor, have no customer phone notification, and nothing to integrate.
- Queue software (Qminder, Waitwhile) is built for service businesses (clinics, retail) and is overkill or overpriced for a food truck, although Waitwhile's free tier offers SMS-style waitlists.

### Gaps
- No App Store or Google Play review content and no Trustpilot/Capterra review text was retrieved for the small apps (OrderReady, ZiiADS). Review volume appears low.
- AllCall, Nemo-Q and Ancon gästskärm prices are not public.
- Bump/QSR Automations (ConnectSmart) pricing was not researched. It is enterprise, quote-based (from my background knowledge, not verified).
- Smart Order Ready Board apps, Smiirl, and Google Play-specific apps were not covered within the search budget.

## 3. Which features are standard vs differentiating?

### Takeaway
Standard across KDS and pickup-screen products:
- Order number on a screen
- New → In progress → Ready → Picked up status columns
- A sound on new or ready orders
- Tap-to-bump
- Timers and old-order thresholds
- Sync with POS orders

Differentiators:
- SMS or mobile web-page notification
- Showing the customer's first name
- Multi-station routing
- Ticket printing for bags
- Kiosk/QR/online order integration
- Analytics
- Offline/local-network operation

### Cited Findings
- Status workflow: New → Preparing → Ready → Delivered, with every screen updating live. — [PHP Point of Sale KDS](https://support.phppointofsale.com/hc/en-us/articles/53267450537876)
- Ready on the KDS triggers both a customer notification and a pickup screen (Snackpass). — [Snackpass KDS](https://www.snackpass.co/kitchen-display-system)
- Order Ready screens with In Progress / Ready sections and a configurable number of names per row. — [Xenial](https://resources.xenial.com/product-documentation/en/data-management/kitchen-settings/create-order-ready-display.html)
- New-order sound, show prices, auto-print, old-order time thresholds and printing for bag/tray (Caspeco). — [Caspeco docs](https://portals.docsie.io/caspeco-ab/caspeco-ab-docs/caspeco-checkout/deployment_CcmuQqT6ksIW0vuFl/?doc=%2Fmanual-kassa%2Fkds-koksskarm%2F)
- Columns from new to ready with elapsed time, guest screen with number plus optional first name, and a customer order page on mobile (OrderFood). — [OrderFood KDS](https://orderfood.se/funktioner/kds); [OrderFood](https://orderfood.se/)
- SMS ready alerts (Fresh KDS; Square for online orders). — [MakerStack](https://makerstack.co/reviews/fresh-kds-review/); [Square pricing](https://squareup.com/us/en/pricing)
- Ticket routing to stations, timers, kiosk/QR tickets (SumUp, Square). — [SumUp setup](https://setup.sumup.com/pos/hospitality); [Square UK KDS](https://squareup.com/gb/en/point-of-sale/restaurants/kitchen-display-system)
- Fresh KDS offers a local-network API, which suggests it can run without the cloud on a LAN. — [Fresh KDS API docs](https://fresh-technology.github.io/fresh.kds.docs.mobile-local-network-integration/docs/api/api_kds_orders)
- A chime on ready, and a phone used as the input device (open-source café board). — [GitHub: order-ready](https://github.com/Lady-Pickle/order-ready)

### Inferences
- Table stakes for ReadyBoard:
  - Big readable numbers in two columns ("Tillagas" / "Klar att hämta")
  - A chime
  - Tap-to-ready on a phone
  - Auto-clear after pickup or a timeout
- Low-cost differentiators no small competitor bundles together:
  - Customer QR code on the receipt or ticket, giving a live status web page with browser vibration/sound, instead of SMS (no SMS cost)
  - Swedish UI
  - Works on any browser or TV
  - Offline-tolerant behaviour

### Gaps
- No sourced data on which features small operators value most (would need user interviews or app-review mining).

## 4. What do these products lack for small mobile food trucks?

### Takeaway
The main gaps for food trucks are:
- **Price model:** quote-only, multi-year contracts, per-screen fees on top of a paid POS plan.
- **Ecosystem lock-in:** the pickup screen works only with that vendor's POS, and Zettle/SumUp Sweden have none.
- **Hardware:** commercial screens, indoor LED displays, pagers that get lost.
- **Connectivity:** stable Wi-Fi assumed.
- **Language:** the cheap standalone apps are English-only.

### Cited Findings
- Caspeco/Trivec have no public price list, and Trivec is reported at 890 kr/month on a 36-month term plus 15,000–25,000 kr setup. — [saasverket.se](https://saasverket.se/kassa/restaurang/); [Trivec pris](https://www.trivec.se/produkter/kassasystem-restaurang/pris/)
- Square KDS is not available on the Free plan and requires a paid subscription. — [Square pricing](https://squareup.com/us/en/pricing)
- Munu Make needs stable Wi-Fi and Munu Cloud. — [Munu Make](https://munu.cloud/product/munu-make/)
- Fresh per-screen pricing "creeps up" in multi-station setups. — [MakerStack](https://makerstack.co/reviews/fresh-kds-review/)
- The OrderReady free tier is capped at 10 order numbers per day. — [OrderReady pricing](https://www.orderready.app/pricing.do)
- The Kassakungen LED queue display is for indoor use only. — [Kassakungen](https://kassakungen.se/restaurang-turnummersystem-3-siffrig-k%C3%B6system.html)
- Pagers are criticized for cost, loss and hygiene (vendor of an SMS alternative, so biased). — [TablesReady](https://tablesready.com/blog/restaurant-pagers)
- Food trucks need 4G operation and offline mode. — [viralconvert.com](https://viralconvert.com/kunskap/kassasystem-for-food-truck/)
- Zettle has only printed köksbong, with no screen. — [Kassahuset](https://www.kassahuset.se/webbutik/zettle/zettle-startpaket/zettle-kassasystem-restaurang/)
- Square users ask in the community forum for a pickup display screen, and a third party is building one. This shows unmet demand even in a large ecosystem. — [Square Community](https://community.squareup.com/t5/Orders-Menu-Items-Catalog/Pickup-Display-Screen/m-p/657488)

### Inferences
- ReadyBoard's positioning gap is a POS-independent, Swedish-language, browser-based board that runs on a phone (input) plus any tablet, old laptop or TV (display), over mobile hotspot.
  - Suggested price: free tier, then roughly 49–99 SEK/month. This is below every per-screen KDS found (about 110–330 SEK/month) and cheaper than buying an LED display (3,500–6,000 SEK) or pagers (about 1,700+ SEK).
  - Being POS-independent means it works alongside Zettle, SumUp and Swish without integration.
- An optional customer QR code giving a status page replaces both pagers and SMS fees. Few small competitors offer this without a full ordering platform (OrderFood does, but as part of a larger system).
- Risks:
  - Swedish POS vendors could add a free pickup screen.
  - OrderReady.app or similar could localize.
  - Manual number entry is a double-entry burden when the truck already uses a POS. Mitigations are auto-incrementing numbers and matching the POS receipt number.

### Gaps
- No sourced evidence on outdoor screen readability, battery use or 4G data usage for web-based boards. This needs testing.
- No direct Swedish food-truck operator testimony about pickup-display needs was found.
- Swedish kassaregister/certification rules on order numbering (whether a separate board affects compliance) were not researched here.
