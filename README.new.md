# Restaurant Management System

## Introduction

This is an API that allows you to manage restaurants, dishes, and orders. It was built using TypeScript, Node.js, Express, and PostgreSQL.

## Extras

1. I tried to imitate the structure of a real-world project (e.g `sequelize` library), using models with some DB functionalities (e.g. `create`, `update`, `delete`, `find`, etc.). For that I created a `BaseModel` class, and a QueryBuilder class to help with the queries.
2. I supported multiple cuisines querying in the `GET /restaurants` endpoint. You can pass multiple cuisines separated by commas (e.g. `/restaurants?cuisine=Italian,American`).
3. I supported filtering with any column in the `find()` method.
4. I added triggers to the `restaurants` table to update the `average_rating` column whenever a new rating is added.

## Potential Improvements

- Add validations for client requests (body, query, and params)
- Implement a constraint that checks if `dish_id` belongs to the `restaurant_id` (of the order) in the `order_items` table
- Maybe a better structure for some of the tables (e.g. `order_items`), also to add more constraints and improve data integrity.
- Add more meaningful error messages. (e.g. `404 Not Found`, '400 Bad Request', etc.)
- In `buildRestaurantFilters()`, I did some workarounds to filter by `cuisine`, but I believe a better approach would be to get filters from the client in a real-world scenario.
- In `buildFilterExpression()`, I only supported VARCHAR arrays, but I could add support for other types.

## Installation & Usage

1. Clone the repository
2. Install the dependencies using `yarn` or `npm install`.
3. Copy the `.env.example` file and rename it to `.env`, or use the `src/config/index.ts` default values
4. Open a terminal and run `docker compose up`
5. Open another terminal and run `yarn build` or `npx tsc`, then `yarn start` or `npm run start`.
6. You can now test the API using the base path `http://localhost:<port>/api/<endpoint>` (e.g. `http://localhost:8000/api/restaurants`)

- I provided a Thunder Client collection for you to test the API. You can import it into your Thunder Client extension and test the API endpoints.

### Thank you! Feel free to reach out if you have any questions or feedback.
