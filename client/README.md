
### Virtual Classroom Classify Frontend Commands

This file contains all the necessary commands to set up and run the frontend of the Virtual Classroom project.

## Step-by-Step Commands

- **Clone the repository**: `git clone https://github.com/your-username/virtual-classroom-frontend.git`
- **Create a .env file in src directory and write** `VITE_API_URL=http://localhost:5000/api`
- **open terminal**:
- **go to client folder**: `cd client`
- **Install dependencies**: `npm install`

- **Run development server**: `npm run dev`



### Backend Commands (README-Backend.md)

# Virtual Classroom Backend Commands

This file contains all the necessary commands to set up and run the backend of the Virtual Classroom project.


- **Clone the repository**: `git clone https://github.com/your-username/virtual-classroom-backend.git`
- **Generate your own jwt secret by running this command in terminal**: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))`
- **Create a `.env` file** in the root directory with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/virtual-classroom
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
- **open another terminal for backend**:
- **go to server folder directory**: `cd server`
- **Install dependencies**: `npm install`
- **Run development server**: `npm start`