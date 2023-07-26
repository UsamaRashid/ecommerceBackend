const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  const token =
    req.headers.body || req.query.token || req.headers["x-access-token"];

  // Check for provided token
  if (!token) {
    return res.status(403).send("Authorization token is required");
  }

  // verify token
  try {
    const decodedToken = await jwt.verify(token, TOKEN_KEY);
    req.currentUser = decodedToken;
  } catch (error) {
    return res.status(401).send("Invalid Token provided");
  }
  // proceed with next request
  return next();
};

module.exports = verifyToken;
