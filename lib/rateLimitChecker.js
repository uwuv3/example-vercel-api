const rateLimit = require("express-rate-limit");
const proxyAddr = require("proxy-addr");

const apiLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 100, // Limit to 100 requests per second per IP
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: function (req) {
    return req.trustedIp; // Use the trusted IP (provided by proxy-addr)
  },
  skip: function (req) {
    return req.trustedIp === "unknown"; // Skip requests with an unknown IP
  },
});

function rateLimitWithProxy(req, res, next) {
  proxyAddr(req, ['loopback', 'linklocal', 'uniquelocal']);
  return apiLimiter(req, res, next);
}

module.exports = rateLimitWithProxy;
