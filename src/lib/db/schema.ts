import { sql } from './connection'

export async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      description TEXT DEFAULT '',
      price DECIMAL(10,2) NOT NULL,
      original_price DECIMAL(10,2),
      category TEXT NOT NULL,
      image TEXT DEFAULT '',
      unit TEXT DEFAULT 'kg',
      weight TEXT DEFAULT '1 kg',
      stock INTEGER DEFAULT 0,
      sku TEXT DEFAULT '',
      rating DECIMAL(3,2) DEFAULT 0,
      reviews INTEGER DEFAULT 0,
      is_on_sale BOOLEAN DEFAULT false,
      is_best_seller BOOLEAN DEFAULT false,
      is_new BOOLEAN DEFAULT false,
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      subtotal DECIMAL(10,2) NOT NULL,
      shipping DECIMAL(10,2) DEFAULT 0,
      tax DECIMAL(10,2) DEFAULT 0,
      status TEXT DEFAULT 'pending',
      payment_method TEXT DEFAULT '',
      shipping_address JSONB DEFAULT '{}',
      notes TEXT DEFAULT '',
      tracking_number TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT DEFAULT ''`

  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      image TEXT DEFAULT ''
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      orders_count INTEGER DEFAULT 0,
      total_spent DECIMAL(10,2) DEFAULT 0,
      join_date DATE DEFAULT CURRENT_DATE,
      status TEXT DEFAULT 'active',
      address JSONB DEFAULT '{}'
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      image TEXT DEFAULT '',
      product_count INTEGER DEFAULT 0,
      description TEXT DEFAULT ''
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS product_variations (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      price_adjustment DECIMAL(10,2) DEFAULT 0,
      stock INTEGER DEFAULT 0,
      sku_suffix TEXT DEFAULT ''
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS product_add_ons (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      max_select INTEGER DEFAULT 1,
      required BOOLEAN DEFAULT false
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'customer',
      phone TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS promotions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      discount_type TEXT DEFAULT 'percentage',
      discount_value DECIMAL(10,2) DEFAULT 0,
      min_purchase DECIMAL(10,2) DEFAULT 0,
      start_date TIMESTAMP DEFAULT NOW(),
      end_date TIMESTAMP,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS returns (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id),
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      product_name TEXT DEFAULT '',
      reason TEXT DEFAULT '',
      status TEXT DEFAULT 'pending',
      refund_amount DECIMAL(10,2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS audit_log (
      id SERIAL PRIMARY KEY,
      action TEXT NOT NULL,
      entity TEXT DEFAULT '',
      entity_id TEXT DEFAULT '',
      user_name TEXT DEFAULT '',
      details TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS store_settings (
      key TEXT PRIMARY KEY,
      value TEXT DEFAULT '',
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS shipping_rules (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      min_order DECIMAL(10,2) DEFAULT 0,
      cost DECIMAL(10,2) DEFAULT 0,
      estimated_days TEXT DEFAULT '3-5',
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS resellers (
      id TEXT PRIMARY KEY,
      store_name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      owner_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      description TEXT DEFAULT '',
      logo TEXT DEFAULT '',
      cover_image TEXT DEFAULT '',
      address TEXT DEFAULT '',
      city TEXT DEFAULT '',
      website TEXT DEFAULT '',
      specialties TEXT[] DEFAULT '{}',
      status TEXT DEFAULT 'active',
      has_app BOOLEAN DEFAULT true,
      products_count INTEGER DEFAULT 0,
      rating DECIMAL(3,2) DEFAULT 0,
      joined_at TIMESTAMP DEFAULT NOW()
    );
  `

  console.log('Tables created successfully')
}

