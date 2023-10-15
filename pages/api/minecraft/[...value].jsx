import { minecraft_info } from "pivas";
import apiLimiter from "../../../lib/rateLimitChecker";
import ReactDOMServer from "react-dom/server";
export default function handler(req, res) {
  apiLimiter(req, res, async (err) => {
    if (err) {
      res.status(400).json({ status: 400, data: err });
    } else {
      try {
        const path = req.url;
        const pathWithoutApi = path.replace(/\/api\/minecraft\//g, "/");

        if (pathWithoutApi.startsWith("/server-info")) {
          if (!req.query.ip || typeof req.query.ip !== "string") {
            res.status(400).json({
              status: 400,
              data: "?ip= is reuired or given parameter is not string",
            });
            return;
          } else {
            const server = await minecraft_info.serverInfo(req.query.ip);
            res.status(200).json({ status: 200, data: server });
          }
        } else {
          const jsxContent = (
            <>
              <a href="/api/minecraft/server-info?ip=oyna.craftrise.tc">
                Server Info
              </a>{" "}
              <a> | </a>
            </>
          );
          const htmlContent = ReactDOMServer.renderToStaticMarkup(jsxContent);

          res.status(200).send(htmlContent);
        }
      } catch (error) {
        res.status(400).json({ status: 400, data: `${error}` });
      }
    }
  });
}
