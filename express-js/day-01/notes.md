intro and setup.✅
get requests and req.query and req.params✅
post requests.
put.
patch.
delete.
Express.js Advanced HTTP Methods
1. Introduction and Setup
What is Express.js?

A fast, minimal web framework for Node.js used to build APIs and web applications.
Supports middleware, routing, and handling HTTP methods efficiently.
Basic Setup:

Install Node.js and initialize the project:
npm init -y
npm install express
Create app.js:
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
Sample Data (used throughout examples):

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];
2. GET Requests
Purpose: Fetch data from the server.
Examples:
Fetch all users:

app.get('/users', (req, res) => {
    res.json(users);
});
Response:

[
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
]
Fetch a single user by ID (Route Parameters):

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});
Request: /users/1
Response:

{ "id": 1, "name": "Alice", "email": "alice@example.com" }
Fetch users with filters (Query Parameters):

app.get('/users', (req, res) => {
    const { name } = req.query;
    const filteredUsers = users.filter(u => u.name.includes(name || ''));
    res.json(filteredUsers);
});
Request: /users?name=Bob
Response:

[{ "id": 2, "name": "Bob", "email": "bob@example.com" }]
3. POST Requests
Purpose: Add new data to the server.
Example: Add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});
Request Body:
{ "name": "Charlie", "email": "charlie@example.com" }
Response:
{ "id": 3, "name": "Charlie", "email": "charlie@example.com" }
4. PUT Requests
Purpose: Replace an entire resource.
Example: Update a user's details
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).send('User not found');

    users[userIndex] = { id, name, email }; // Replace the entire object
    res.json(users[userIndex]);
});
Request: /users/1
Request Body:
{ "name": "Alice Updated", "email": "alice.new@example.com" }
Response:
{ "id": 1, "name": "Alice Updated", "email": "alice.new@example.com" }
5. PATCH Requests
Purpose: Update part of a resource.
Example: Update a user's email only
app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).send('User not found');

    const { email } = req.body;
    if (email) user.email = email; // Partial update
    res.json(user);
});
Request: /users/2
Request Body:
{ "email": "bob.new@example.com" }
Response:
{ "id": 2, "name": "Bob", "email": "bob.new@example.com" }
6. DELETE Requests
Purpose: Remove data from the server.
Example: Delete a user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(userIndex, 1); // Remove from array
    res.json(deletedUser);
});
Request: /users/3
Response:
{ "id": 3, "name": "Charlie", "email": "charlie@example.com" }
Final Notes
Middleware can be added for logging, authentication, etc.
Example:
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
app.use(logger);
Error Handling:
Add a middleware at the end for centralized error handling:
app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
});