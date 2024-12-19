
# **SoarInc: Node.js School Management API**

A Node.js-based API for managing schools, classrooms, and students. It includes user authentication, role-based access control, and CRUD operations.

---

## **Features**

- **Authentication and Authorization**:  
  Role-based access control (`superAdmin` for managing schools).
  
- **CRUD Operations**:  
  Create, Read, Update, and Delete schools, classrooms, and students.

- **Validation**:  
  Input validation using `Joi`.

- **Database**:  
  MongoDB for data persistence.

---

## **Prerequisites**

Ensure you have the following installed on your system:

1. **Node.js** (v16 or higher)  
   [Download Node.js](https://nodejs.org/)
   
2. **npm** (comes with Node.js) or **yarn**

3. **MongoDB** (Local or Cloud)  
   [Download MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

4. A code editor like [Visual Studio Code](https://code.visualstudio.com/).

---

## **Setup Instructions**

Follow the steps below to set up and run the project locally:

## **1. Clone the Repository**
```bash
git clone https://github.com/chaitanya-dharpale0209/soarinc.git
cd soar
```

## **2. Install Dependencies**
```bash
npm install
```


## **3. Configure Environment Variables**
Create a .env file in the project root directory and add the following environment variables:
```bash
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
```

Replace <Your MongoDB Connection String> with the connection string for your MongoDB database (local or Atlas).
Replace <Your JWT Secret> with a secret key for signing JSON Web Tokens.


## **4. Start MongoDB**
If you’re running MongoDB locally, start it using the command:
```bash
mongod
```

## **5. Start the Server**
Run the following command to start the server:
```bash
node server.js
```

The server will start on http://localhost:5000.

### **6. Test API Endpoints**
Use Postman or any API client to test the endpoints. Below are some of the main routes:

Authentication Routes
POST /api/auth/login: Authenticate a user.
School Routes (Protected, superAdmin role required)
POST /api/schools: Create a new school.
GET /api/schools/getallschools: Get all schools.
PUT /api/schools/updateschool/:id: Update school details.
DELETE /api/schools/deleteschool/:id: Delete a school.
Note: Set the Authorization header to Bearer <token> for protected routes.


## ** api documentation link**
https://documenter.getpostman.com/view/24612054/2sAYJ1kh9i
