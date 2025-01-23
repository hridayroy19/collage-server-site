import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABAS_URL,
  NODE_env:process.env.NODE_ENV,
  SMTP_user:process.env.SMPT_USER,
  SMTP_pass:process.env.SMTP_PASS,
  SMTP_email:process.env.SMPT_EMAIL
};
