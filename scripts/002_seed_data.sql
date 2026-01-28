-- Insert default gas pricing (₦1,000 per kg)
INSERT INTO gas_pricing (price_per_kg) VALUES (1000.00);

-- Insert default cylinder products (refills)
INSERT INTO products (name, category, cylinder_size_kg, description, in_stock) VALUES
('3kg Gas Refill', 'cylinder', 3.0, 'Perfect for small households', true),
('6kg Gas Refill', 'cylinder', 6.0, 'Ideal for medium-sized families', true),
('12.5kg Gas Refill', 'cylinder', 12.5, 'Most popular size for homes', true),
('25kg Gas Refill', 'cylinder', 25.0, 'Great for large families', true),
('50kg Gas Refill', 'cylinder', 50.0, 'Commercial and bulk use', true);

-- Insert accessories
INSERT INTO products (name, category, price, description, in_stock) VALUES
('Gas Regulator', 'accessory', 3500.00, 'High-quality gas regulator', true),
('Gas Hose (1.5m)', 'accessory', 2000.00, 'Durable gas hose', true),
('Gas Hose (3m)', 'accessory', 3500.00, 'Extended length gas hose', true),
('Single Burner', 'accessory', 8500.00, 'Portable single burner', true),
('Double Burner', 'accessory', 15000.00, 'Table-top double burner', true),
('Gas Lighter', 'accessory', 500.00, 'Safety gas lighter', true);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, customer_location, rating, comment, is_active) VALUES
('Chioma Adeleke', 'Lekki, Lagos', 5, 'Fast delivery and professional service. I have been using BlueFlame Gas for over 2 years now. Highly recommended!', true),
('Ibrahim Musa', 'Wuse, Abuja', 5, 'Very reliable and their prices are fair. The delivery team is always on time and courteous.', true),
('Ngozi Okafor', 'GRA, Port Harcourt', 5, 'Best gas company in Nigeria! Safety is their priority and it shows in everything they do.', true),
('Tunde Bakare', 'Ikeja, Lagos', 4, 'Good service overall. Delivery was prompt and the staff were professional.', true);

-- Insert safety tips
INSERT INTO safety_tips (title, description, icon_name, is_active, display_order) VALUES
('Check for Leaks', 'Always check for gas leaks using soapy water. Never use a flame to detect leaks.', 'shield-alert', true, 1),
('Proper Ventilation', 'Ensure your kitchen is well-ventilated when using gas appliances.', 'wind', true, 2),
('Turn Off When Not in Use', 'Always turn off the gas cylinder valve when not cooking.', 'power', true, 3),
('Regular Maintenance', 'Service your gas appliances regularly and replace worn-out hoses.', 'wrench', true, 4),
('Keep Away from Heat', 'Store gas cylinders away from direct sunlight and heat sources.', 'flame', true, 5),
('Use Certified Products', 'Only use certified regulators, hoses, and accessories.', 'badge-check', true, 6);

-- Insert sample locations
INSERT INTO locations (name, address, city, state, phone, is_active) VALUES
('BlueFlame Gas - Lekki', '15 Admiralty Way, Lekki Phase 1', 'Lagos', 'Lagos', '+234 801 234 5678', true),
('BlueFlame Gas - Ikeja', '42 Obafemi Awolowo Way, Ikeja', 'Lagos', 'Lagos', '+234 802 345 6789', true),
('BlueFlame Gas - Abuja', '23 Gimbiya Street, Garki', 'Abuja', 'FCT', '+234 803 456 7890', true),
('BlueFlame Gas - Port Harcourt', '18 Aba Road, GRA', 'Port Harcourt', 'Rivers', '+234 804 567 8901', true);
