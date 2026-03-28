import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getTodaysEmails } from "../../../lib/gmail";
import { generateDayPlan } from "../../../lib/gemini";

export async function GET() {
  const session: any = await getServerSession();

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const emails = await getTodaysEmails(session.accessToken);
    if (!emails.length) {
      return NextResponse.json({ plan: { summary: "No recent emails.", tasks: [], ignoredEmails: [] }, emails: [] });
    }
    const plan = await generateDayPlan(emails, new Date().toLocaleTimeString());
    return NextResponse.json({ plan, emails });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Failed to generate plan" }, { status: 500 });
  }
}
