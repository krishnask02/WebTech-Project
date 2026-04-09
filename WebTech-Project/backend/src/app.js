import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './api/routes/authRoutes.js';
import tripRoutes from './api/routes/tripRoutes.js';
import dashboardRoutes from './api/routes/dashboardRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handling
app.use(errorHandler);

export default app;
