import express from 'express';
import { Server } from 'socket.io';
 import { sessionMiddleware ,wrap,corsConfig} from './controllers/serverController.js';

 import helmet from 'helmet';
import { createServer } from 'http';
import cors from 'cors';
import authRouter  from './routers/authRouter.js'
 
 
const app = express();
import { configDotenv } from 'dotenv';
 
const server = createServer(app);
const io = new Server(server, {
    cors: corsConfig
});
 
 
app.use(helmet());
app.use(cors( 
corsConfig
));


app.use(express.json());
app.use(
    sessionMiddleware
  );

app.use("/auth",authRouter);

app.get("/", (req, res) => {
    res.json("hi");
});

 
io.use(wrap(sessionMiddleware))

io.on("connect", socket => {
    console.log(socket.id);
    console.log(socket.request.session.user.username);
    // Add socket event listeners here
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});
