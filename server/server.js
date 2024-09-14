const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const unitRoutes = require('./routes/unitRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const commentRoutes = require('./routes/commentRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware here

app.use('/api/auth', authRoutes);
// Use routes
app.use('/api/classes', classRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
