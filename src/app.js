import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index';
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(router);

app.use('/',(req, res) => {
    res.status(200).json({ success: true, message: "You are using Barefoot nomad app." })
  });

export default app;