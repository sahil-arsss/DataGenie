// import {
//   GoogleGenAI,
//   createUserContent,
//   createPartFromUri,
// } from "@google/genai";
// import path from "path";
// import fs from "fs";

// const ai = new GoogleGenAI({
//   apiKey: "AIzaSyDeL9Z1teWnMRaKKQhMoEhnDw1ypbh9FLI", // REPLACE with secure .env later
// });

// export const transcribeAudio = async (req, res) => {
//   try {
//     const filePath = req.file.path;

//     const myfile = await ai.files.upload({
//       file: fs.createReadStream(filePath),
//       config: { mimeType: "audio/mp3" },
//     });

//     const response = await ai.models.generateContent({
//       model: "gemini-1.5-pro-latest",
//       contents: createUserContent([
//         createPartFromUri(myfile.uri, myfile.mimeType),
//         "Transcribe this audio in clean English.",
//       ]),
//     });

//     const text = response.text;
//     res.json({ transcript: text });
//   } catch (err) {
//     console.error("Transcription error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };
