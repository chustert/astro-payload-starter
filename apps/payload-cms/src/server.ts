import express from 'express';
import payload from 'payload';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add custom routes here if needed
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'healthy' });
  });

  app.listen(PORT, () => {
    payload.logger.info(`Server listening on port ${PORT}`);
  });
};

start().catch(console.error);
