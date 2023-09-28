var jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisagood$oy";

const fetchUser = (req, res, next) => {
  // get the user from JWT token and add if to req object
  const token = req.header("auth-token");
  console.log("token received");
  if (!token) {
    res.status(401).send({ error: "Please Authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    // console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate using a valid token" });
  }
};

module.exports = fetchUser;
