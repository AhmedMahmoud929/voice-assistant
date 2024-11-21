import { NextRequest, NextResponse } from "next/server";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { geminiSystemInstructions } from "@/constants/geminiConfig";
import { Message } from "@/app/page";

// Initialize the generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    // Parse the FormData from the request
    const formData = await req.formData();

    // Extract the uploaded file and message history
    const audioFile = formData.get("userAudio") as File | null;
    // Validate the uploaded file

    if (!audioFile || !(audioFile instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 }
      );
    }

    // Save the file to a temporary directory
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "audio-"));
    const tempFilePath = path.join(tempDir, audioFile.name);
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    await fs.writeFile(tempFilePath, buffer);

    // Formate the messages history
    const messageHistory = JSON.parse(
      (formData.get("messageHistory") as string) || "[]"
    );

    const history: Content[] = [];
    messageHistory.map((ele: Message) => {
      const msg: Content = {
        role: ele.role,
        parts: [{ text: ele.content }],
      };
      history.push(msg);
    });

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: geminiSystemInstructions,
    });

    // Prepare the chat history
    const chat = model.startChat({
      history,
    });

    // Generate content based on the uploaded file, user prompt, and chat history
    const result = await chat.sendMessage([
      "keep the conversion going",
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: audioFile.type,
        },
      },
    ]);

    const generatedResponse = result.response.text();

    console.log(generatedResponse);

    // Clean up the temporary file
    await fs.unlink(tempFilePath);
    await fs.rmdir(tempDir);

    return NextResponse.json({ success: true, response: generatedResponse });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
