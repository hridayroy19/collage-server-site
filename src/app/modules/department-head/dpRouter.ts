import express from 'express';
import { deparmentController } from './dpController';

const router = express.Router()

//call controller

router.post("/departmentHead",deparmentController.crateDepartmentHead)

export const departmentRouter = router;