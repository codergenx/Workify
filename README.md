# Workify Backend

This is the backend implementation for Workify, fulfilling all requirements for Milestone 3.
It uses Express.js, PostgreSQL, and Prisma.

## Getting Started

1. **Prerequisites**
   - Node.js installed
   - PostgreSQL installed and running
   - A database named `workify_db` created (as done in previous steps).

2. **Environment Setup**
   The `.env` file should contain your database URL. I have filled it based on your chat snippet:
   ```env
   DATABASE_URL="postgresql://postgres:1234@localhost:5432/workify_db"
   JWT_SECRET="supersecretjwtkey"
   PORT=3000
   ```

3. **Install Dependencies**
   Run the following command in the terminal inside `C:\Users\User\Desktop\Workify\Workify`:
   ```bash
   npm install
   ```

4. **Initialize Database**
   Push the defined database schema to your local PostgreSQL instance:
   ```bash
   npx prisma migrate dev --name init_workify
   ```

5. **Start Server**
   Start the backend development server:
   ```bash
   npm run dev
   ```

## Routes Overview

### Authentication (`/api/auth`)
- `POST /register`: Register a new Customer or Worker. (Body: `email`, `password`, `name`, `role: "CUSTOMER" | "WORKER"`)
- `POST /login`: Login to receive JWT token.

### Profiles (`/api/profiles`) -> (Requires JWT)
- `POST /`: Create a worker profile (Worker only)
- `GET /`: Search worker profiles (`?skill=Plumbing&location=NY`)
- `GET /:id`: Get profile

### Bookings (`/api/bookings`) -> (Requires JWT)
- `POST /`: Create booking (Customer only). (Body: `workerId`, `serviceDate`, `message`)
- `GET /`: View my bookings (Customer / Worker)
- `PUT /:id/status`: Accept or Reject (Worker only). (Body: `status: "ACCEPTED" | "REJECTED" | "COMPLETED"`)

### Reviews (`/api/reviews`) -> (Requires JWT)
- `POST /`: Submit a review (Customer only, for COMPLETED bookings)
- `GET /worker/:id`: List reviews for worker

### Admin (`/api/admin`) -> (Requires JWT of an ADMIN user)
- Manage Users (`GET /users`, `PUT /users/:id/block`)
- Approve Workers (`GET /workers/pending`, `PUT /workers/:id/approve` body: `isApproved: true`)
- Moderate Bookings & Reviews (Delete, Hide endpoints)

