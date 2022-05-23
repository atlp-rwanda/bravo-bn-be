import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import 'dotenv';
import usersRoutes from './routes/user.routes.js';


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json()); 

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "You have a connection to our API" })
});

/* ========== Start:: User api url ========= */ 
  app.use('/api/v1/users', usersRoutes);
/* ============== Start:: User api ========= */ 

app.listen(PORT, () => {
  app.emit("Started")
  console.log(`app is listening on port ${PORT}`);
});

export default app;