import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import usersRoutes from './routes/user.routes.js';

config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); 


/* ========== Start:: User api url ========= */ 
  app.use('/api/v1/users', usersRoutes);
/* ============== Start:: User api ========= */ 

app.listen(PORT, () => {
  app.emit("Started")
  console.log(`app is listening on port ${PORT}`);
});

export default  { app };

