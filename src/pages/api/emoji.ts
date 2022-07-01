// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";
import { getEmojiListFromString } from "@/lib/EmojiParser";
import type { NextApiRequest, NextApiResponse } from "next";

import Cors from "cors";

type ResponseData = {
  result?: { color: string }[];
  error?: {
    message: string;
  };
};

// TODO: middleware type ?
const initMiddleware = (middleware: any) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      // TODO: result type ?
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

const cors = initMiddleware(Cors({ methods: ["OPTION", "GET"] }));

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await cors(req, res);
  const emoji: string = req.query.emoji ? (req.query.emoji as string) : "";
  if (emoji === "") {
    res.status(400).json({ error: { message: "No emoji provided" } });
    return;
  }

  if (getEmojiListFromString(emoji).length === 0) {
    res.status(400).json({ error: { message: "Emoji was not included" } });
    return;
  }

  const ua: string = req.query.ua ? (req.query.ua as string) : "";
  if (ua === "") {
    res.status(400).json({ error: { message: "No user agent provided" } });
    return;
  }

  const emojis = getEmojiListFromString(emoji);

  const vibrantSourceList: VibrantSource[] = [];

  for (let i = 0; i < emojis.length; i++) {
    vibrantSourceList.push({
      emoji: emojis[i],
      type: "emoji",
    });
  }

  const origin = "http://localhost:3000";

  const vibrantResultList: VibrantResult[] = await getVibrantList(
    vibrantSourceList,
    origin,
    ua
  );

  const result = [];
  for (let i = 0; i < vibrantResultList.length; i++) {
    result.push({
      emoji: vibrantResultList[i].emoji?.text,
      color: vibrantResultList[i].top.hex,
    });
  }
  // ブラウサーのキャッシュを１時間に設定する
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.status(200).json({ result: result });
};

export default handler;
