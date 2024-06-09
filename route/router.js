import express from "express";

const router = express.Router();

import {
  fetchUserData,
  diseaseDetails,
  fetchDiseaseData,
} from "../controller/recordsController.js";
import { BASE_URL } from "../../FrontEnd/src/API.Config.js";

// Route to save a new record
router.post("/savedata", diseaseDetails);
router.get("/fetchdata", fetchUserData);
router.get("/getuserdata/:id", fetchDiseaseData);
export default router;
