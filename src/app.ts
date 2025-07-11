import cors from 'cors';
import express, { Application } from 'express';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

export default app;