import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errorHandler } from './common/middleware/error.middleware.js';
import { appController } from './controller/app.router.js';

const app = express();

app.use(express.json());
app.use(cors());
appController(app);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

