import { NextApiRequest, NextApiResponse } from "next";

/**
 * A simple Next.js API route.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 */
export default function handler(req, res) {
  res.redirect("/apis");
}
