-- Add new pricing table for dual gas types (cooking vs industrial)
CREATE TABLE IF NOT EXISTS gas_pricing_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gas_type TEXT UNIQUE NOT NULL CHECK (gas_type IN ('cooking', 'industrial')),
  price_per_kg DECIMAL(10, 2) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Add services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url TEXT,
  icon_name TEXT,
  in_stock BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add newsletter content table
CREATE TABLE IF NOT EXISTS newsletter_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add image storage metadata table
CREATE TABLE IF NOT EXISTS uploaded_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  file_url TEXT NOT NULL,
  entity_type TEXT, -- 'product', 'service', 'newsletter'
  entity_id UUID,
  uploaded_by UUID REFERENCES admin_users(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE gas_pricing_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can read gas pricing types" ON gas_pricing_types FOR SELECT USING (true);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (in_stock = true);
CREATE POLICY "Public can read published newsletters" ON newsletter_content FOR SELECT USING (status = 'published');

-- RLS Policies for admin operations
CREATE POLICY "Admins can do everything on gas pricing types" ON gas_pricing_types FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on newsletter content" ON newsletter_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on uploaded files" ON uploaded_files FOR ALL USING (auth.role() = 'authenticated');

-- Insert default pricing for cooking and industrial gas
INSERT INTO gas_pricing_types (gas_type, price_per_kg) VALUES 
('cooking', 1000.00),
('industrial', 900.00)
ON CONFLICT (gas_type) DO NOTHING;

-- Insert services
INSERT INTO services (name, description, price, display_order, in_stock) VALUES
('Gas Cooker Repairs', 'Professional repair service for your gas cookers', 5000.00, 1, true),
('Gas Cooker Installation', 'Expert installation of gas cookers and stoves', 8000.00, 2, true),
('Cylinder Repainting', 'Professional cylinder repainting and refurbishment', 3000.00, 3, true),
('Home Delivery', 'Fast and reliable home delivery service', 500.00, 4, true),
('Pressure Regulator Installation', 'Install and calibrate pressure regulators', 4000.00, 5, true),
('Safety Inspection', 'Comprehensive safety check of your gas system', 2000.00, 6, true)
ON CONFLICT DO NOTHING;
