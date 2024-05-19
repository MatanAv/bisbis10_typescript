-- Create Tables

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    average_rating FLOAT NOT NULL DEFAULT 0.0,
    is_kosher BOOLEAN NOT NULL,
    cuisines VARCHAR(255)[] NOT NULL
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    rating FLOAT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- Should have implemented a constraint that checks if dish_id belongs to the restaurant_id (of the order)
CREATE TABLE order_items (
    order_id UUID NOT NULL,
    dish_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    PRIMARY KEY (order_id, dish_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

-- Triggers & Functions

CREATE OR REPLACE FUNCTION update_average_rating() RETURNS TRIGGER AS $$
BEGIN
    UPDATE restaurants
    SET average_rating = (SELECT AVG(rating) FROM ratings WHERE restaurant_id = NEW.restaurant_id)
    WHERE id = NEW.restaurant_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_average_rating_trigger
AFTER INSERT ON ratings
FOR EACH ROW EXECUTE FUNCTION update_average_rating();

-- Insert Starter Data

INSERT INTO restaurants (name, is_kosher, cuisines) VALUES ('Taizu', false, ARRAY['Asian', 'Mexican', 'Indian']);

INSERT INTO dishes (restaurant_id, name, description, price) VALUES (1, 'Humus', 'Good one', 48);

INSERT INTO ratings (restaurant_id, rating) VALUES (1, 4.5);

INSERT INTO orders (id, restaurant_id) VALUES ('d60790f5-2c59-4873-8eb7-1261c1e50fcd', 1);

INSERT INTO order_items (order_id, dish_id, amount) VALUES ('d60790f5-2c59-4873-8eb7-1261c1e50fcd', 1, 2);