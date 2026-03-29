import 'dotenv/config';
import   connectDB from './config/db.js';
import server from './server.js';


const PORT = process.env.PORT || 5000;
const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('📍 Socket.io ready for live price map');
    console.log('🔄 Cron jobs scheduled for alerts & indices');
  });
};

start();