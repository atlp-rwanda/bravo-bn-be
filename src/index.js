import app from './routes/index';
import 'dotenv/config';
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});