export async function seedData() {
  const existingProducts = await sql`SELECT COUNT(*) FROM products`
  if (existingProducts[0].count > 0) {
    console.log('Data already seeded, skipping')
    return
  }

  await sql`
    INSERT INTO categories (id, name, slug, image, product_count, description) VALUES
      ('c1', 'Fresh Fish', 'fresh-fish', '/images/fresh-fish.jpg', 12, 'Whole and filleted fish caught daily'),
      ('c2', 'Shrimp & Prawns', 'shrimp-prawns', '/images/shrimp.jpg', 8, 'Gulf shrimp, tiger prawns, and more'),
      ('c3', 'Crabs & Lobsters', 'crabs-lobsters', '/images/crab.jpg', 6, 'Live and fresh crabs and lobsters'),
      ('c4', 'Shellfish', 'shellfish', '/images/shellfish.jpg', 7, 'Oysters, clams, mussels, scallops'),
      ('c5', 'Value Packs', 'value-packs', '/images/value-packs.jpg', 5, 'Curated seafood boxes and bundles'),
      ('c6', 'Smoked & Cured', 'smoked-cured', '/images/smoked.jpg', 4, 'Premium smoked and cured seafood')
  `

  await sql`
    INSERT INTO products (id, name, slug, description, price, original_price, category, image, unit, weight, stock, sku, rating, reviews, is_best_seller, is_on_sale, is_new) VALUES
      ('p1', 'Fresh Bangus (Milkfish)', 'fresh-bangus-milkfish', 'Premium fresh bangus from Navotas Fish Port, cleaned and ready to cook.', 180, NULL, 'Fresh Fish', 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop', 'kg', '1 kg', 50, 'FF-001', 4.8, 124, true, false, false),
      ('p2', 'Tilapia (Whole)', 'tilapia-whole', 'Farm-fresh whole tilapia, perfect for pan-frying or steaming.', 140, 160, 'Fresh Fish', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop', 'kg', '1 kg', 80, 'FF-002', 4.6, 98, false, true, false),
      ('p3', 'Tuna Belly (Fresh)', 'tuna-belly-fresh', 'Premium fresh tuna belly, perfect for sashimi and grilling.', 450, NULL, 'Fresh Fish', 'https://images.unsplash.com/photo-1564049489317-60d5ff2f6e10?w=400&h=300&fit=crop', 'kg', '500 g', 25, 'FF-003', 4.9, 67, true, false, false),
      ('p4', 'Yellowfin Tuna Steaks', 'yellowfin-tuna-steaks', 'Thick-cut yellowfin tuna steaks, sushi-grade quality.', 380, NULL, 'Fresh Fish', 'https://images.unsplash.com/photo-1599084993091-1cb5c07d2e1e?w=400&h=300&fit=crop', 'kg', '500 g', 30, 'FF-004', 4.7, 45, false, false, true),
      ('p5', 'Giant Tiger Prawns', 'giant-tiger-prawns', 'Jumbo tiger prawns, perfect for grilling or butter garlic preparation.', 650, 750, 'Shrimp & Prawns', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', 'kg', '1 kg', 20, 'SP-001', 4.8, 89, true, true, false),
      ('p6', 'Sugpo (Prawns) Large', 'sugpo-prawns-large', 'Large fresh sugpo, ideal for sinigang and grilled dishes.', 520, NULL, 'Shrimp & Prawns', 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop', 'kg', '1 kg', 35, 'SP-002', 4.5, 56, false, false, false),
      ('p7', 'Alaskan King Crab Legs', 'alaskan-king-crab-legs', 'Premium Alaskan king crab legs, pre-cooked and frozen at sea.', 1800, NULL, 'Crabs & Lobsters', 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=300&fit=crop', 'kg', '1 kg', 10, 'CL-001', 4.9, 34, true, false, false),
      ('p8', 'Mud Crab (Alimango)', 'mud-crab-alimango', 'Live fresh mud crabs, known for sweet and tender meat.', 750, NULL, 'Crabs & Lobsters', 'https://images.unsplash.com/photo-1590633841860-2f4b1e0fb39a?w=400&h=300&fit=crop', 'kg', '1 kg', 15, 'CL-002', 4.7, 72, false, false, false),
      ('p9', 'Maine Lobster (Live)', 'maine-lobster-live', 'Live Maine lobsters shipped directly to your door.', 1500, NULL, 'Crabs & Lobsters', 'https://images.unsplash.com/photo-1563120094-5f6b8c3cac2c?w=400&h=300&fit=crop', 'kg', '1 kg', 8, 'CL-003', 4.8, 41, false, false, true),
      ('p10', 'Fresh Oysters (12pcs)', 'fresh-oysters', 'Fresh shucked oysters on the half shell.', 280, NULL, 'Shellfish', 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', 'dozen', '12 pcs', 40, 'SF-001', 4.6, 88, false, false, false),
      ('p11', 'Sea Scallops (Large)', 'sea-scallops-large', 'Large diver sea scallops, dry-packed and chemical-free.', 890, NULL, 'Shellfish', 'https://images.unsplash.com/photo-1599733589046-10c7f0d2d48e?w=400&h=300&fit=crop', 'kg', '500 g', 18, 'SF-002', 4.7, 53, true, false, false),
      ('p12', 'Halaan (Clams)', 'halaan-clams', 'Fresh clean halaan, perfect for soups and pasta.', 120, NULL, 'Shellfish', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop', 'kg', '1 kg', 60, 'SF-003', 4.4, 112, false, false, false),
      ('p13', 'Seafood Platter for 4', 'seafood-platter-4', 'Curated platter with prawns, fish fillets, squid, mussels, and clams.', 1200, 1500, 'Value Packs', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', 'pack', '2.5 kg', 15, 'VP-001', 4.8, 29, true, true, false),
      ('p14', 'Grill Pack (2kg)', 'grill-pack-2kg', 'Assorted seafood perfect for BBQ: tuna steaks, prawns, squid, and bangus.', 950, NULL, 'Value Packs', 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop', 'pack', '2 kg', 12, 'VP-002', 4.6, 37, false, false, false),
      ('p15', 'Smoked Salmon (Premium)', 'smoked-salmon-premium', 'Norwegian-style cold smoked salmon, thinly sliced.', 680, NULL, 'Smoked & Cured', 'https://images.unsplash.com/photo-1599084993091-1cb5c07d2e1e?w=400&h=300&fit=crop', 'kg', '200 g', 22, 'SC-001', 4.7, 63, false, false, false),
      ('p16', 'Dried Fish (Daing) Assorted', 'dried-fish-daing', 'Traditional sun-dried fish selection. Includes danggit, tuyo, and dilis.', 180, NULL, 'Smoked & Cured', 'https://images.unsplash.com/photo-1564049489317-60d5ff2f6e10?w=400&h=300&fit=crop', 'kg', '500 g', 45, 'SC-002', 4.3, 156, false, false, true)
  `

  await sql`
    INSERT INTO customers (id, name, email, phone, orders_count, total_spent, join_date, status) VALUES
      ('cu1', 'Maria Santos', 'maria@example.com', '+639123456789', 15, 24500, '2025-06-15', 'vip'),
      ('cu2', 'James Okonkwo', 'james@example.com', '+2348012345678', 3, 1850, '2026-01-20', 'active'),
      ('cu3', 'Priya Menon', 'priya@example.com', '+919876543210', 8, 12400, '2025-11-05', 'active'),
      ('cu4', 'Carlos Reyes', 'carlos@example.com', '+13055551234', 1, 540, '2026-03-01', 'inactive'),
      ('cu5', 'Aiko Tanaka', 'aiko@example.com', '+819012345678', 6, 8900, '2025-09-12', 'vip'),
      ('cu6', 'Lena Müller', 'lena@example.com', '+491512345678', 1, 320, '2026-03-18', 'active'),
      ('cu7', 'Raj Patel', 'raj@example.com', '+254712345678', 4, 5600, '2025-08-22', 'active')
  `

  await sql`
    INSERT INTO orders (id, customer_id, customer_name, customer_email, total, subtotal, status, payment_method, shipping_address, tracking_number, created_at) VALUES
      ('ORD-3841', 'cu1', 'Maria Santos', 'maria@example.com', 1010, 1010, 'delivered', 'GCash', '{"street":"123 Rizal St","city":"Navotas","state":"Metro Manila"}', 'NFP-260318-A7K2', '2026-03-18T09:30:00Z'),
      ('ORD-3840', 'cu2', 'James Okonkwo', 'james@example.com', 500, 450, 'shipped', 'Credit Card', '{"street":"45A Marine Drive","city":"Lagos","state":"Lagos"}', 'NFP-260318-B9M1', '2026-03-18T08:15:00Z'),
      ('ORD-3839', 'cu3', 'Priya Menon', 'priya@example.com', 4780, 4780, 'processing', 'Bank Transfer', '{"street":"77 Temple Road","city":"Chennai","state":"Tamil Nadu"}', 'NFP-260317-C3X8', '2026-03-17T16:45:00Z'),
      ('ORD-3838', 'cu4', 'Carlos Reyes', 'carlos@example.com', 540, 540, 'cancelled', 'PayPal', '{"street":"22 Coastal Ave","city":"Miami","state":"FL"}', 'NFP-260317-D5P4', '2026-03-17T12:00:00Z'),
      ('ORD-3837', 'cu5', 'Aiko Tanaka', 'aiko@example.com', 1720, 1720, 'delivered', 'Credit Card', '{"street":"5-3-1 Ginza","city":"Tokyo","state":"Tokyo"}', 'NFP-260317-E2R9', '2026-03-17T10:00:00Z')
  `

  await sql`
    INSERT INTO users (id, email, password, name, role) VALUES
      ('admin1', 'admin@navotasfishport.com', 'admin123', 'Admin User', 'admin'),
      ('staff1', 'staff@navotasfishport.com', 'staff123', 'Staff User', 'staff')
    ON CONFLICT (email) DO NOTHING
  `

  await sql`
    INSERT INTO users (id, email, password, name, role, phone) VALUES
      ('cust1', 'maria@example.com', 'customer123', 'Maria Santos', 'customer', '+639123456789'),
      ('cust2', 'james@example.com', 'customer123', 'James Okonkwo', 'customer', '+2348012345678')
    ON CONFLICT (email) DO NOTHING
  `

  const existingResellers = await sql`SELECT COUNT(*) FROM resellers`
  if (existingResellers[0].count === 0) {
    await sql`
      INSERT INTO resellers (id, store_name, slug, owner_name, email, phone, description, logo, specialties, products_count, rating, city, website, has_app) VALUES
        ('r1', 'Alimango Direct', 'alimango-direct', 'Carlos Reyes', 'carlos@alimangodirect.com', '+639178901234', 'Specializing in premium mud crabs and lobsters sourced directly from Navotas Port. We deliver live seafood across Metro Manila.', 'https://images.unsplash.com/photo-1563120094-5f6b8c3cac2c?w=200&h=200&fit=crop', ARRAY['Crabs', 'Lobsters', 'Shellfish'], 24, 4.7, 'Navotas', 'https://alimangodirect.vercel.app', true),
        ('r2', 'Ocean Fresh PH', 'ocean-fresh-ph', 'Maria Santos', 'maria@oceanfresh.ph', '+639281234567', 'Daily catch seafood supplier for restaurants and hotels. Fresh fish, shrimp, and premium cuts with cold-chain delivery.', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop', ARRAY['Fresh Fish', 'Shrimp', 'Tuna'], 48, 4.9, 'Manila', 'https://oceanfresh.vercel.app', true),
        ('r3', 'Port Catch Trading', 'port-catch-trading', 'Jun Hernandez', 'jun@portcatch.com', '+639384567890', 'Bulk seafood trading company. We supply wet markets, restaurants, and exporters with consistent volume and quality.', 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=200&h=200&fit=crop', ARRAY['Value Packs', 'Fresh Fish', 'Squid'], 36, 4.5, 'Navotas', 'https://portcatch.vercel.app', true),
        ('r4', 'Seafood Hub Express', 'seafood-hub-express', 'Aiko Tanaka', 'aiko@seafoodhub.com', '+639487123456', 'Premium seafood delivery with a focus on Japanese-grade tuna, salmon, and specialty cuts for fine dining.', 'https://images.unsplash.com/photo-1599084993091-1cb5c07d2e1e?w=200&h=200&fit=crop', ARRAY['Tuna', 'Salmon', 'Shellfish'], 32, 4.8, 'Makati', 'https://seafoodhub.vercel.app', true),
        ('r5', 'Baybay Seafoods', 'baybay-seafoods', 'Lena Müller', 'lena@baybayseafoods.com', '+639581234789', 'Sustainable seafood from local waters. We offer smoked and cured specialties alongside fresh daily catches.', 'https://images.unsplash.com/photo-1564049489317-60d5ff2f6e10?w=200&h=200&fit=crop', ARRAY['Smoked & Cured', 'Fresh Fish', 'Dried Fish'], 18, 4.6, 'Parañaque', 'https://baybay.vercel.app', true)
    `
  }

  console.log('Data seeded successfully')
}
