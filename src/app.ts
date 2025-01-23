import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from "cors"
import { departmentRouter } from './app/modules/department-head/dpRouter';
// const port = 3000
import cookieParser from 'cookie-parser'
import authRoute from './app/modules/auth/authRouter';



//perser
app.use(express.json())
app.use(cors({credentials:true}))
app.use(cookieParser())

//all router emplemnet
app.use("/api",departmentRouter)

app.use("/api",authRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Collage Server site is Running!');
});

export default app;
