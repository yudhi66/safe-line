import redisClient from "../redis.js";

 
const ratelimiter = (secondsLimit, limitAmount) => {
  return async (req, res, next) => {
    try {
      const ip = req.connection.remoteAddress;
      
     
      const [response] = await redisClient
        .multi()
        .incr(ip)
        .expire(ip, secondsLimit)
        .exec();
       
      if (response[1] > limitAmount) {
        res.json({
          loggedIn: false,
          status: "Slow down!! Try again in a minute.",
        });
      } else {
        next();  
      }
    } catch (error) {
      console.error("Rate limiter error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

export default ratelimiter;
