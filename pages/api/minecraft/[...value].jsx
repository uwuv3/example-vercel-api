import { minecraft_info } from "pivas";
import apiLimiter from "../../../lib/rateLimitChecker";
import ReactDOMServer from "react-dom/server";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * A simple Next.js API route.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 */
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
            res.status(200).json({
              status: 200,
              data: {
                ip: server.hostname,
                realIp: server.ip,
                port: server.port,
                motd: server.motd.raw,
                version: server.version,
                onlinePlayers: server.players.online,
                maxPlayers: server.players.max,
                favicon: server.favicon,
                banner: server.thumbnail,
              },
            });
          }
        } else {
          res.redirect("/apis");
        }
      } catch (error) {
        res.status(400).json({ status: 400, data: `${error}` });
      }
    }
  });
}
