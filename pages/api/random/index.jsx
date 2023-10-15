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
            <a href="/api/random/dog?type=json">Random Dog (JSON)</a> <a> | </a>{" "}
            <a href="/api/random/cat?type=json">Random Cat (JSON)</a> <a> | </a>{" "}
            <a href="/api/random/image?type=json">Random Image (JSON)</a>{" "}
            <a> | </a>
            <a href="/api/random/dog">Random Dog (Image)</a> <a> | </a>{" "}
            <a href="/api/random/cat">Random Cat (Image)</a> <a> | </a>{" "}
            <a href="/api/random/image">Random Image (Image)</a> <a> | </a>
            <a href="/api/random/emoji?getRandom=true&size=4">Random Emoji</a>{" "}
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
