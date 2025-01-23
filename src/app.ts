import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from "cors"
import { departmentRouter } from './app/modules/department-head/dpRouter';
// const port = 3000
import cookieParser from 'cookie-parser'

//perser
app.use(express.json())
app.use(cors({credentials:true}))
app.use(cookieParser())
//all router emplemnet
app.use("/api",departmentRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Collage Server site is Running!');
});

export default app;
