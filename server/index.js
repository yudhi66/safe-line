import express from 'express';
import { Server } from 'socket.io';
import helmet from 'helmet';
import { createServer } from 'http';
import cors from 'cors';
import authRouter  from './routers/authRouter.js'
 import session from 'express-session';
const app = express();
import { configDotenv } from 'dotenv';

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

app.use(helmet());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}

));


app.use(express.json());
app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      credentials: true,
      name: "sid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      },
    })
  );

app.use("/auth",authRouter);

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
