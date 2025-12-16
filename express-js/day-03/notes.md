
### **Project Setup**

1. **Initialize a Node.js Project**
   ```bash
   npm init -y
   ```

2. **Install Dependencies**
   ```bash
   npm install express cookie-parser
   ```

3. **Enable ES Modules**  
   Update your `package.json` to include:
   ```json
   {
     "type": "module"
   }
   ```

---

### **Code Example Using ES Modules**

#### **File: `index.mjs`**

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

// Middleware to parse cookies
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'codesnippet.dev', {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Prevents client-side JS access
        secure: false,  // Set to true if using HTTPS
    });
    res.send('Cookie has been set!');
});

// Route to read cookies
app.get('/get-cookie', (req, res) => {
    const cookies = req.cookies;
    res.send(`Cookies on this browser: ${JSON.stringify(cookies)}`);
});

// Route to delete a cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie has been deleted!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **How to Run**

1. Save the file as `index.mjs` or `index.js`.
2. Run the application:
   ```bash
   node index.mjs
   ```

---

### **Code Explanation**

1. **ES Module Syntax**
   - `import express from 'express';` replaces `const express = require('express');`.
   - Ensure `type: "module"` is set in `package.json`.

2. **Middleware**
   - `app.use(cookieParser());` enables cookie parsing.

3. **Setting Cookies**
   - `res.cookie('key', 'value', options)` to set a cookie.
   - Options:
     - `maxAge`: Cookie lifespan in milliseconds.
     - `httpOnly`: Prevents access via client-side scripts.
     - `secure`: Ensures cookies are sent over HTTPS.

4. **Reading Cookies**
   - `req.cookies` contains all cookies sent by the client.

5. **Deleting Cookies**
   - `res.clearCookie('key')` removes a specific cookie.

---

### **Output**

#### **Set Cookie**  
Navigate to `http://localhost:3000/set-cookie`.  
Response:  
```
Cookie has been set!
```

#### **Read Cookie**  
Navigate to `http://localhost:3000/get-cookie`.  
Response:  
```json
{"username": "codesnippet.dev"}
```

#### **Delete Cookie**  
Navigate to `http://localhost:3000/delete-cookie`.  
Response:  
```
Cookie has been deleted!
```


### **What Are Headers and Status Codes in HTTP?**

---

### **Headers in HTTP**

**Definition:**  
Headers are key-value pairs in an HTTP request or response that provide metadata about the communication. They influence how the server or client processes the message.

**Types of Headers:**

1. **Request Headers:**
   - Sent by the client to the server.
   - Example: `User-Agent`, `Accept`, `Authorization`.
   - Purpose: Specify client information, authentication, and desired response format.

   **Example:**
   ```http
   GET /api/data HTTP/1.1
   Host: example.com
   User-Agent: Mozilla/5.0
   Accept: application/json
   ```

2. **Response Headers:**
   - Sent by the server to the client.
   - Example: `Content-Type`, `Set-Cookie`, `Cache-Control`.
   - Purpose: Provide details about the server response, such as type and size of the data.

   **Example:**
   ```http
   HTTP/1.1 200 OK
   Content-Type: application/json
   Content-Length: 123
   ```

3. **Entity Headers:**
   - Describe the body of the request or response.
   - Example: `Content-Type`, `Content-Length`, `Content-Encoding`.

4. **Custom Headers:**
   - Developers can create their own headers, usually prefixed with `X-` (e.g., `X-Correlation-ID`).

---

### **Status Codes in HTTP**

**Definition:**  
Status codes are numerical codes included in HTTP responses to indicate the outcome of the request.

**Classification of Status Codes:**

1. **1xx: Informational**  
   - Indicates the request is being processed.
   - Example:  
     - `100 Continue`: Request received, continue to send body.  
     - `101 Switching Protocols`: Protocol switching in progress.

2. **2xx: Success**  
   - The request was successful.
   - Example:  
     - `200 OK`: The request was successful.  
     - `201 Created`: A resource was created successfully.  
     - `204 No Content`: The request succeeded but there's no content to send back.

3. **3xx: Redirection**  
   - Further action is required to complete the request.
   - Example:  
     - `301 Moved Permanently`: Resource moved to a new URL permanently.  
     - `302 Found`: Temporary redirect to another URL.  
     - `304 Not Modified`: Cached version can be used.

4. **4xx: Client Errors**  
   - The client sent a bad request.
   - Example:  
     - `400 Bad Request`: Invalid request from the client.  
     - `401 Unauthorized`: Authentication is required.  
     - `403 Forbidden`: The client doesn't have permission.  
     - `404 Not Found`: Resource not found.

5. **5xx: Server Errors**  
   - The server failed to fulfill a valid request.
   - Example:  
     - `500 Internal Server Error`: Generic server error.  
     - `502 Bad Gateway`: Invalid response from the upstream server.  
     - `503 Service Unavailable`: The server is currently unavailable.

---

### **Headers and Status Code Example**

**Client Request:**
```http
GET /users HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
User-Agent: PostmanRuntime/7.29.0
```

**Server Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 234
Set-Cookie: session_id=12345; HttpOnly
```

---

### **Key Points to Remember**

1. **Headers:**
   - Facilitate communication by specifying request/response metadata.
   - Must follow syntax: `Header-Name: Header-Value`.

2. **Status Codes:**
   - A clear, concise indicator of what happened during the request.
   - Follow the classification to understand the nature of the response (informational, success, redirection, client, or server error).

