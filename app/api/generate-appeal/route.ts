import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "API key not configured. Please add ANTHROPIC_API_KEY to environment variables." },
        { status: 500 }
      );
    }

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const body = await request.json();

    const {
      referenceNumber,
      userName,
      company,
      fineAmount,
      reason,
      keyFacts,
    } = body;

    // Validate required fields
    if (
      !referenceNumber ||
      !userName ||
      !company ||
      !fineAmount ||
      !reason ||
      !keyFacts
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert in writing professional appeal letters for UK parking tickets and train fines.
Your role is to generate compelling, well-structured appeal emails that are:
- Professional and formal in tone
- Persuasive and clear
- Legally sound but not overly technical
- Respectful but firm in challenging the fine
- Organized with clear paragraphs and logical flow

The email should include:
1. A professional greeting and opening that states the purpose
2. Clear reference to the fine/ticket details provided
3. A compelling argument incorporating the user's stated reason and key facts
4. A call to action requesting a response
5. Professional closing

Do not include a subject line - just the email body itself.`;

    const userPrompt = `Please generate a professional appeal letter with the following details:

Reference Number: ${referenceNumber}
Recipient Company: ${company}
Appellant Name: ${userName}
Fine Amount: £${fineAmount}
Reason for Appeal: ${reason}
Key Facts/Context: ${keyFacts}

Generate a persuasive, professional appeal email that incorporates all these details naturally. The email should be ready to send as-is.`;

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const emailContent =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ email: emailContent });
  } catch (error) {
    console.error("Error generating appeal:", error);

    let errorMessage = "Failed to generate appeal letter";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;

      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        statusCode = 401;
        errorMessage = "Invalid API key. Please check your configuration.";
      } else if (error.message.includes("rate limit")) {
        statusCode = 429;
        errorMessage = "Rate limit exceeded. Please try again later.";
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
