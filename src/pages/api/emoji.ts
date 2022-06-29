// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";
import { getEmojiListFromString } from "@/lib/EmojiParser";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  result?: { color: string }[];
  error?: {
    message: string;
  };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
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
    result.push({ color: vibrantResultList[i].top.hex });
  }
  res.status(200).json({ result: result });
};

export default handler;
