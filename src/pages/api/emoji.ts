// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";
import { getEmojiListFromString } from "@/lib/EmojiParser";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  color?: string;
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

  const vibrantSourceList: VibrantSource[] = [
    {
      emoji: emoji,
      type: "emoji",
    },
  ];

  const origin = "http://localhost:3000";

  const vibrantResultList: VibrantResult[] = await getVibrantList(
    vibrantSourceList,
    origin,
    ua
  );

  res.status(200).json({ color: vibrantResultList[0].top.hex });
};

export default handler;
