import express from 'express';
import { Server } from 'socket.io';
import helmet from 'helmet';
import { createServer } from 'http';

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("hi");
});

io.on("connect", socket => {
    console.log("A user connected");
    // Add socket event listeners here
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});
