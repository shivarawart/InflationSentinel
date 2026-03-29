import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { initSocket } from './utils/socket.js';
import authRoutes from './routes/auth.routes.js';
import priceRoutes from './routes/price.routes.js';
import barterRoutes from './routes/barter.routes.js';
import { startCronJobs } from './services/cron.service.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/barter', barterRoutes);

app.get('/', (req, res) => res.send('🚀 InflationSentinel Backend is LIVE!'));
// Initialize Socket.io
export const io = initSocket(server);

// Start cron jobs
startCronJobs();

export default server;