/*
# Wazir Trading LLC — Full Schema

1. New Tables
   - `cars`: Main vehicle listings with all specs, pricing, status
   - `car_images`: Multiple images per car (Cloudinary URLs)
   - `inquiries`: Customer inquiry/contact form submissions
   - `shipping_rates`: Shipping cost by destination port
   - `exchange_rates`: Live exchange rate cache (JPY to other currencies)

2. Security
   - RLS enabled on all tables
   - Public SELECT on cars, car_images, shipping_rates, exchange_rates (no auth needed)
   - Anon INSERT on inquiries (contact form)
   - Authenticated (admin) full CRUD on cars, car_images, shipping_rates, exchange_rates
   - Authenticated SELECT + UPDATE on inquiries (admin can manage)
*/

-- CARS TABLE
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number text UNIQUE NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price_usd numeric(10,2) NOT NULL,
  mileage integer,
  engine_cc integer,
  transmission text CHECK (transmission IN ('Automatic', 'Manual', 'CVT')),
  fuel_type text CHECK (fuel_type IN ('Petrol', 'Diesel', 'Hybrid', 'Electric')),
  drive_type text CHECK (drive_type IN ('2WD', '4WD', 'AWD')),
  color text,
  body_type text,
  steering text DEFAULT 'Right Hand Drive',
  doors integer,
  seats integer,
  chassis_number text,
  engine_number text,
  condition text DEFAULT 'Used' CHECK (condition IN ('Used', 'New')),
  grade text,
  description text,
  features text[],
  port_of_loading text DEFAULT 'Yokohama',
  status text DEFAULT 'Available' CHECK (status IN ('Available', 'Sold', 'Reserved', 'Pending')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- CAR IMAGES TABLE
CREATE TABLE IF NOT EXISTS car_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  url text NOT NULL,
  is_primary boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES cars(id) ON DELETE SET NULL,
  car_ref text,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  message text NOT NULL,
  status text DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at timestamptz DEFAULT now()
);

-- SHIPPING RATES TABLE
CREATE TABLE IF NOT EXISTS shipping_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_country text NOT NULL,
  destination_port text NOT NULL,
  roro_price_usd numeric(10,2),
  container_20ft_usd numeric(10,2),
  container_40ft_usd numeric(10,2),
  transit_days integer,
  notes text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- EXCHANGE RATES TABLE
CREATE TABLE IF NOT EXISTS exchange_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency text DEFAULT 'USD',
  target_currency text NOT NULL,
  rate numeric(15,6) NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_make ON cars(make);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_featured ON cars(featured);
CREATE INDEX IF NOT EXISTS idx_car_images_car_id ON car_images(car_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_car_id ON inquiries(car_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

-- CARS POLICIES (public read, authenticated admin write)
DROP POLICY IF EXISTS "public_select_cars" ON cars;
CREATE POLICY "public_select_cars" ON cars FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_cars" ON cars;
CREATE POLICY "admin_insert_cars" ON cars FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_cars" ON cars;
CREATE POLICY "admin_update_cars" ON cars FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_cars" ON cars;
CREATE POLICY "admin_delete_cars" ON cars FOR DELETE TO authenticated USING (true);

-- CAR IMAGES POLICIES
DROP POLICY IF EXISTS "public_select_car_images" ON car_images;
CREATE POLICY "public_select_car_images" ON car_images FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_car_images" ON car_images;
CREATE POLICY "admin_insert_car_images" ON car_images FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_car_images" ON car_images;
CREATE POLICY "admin_update_car_images" ON car_images FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_car_images" ON car_images;
CREATE POLICY "admin_delete_car_images" ON car_images FOR DELETE TO authenticated USING (true);

-- INQUIRIES POLICIES (anon can submit, authenticated admin can read/manage)
DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_inquiries" ON inquiries;
CREATE POLICY "admin_select_inquiries" ON inquiries FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_inquiries" ON inquiries;
CREATE POLICY "admin_update_inquiries" ON inquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_inquiries" ON inquiries;
CREATE POLICY "admin_delete_inquiries" ON inquiries FOR DELETE TO authenticated USING (true);

-- SHIPPING RATES POLICIES
DROP POLICY IF EXISTS "public_select_shipping_rates" ON shipping_rates;
CREATE POLICY "public_select_shipping_rates" ON shipping_rates FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_shipping_rates" ON shipping_rates;
CREATE POLICY "admin_insert_shipping_rates" ON shipping_rates FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_shipping_rates" ON shipping_rates;
CREATE POLICY "admin_update_shipping_rates" ON shipping_rates FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_shipping_rates" ON shipping_rates;
CREATE POLICY "admin_delete_shipping_rates" ON shipping_rates FOR DELETE TO authenticated USING (true);

-- EXCHANGE RATES POLICIES
DROP POLICY IF EXISTS "public_select_exchange_rates" ON exchange_rates;
CREATE POLICY "public_select_exchange_rates" ON exchange_rates FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_exchange_rates" ON exchange_rates;
CREATE POLICY "admin_insert_exchange_rates" ON exchange_rates FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_exchange_rates" ON exchange_rates;
CREATE POLICY "admin_update_exchange_rates" ON exchange_rates FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_exchange_rates" ON exchange_rates;
CREATE POLICY "admin_delete_exchange_rates" ON exchange_rates FOR DELETE TO authenticated USING (true);

-- SEED SHIPPING RATES
INSERT INTO shipping_rates (destination_country, destination_port, roro_price_usd, container_20ft_usd, container_40ft_usd, transit_days)
VALUES
  ('Kenya', 'Mombasa', 850, 1200, 1800, 28),
  ('Tanzania', 'Dar es Salaam', 900, 1250, 1900, 30),
  ('Uganda', 'Mombasa', 1050, 1450, 2100, 35),
  ('Zimbabwe', 'Durban', 950, 1350, 2000, 32),
  ('Zambia', 'Durban', 980, 1400, 2050, 34),
  ('Ghana', 'Tema', 1100, 1600, 2300, 35),
  ('Nigeria', 'Lagos', 1050, 1550, 2250, 32),
  ('South Africa', 'Durban', 900, 1300, 1950, 28),
  ('Mozambique', 'Maputo', 920, 1320, 1970, 30),
  ('Guyana', 'Georgetown', 1400, 2000, 2800, 45),
  ('Trinidad', 'Port of Spain', 1350, 1950, 2750, 42),
  ('Sri Lanka', 'Colombo', 750, 1100, 1650, 18),
  ('Pakistan', 'Karachi', 700, 1050, 1600, 16),
  ('Bangladesh', 'Chittagong', 720, 1080, 1620, 18),
  ('New Zealand', 'Auckland', 1200, 1700, 2400, 20)
ON CONFLICT DO NOTHING;

-- SEED EXCHANGE RATES
INSERT INTO exchange_rates (base_currency, target_currency, rate)
VALUES
  ('USD', 'JPY', 150.25),
  ('USD', 'KES', 129.50),
  ('USD', 'GBP', 0.79),
  ('USD', 'EUR', 0.92),
  ('USD', 'AED', 3.67),
  ('USD', 'ZAR', 18.50)
ON CONFLICT DO NOTHING;
