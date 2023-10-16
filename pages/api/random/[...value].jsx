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
        } else if (pathWithoutApi.startsWith("/password")) {
          let length = 8;
          if (
            (req.query.length && !isNaN(parseInt(req.query.length))) ||
            (req.query.l && !isNaN(parseInt(req.query.l)))
          )
            length = parseInt(req.query.length || req.query.l);
          if (length > 100 || length < 8) {
            return res
              .status(400)
              .json({ status: 400, data: "length > 100 && length < 8" });
          }

          const emoji = generatePassword(length);
          let json = { status: 200, data: emoji };
          res.status(200).json(json);
        } else if (pathWithoutApi.startsWith("/color")) {
          const photo = getRandomColor();
          if (
            !req.query.hex &&
            (!req.query.r || !req.query.g || !req.query.b)
          ) {
            res.status(200).json({
              status: 200,
              data: {
                hex: photo.hex,
                rgba: photo.rgba,
                rgbaText: `${Object.values(photo.rgba)}`,
                simulateHex: `${req.url.split("?")[0]}?hex=${photo.hex.replace(
                  "#",
                  ""
                )}`,
                simulateRgb: `${req.url.split("?")[0]}?r=${photo.rgba.red}&g=${
                  photo.rgba.green
                }&b=${photo.rgba.blue}`,
              },
            });
            return;
          } else {
            let width = 300;
            let height = 300;
            let hex;
            let r;
            let g;
            let b;
            let a = 1;
            if (
              (req.query.w && !isNaN(parseInt(req.query.w))) ||
              (req.query.with && !isNaN(parseInt(req.query.witdh)))
            ) {
              width = parseInt(req.query.w || req.query.with);
            }
            if (
              (req.query.h && !isNaN(parseInt(req.query.h))) ||
              (req.query.height && !isNaN(parseInt(req.query.height)))
            ) {
              height = parseInt(req.query.h || req.query.height);
            }
            if (
              (req.query.r && !isNaN(parseInt(req.query.r))) ||
              (req.query.red && !isNaN(parseInt(req.query.red)))
            ) {
              r = parseInt(req.query.r || req.query.red);
            }
            if (
              (req.query.g && !isNaN(parseInt(req.query.g))) ||
              (req.query.green && !isNaN(parseInt(req.query.green)))
            ) {
              g = parseInt(req.query.g || req.query.green);
            }
            if (
              (req.query.b && !isNaN(parseInt(req.query.b))) ||
              (req.query.blue && !isNaN(parseInt(req.query.blue)))
            ) {
              b = parseInt(req.query.b || req.query.blue);
            }
            if (
              (req.query.a && !isNaN(parseInt(req.query.a))) ||
              (req.query.alpha && !isNaN(parseInt(req.query.alpha)))
            ) {
              a = parseInt(req.query.h || req.query.height);
            }
            if (req.query.hex && isValidHexColor(req.query.hex)) {
              hex = req.query.hex;
            }
            let msg = photo.hex;
            if (hex) {
              msg = "#" + hex;
            } else if (r !== undefined && g !== undefined && b !== undefined) {
              msg = `rgba(${r},${g},${b},${a})`;
            }
            const canvas = createCanvas(width, height);
            const context = canvas.getContext("2d");
            context.fillStyle = msg;
            context.fillStyle = context.fillRect(
              0,
              0,
              canvas.width,
              canvas.height
            );

            const imageBuffer = canvas.toBuffer("image/jpeg");
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(imageBuffer);
            return;
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
function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const hexCode = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return { hex: hexCode, rgba: { red, blue, green } };
}
function isValidHexColor(hex) {
  // HEX kodunun uzunluğunu kontrol etme
  if (!/^([0-9A-Fa-f]{3,6})$/.test(hex)) {
    return false;
  }
  return true;
}
function generatePassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}
