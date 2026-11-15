export type Truck = {
  id: string;
  owner_id: string;
  slug: string;
  name: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  is_open: boolean;
  logo_url: string | null;
  brand_color: string;
  language: string;
  next_number: number;
  created_at: string;
};

export type Order = {
  id: string;
  truck_id: string;
  number: number;
  status: "preparing" | "ready" | "collected";
  created_at: string;
  ready_at: string | null;
};
