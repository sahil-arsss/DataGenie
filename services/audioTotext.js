// import {
//   GoogleGenAI,
//   createUserContent,
//   createPartFromUri,
// } from "@google/genai";

// const ai = new GoogleGenAI({
//     apiKey: "AIzaSyDeL9Z1teWnMRaKKQhMoEhnDw1ypbh9FLI",
// });

// export async function genrateText() {
//   const myfile = await ai.files.upload({
//     file: "./Recording.mp3",
//     config: { mimeType: "audio/mp3" },
//   });

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: createUserContent([
//       createPartFromUri(myfile.uri, myfile.mimeType),
//       "Transcribe this audio.",
//     ]),
//   });
//   console.log(response.text);
// }
