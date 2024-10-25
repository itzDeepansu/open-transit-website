import { NextResponse } from "next/server";

async function createChatSession(apiKey, externalUserId) {
  const response = await fetch("https://api.on-demand.io/chat/v1/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({
      pluginIds: [],
      externalUserId: externalUserId,
    }),
  });

  const data = await response.json();
  return data.data.id; // Extract session ID
}

// Function to submit a query using the session ID
async function submitQuery(apiKey, sessionId, query) {
  const response = await fetch(
    `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({
        endpointId: "predefined-openai-gpt4o",
        query: query,
        pluginIds: [],
        responseMode: "sync",
      }),
    }
  );

  const data = await response.json();
  return data;
}
export async function POST(request) {
  const body = await request.json();

  const question = await body.question;
  const apiKey = "L17wVuf0s3BgmwtpXEZnG7q5SxVloF8f";
  const externalUserId = "671b311f478aa20e0cca4b14";
  const query = question;

  try {
    const sessionId = await createChatSession(apiKey, externalUserId);
    const response = await submitQuery(apiKey, sessionId, query);
    console.log(response);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("handled error ---Error:", error);
  }
}
// Function to create a chat session
