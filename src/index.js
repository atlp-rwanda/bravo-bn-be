const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.get("/welcome", (req,res)=>{
    res.json({message: "Welcome to barefoot!"})
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT}`)
})