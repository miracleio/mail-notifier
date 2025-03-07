import express from 'express';
import dotenv from 'dotenv';
import emailRouter from './routes/email.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', emailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});