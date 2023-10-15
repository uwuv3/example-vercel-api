import {
  randomArray,
  randomCat,
  randomDog,
  randomEmoji,
  randomPhoto,
} from "pivas";
import apiLimiter from "../../../lib/rateLimitChecker";
import ReactDOMServer from "react-dom/server";
import { createCanvas, loadImage } from "@napi-rs/canvas";
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
        const pathWithoutApi = path.replace(/\/api\/random\//g, "/");

        if (pathWithoutApi.startsWith("/dog")) {
          const dogImage = await randomDog();
          if (req.query.type === "json") {
            res.status(200).json({ status: 200, data: dogImage });
            return;
          } else {
            loadImage(dogImage).then((image) => {
              const canvas = createCanvas(image.width, image.height);
              const context = canvas.getContext("2d");
              context.drawImage(image, 0, 0);

              const imageBuffer = canvas.toBuffer("image/jpeg");
              res.writeHead(200, { "Content-Type": "image/jpeg" });
              res.end(imageBuffer);
            });
            return;
          }
        } else if (pathWithoutApi.startsWith("/cat")) {
          const catImage = await randomCat();
          if (req.query.type === "json") {
            res.status(200).json({ status: 200, data: catImage });
            return;
          } else {
            loadImage(catImage).then((image) => {
              const canvas = createCanvas(image.width, image.height);
              const context = canvas.getContext("2d");
              context.drawImage(image, 0, 0);

              const imageBuffer = canvas.toBuffer("image/jpeg");
              res.writeHead(200, { "Content-Type": "image/jpeg" });
              res.end(imageBuffer);
            });
            return;
          }
        } else if (pathWithoutApi.startsWith("/image")) {
          const photo = await randomPhoto();
          if (req.query.type === "json") {
            res.status(200).json({ status: 200, data: photo });
            return;
          } else {
            loadImage(photo).then((image) => {
              const canvas = createCanvas(image.width, image.height);
              const context = canvas.getContext("2d");
              context.drawImage(image, 0, 0);

              const imageBuffer = canvas.toBuffer("image/jpeg");
              res.writeHead(200, { "Content-Type": "image/jpeg" });
              res.end(imageBuffer);
            });
            return;
          }
        } else if (pathWithoutApi.startsWith("/emoji")) {
          let size = 1;
          if (req.query.size && !isNaN(parseInt(req.query.size)))
            size = parseInt(req.query.size);
          const emoji = randomEmoji(size);
          let json = { status: 200, data: emoji };
          if (req.query.getRandom) json.data2 = randomArray(emoji, 2)[0];
          res.status(200).json(json);
        } else {
          res.redirect("/apis");
        }
      } catch (error) {
        res.status(400).json({ status: 400, data: `${error}` });
      }
    }
  });
}
