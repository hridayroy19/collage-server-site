import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from "cors"
// const port = 3000

//perser
app.use(express.json())
app.use(cors())

//all router emplemnet

app.get('/', (req: Request, res: Response) => {
  res.send('Collage Server site is Running!');
});

export default app;
