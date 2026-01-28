-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gas pricing table (single row with price per kg)
CREATE TABLE IF NOT EXISTS gas_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  price_per_kg DECIMAL(10, 2) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Products/Accessories table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cylinder', 'accessory')),
  price DECIMAL(10, 2),
  cylinder_size_kg DECIMAL(5, 2),
  image_url TEXT,
  description TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_whatsapp TEXT,
  customer_address TEXT NOT NULL,
  delivery_date TEXT,
  items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_location TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safety tips table
CREATE TABLE IF NOT EXISTS safety_tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations/Stations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT,
  google_maps_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gas_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can read gas pricing" ON gas_pricing FOR SELECT USING (true);
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (in_stock = true);
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active safety tips" ON safety_tips FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active locations" ON locations FOR SELECT USING (is_active = true);

-- RLS Policies for public insert (orders and newsletter)
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users only)
CREATE POLICY "Admins can do everything on gas_pricing" ON gas_pricing FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can read all orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on safety_tips" ON safety_tips FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on locations" ON locations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can read newsletter subscribers" ON newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');
