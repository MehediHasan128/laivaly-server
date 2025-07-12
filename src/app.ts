import cors from 'cors';
import express, { Application } from 'express';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('The Laivaly server is run successfully')
});

export default app;