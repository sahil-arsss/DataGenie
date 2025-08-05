// import express from "express";
// import multer from "multer";
// import { transcribeAudio } from "../controllers/transcribeController.js";

// const router = express.Router();

// // Save uploaded file to /uploads folder
// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// router.post("/transcribe", upload.single("audio"), transcribeAudio);

// export default router;
