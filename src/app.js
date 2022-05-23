import "dotenv/config"
import server from "./index.js"
const port = process.env.PORT;
server.listen(port, () => { console.log("Server listening on port " + port) });