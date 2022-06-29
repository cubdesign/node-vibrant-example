import handler from "@/pages/api/emoji";
import { testApiHandler } from "next-test-api-route-handler";
import { UA } from "../../testData/ua";

describe("pages/api/emoji", () => {
  it("引数（emoji）がなかったらエラーを返す", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const customInit: RequestInit = {
          method: "GET",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
        };
        const res = await fetch(customInit);
        await expect(res.json()).resolves.toStrictEqual({
          error: { message: "No emoji provided" },
        });
      },
    });
  });

  it("引数（ua）がなかったらエラーを返す", async () => {
    await testApiHandler({
      requestPatcher: (req) => {
        const param = {
          emoji: "🤔",
        };
        const query = new URLSearchParams(param);
        req.url = `/api/emoji?${query}`;
      },
      handler,

      test: async ({ fetch }) => {
        const customInit: RequestInit = {
          method: "GET",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
        };
        const res = await fetch(customInit);
        await expect(res.json()).resolves.toStrictEqual({
          error: { message: "No user agent provided" },
        });
      },
    });
  });

  it("emojiの引数に絵文字がなかったらエラーを返す", async () => {
    await testApiHandler({
      requestPatcher: (req) => {
        const param = {
          emoji: "dfdf",
          ua: UA.MacBook_12_Chrome,
        };
        const query = new URLSearchParams(param);
        req.url = `/api/emoji?${query}`;
      },
      handler,

      test: async ({ fetch }) => {
        const customInit: RequestInit = {
          method: "GET",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
        };
        const res = await fetch(customInit);
        await expect(res.json()).resolves.toStrictEqual({
          error: { message: "Emoji was not included" },
        });
      },
    });
  });

  it("絵文字を渡したら特徴色を返す(一つ)", async () => {
    await testApiHandler({
      requestPatcher: (req) => {
        const param = {
          emoji: "👾",
          ua: UA.MacBook_12_Chrome,
        };
        const query = new URLSearchParams(param);
        req.url = `/api/emoji?${query}`;
      },

      handler,
      test: async ({ fetch }) => {
        const customInit: RequestInit = {
          method: "GET",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
        };
        const res = await fetch(customInit);
        await expect(res.json()).resolves.toStrictEqual({
          result: [{ emoji: "👾", color: "#7c5cac" }],
        });
      },
    });
  });

  it("絵文字を渡したら特徴色を返す(複数)", async () => {
    await testApiHandler({
      requestPatcher: (req) => {
        const param = {
          emoji: "👾🍎",
          ua: UA.MacBook_12_Chrome,
        };
        const query = new URLSearchParams(param);
        req.url = `/api/emoji?${query}`;
      },

      handler,
      test: async ({ fetch }) => {
        const customInit: RequestInit = {
          method: "GET",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
        };
        const res = await fetch(customInit);
        await expect(res.json()).resolves.toStrictEqual({
          result: [
            { emoji: "👾", color: "#7c5cac" },
            { emoji: "🍎", color: "#fc9387" },
          ],
        });
      },
    });
  });
});
