import { convertToModelMessages, streamText, UIMessage } from "ai";
// import { openai } from "@ai-sdk/openai";
import { deepseek } from "@ai-sdk/deepseek";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const result = streamText({
      // model: openai("gpt-5-mini"),
      model: deepseek("deepseek-chat"),
      messages: await convertToModelMessages(messages),
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
