import apiLimiter from "../../../lib/rateLimitChecker";
import ReactDOMServer from "react-dom/server";
export default function handler(req, res) {
  apiLimiter(req, res, async (err) => {
    if (err) {
      res.status(400).json({ status: 400, data: err });
    } else {
      try {
        const jsxContent = (
          <>
            <a href="/api/minecraft/server-info?ip=oyna.craftrise.tc">Server Info</a>{" "}
            <a> | </a>
          </>
        );
        const htmlContent = ReactDOMServer.renderToStaticMarkup(jsxContent);

        res.status(200).send(htmlContent);
      } catch (error) {
        res.status(400).json({ status: 400, data: `${error}` });
      }
    }
  });
}
