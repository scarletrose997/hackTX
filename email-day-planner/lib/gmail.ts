import { google } from "googleapis";

export async function getTodaysEmails(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  // Fetch emails from last 24 hours
  const since = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000);

  const list = await gmail.users.messages.list({
    userId: "me",
    q: `after:${since}`,
    maxResults: 30, // Cap for hackathon
  });

  const messages = list.data.messages || [];

  const emails = await Promise.all(
    messages.map(async (msg) => {
      const detail = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "full",
      });

      const headers = detail.data.payload?.headers || [];
      const getHeader = (name: string) =>
        headers.find((h) => h.name === name)?.value || "";

      // Decode body
      const body = extractBody(detail.data.payload);

      return {
        id: msg.id!,
        subject: getHeader("Subject"),
        from: getHeader("From"),
        date: getHeader("Date"),
        snippet: detail.data.snippet || "",
        body: body.slice(0, 1500),  // Trim to save tokens
        isRead: !detail.data.labelIds?.includes("UNREAD"),
      };
    })
  );

  return emails;
}

function extractBody(payload: any): string {
  if (!payload) return "";
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, "base64").toString("utf-8");
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain") {
        return Buffer.from(part.body?.data || "", "base64").toString("utf-8");
      }
    }
  }
  return "";
}
