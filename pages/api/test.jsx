import apiLimiter from "../../lib/rateLimitChecker";

export default function handler(req, res) {
  apiLimiter(req, res, (err) => {
    if (err) {
      res.status(400).json({ status: 400, data: err });
    } else {
      const path = req.url;
      const pathWithoutApi = path.replace(/^\/api\//, '/');
      
      res.status(200).json({ status: 200, data: pathWithoutApi });
    }
  });
}
