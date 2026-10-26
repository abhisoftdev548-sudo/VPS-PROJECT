import express from  'express';
import connectDB from './config/db_config.js';
import routes from './routes/index.js';
const app = express();
connectDB();

app.use(express.json());

app.use('/api/v1', routes);

export default app;