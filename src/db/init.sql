-- Create tables

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_kosher BOOLEAN NOT NULL,
    cuisines VARCHAR(255)[] NOT NULL,
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    rating FLOAT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE dishes (
    id SERIAL,
    restaurant_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    PRIMARY KEY (id, restaurant_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    dish_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
);

-- Insert data

INSERT INTO restaurants (name, is_kosher, cuisines) VALUES ('Taizu', false, ARRAY['Asian', 'Mexican', 'Indian']);

INSERT INTO dishes (restaurant_id, name, description, price) VALUES (1, 'Humus', 'Good one', 48);

INSERT INTO ratings (restaurant_id, rating) VALUES (1, 4.5);

INSERT INTO orders (id, restaurant_id, dish_id, amount) VALUES (gen_random_uuid(), 1, 1, 2);