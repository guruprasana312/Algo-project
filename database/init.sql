-- Qwipo B2B Marketplace Database Schema
-- Optimized for Indian retail market

-- Users table for retailers and suppliers
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) CHECK (user_type IN ('retailer', 'supplier', 'admin')),
    business_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(15),
    gst_number VARCHAR(15),
    pan_number VARCHAR(10),
    address JSONB,
    location JSONB, -- {state, city, pincode, coordinates}
    verification_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table with Indian market specifics
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    brand VARCHAR(100),
    price DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    hsn_code VARCHAR(10), -- HSN code for GST
    images TEXT[], -- Array of image URLs
    specifications JSONB,
    tags TEXT[],
    supplier_id UUID REFERENCES users(id),
    availability JSONB, -- {in_stock, quantity, min_order_qty}
    ratings JSONB DEFAULT '{"average": 0, "count": 0}',
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User interactions for recommendation engine
CREATE TABLE user_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    interaction_type VARCHAR(20), -- view, cart, purchase, wishlist
    session_id VARCHAR(255),
    duration INTEGER, -- time spent in seconds
    metadata JSONB, -- additional context
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retailer_id UUID REFERENCES users(id),
    supplier_id UUID REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(12,2) NOT NULL,
    gst_amount DECIMAL(12,2),
    shipping_address JSONB,
    billing_address JSONB,
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    delivery_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    gst_rate DECIMAL(5,2), -- GST percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product reviews and ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    order_id UUID REFERENCES orders(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommendation cache
CREATE TABLE recommendation_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    algorithm VARCHAR(50),
    recommendations JSONB, -- Array of product IDs with scores
    filters JSONB, -- Applied filters
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_popularity ON products(popularity_score DESC);
CREATE INDEX idx_products_location ON products USING GIN ((supplier_id));

CREATE INDEX idx_interactions_user ON user_interactions(user_id);
CREATE INDEX idx_interactions_product ON user_interactions(product_id);
CREATE INDEX idx_interactions_type ON user_interactions(interaction_type);
CREATE INDEX idx_interactions_time ON user_interactions(created_at);

CREATE INDEX idx_orders_retailer ON orders(retailer_id);
CREATE INDEX idx_orders_supplier ON orders(supplier_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(created_at);

-- Full-text search index
CREATE INDEX idx_products_search ON products USING GIN (to_tsvector('english', name || ' ' || description));

-- Sample data for Indian market
INSERT INTO users (email, password_hash, user_type, business_name, contact_person, phone, location) VALUES
('rajesh@delhitraders.com', '$2b$10$hash1', 'retailer', 'Delhi Traders Pvt Ltd', 'Rajesh Kumar', '+919876543210', '{"state": "Delhi", "city": "New Delhi", "pincode": "110001"}'),
('priya@mumbaistore.com', '$2b$10$hash2', 'retailer', 'Mumbai General Store', 'Priya Sharma', '+919876543211', '{"state": "Maharashtra", "city": "Mumbai", "pincode": "400001"}'),
('supplier@keralarice.com', '$2b$10$hash3', 'supplier', 'Kerala Rice Mills', 'Suresh Nair', '+919876543212', '{"state": "Kerala", "city": "Kochi", "pincode": "682001"}');

INSERT INTO products (name, description, category, brand, price, hsn_code, supplier_id, availability) VALUES
('Premium Basmati Rice 25kg', 'High quality aged basmati rice from Punjab', 'Food Grains', 'India Gate', 2500.00, '1006', (SELECT id FROM users WHERE email = 'supplier@keralarice.com'), '{"in_stock": true, "quantity": 500, "min_order_qty": 1}'),
('Organic Turmeric Powder 1kg', 'Pure organic turmeric powder from Kerala', 'Spices', 'Organic India', 450.00, '0910', (SELECT id FROM users WHERE email = 'supplier@keralarice.com'), '{"in_stock": true, "quantity": 200, "min_order_qty": 5}');