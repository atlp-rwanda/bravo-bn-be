import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoutes from './user.routes';
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); 
app.use('/api/v1/users', usersRoutes);

app.use('/',(req, res) => {
    res.status(200).json({ success: true, message: "You successfully landed on our Endpoint" })
  });

export default app; 