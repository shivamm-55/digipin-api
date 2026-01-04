import { Router } from "express";
import {
  encodeDigipin,
  decodeDigipin
} from "../controllers/digipin.controller";

const router = Router();

router.post("/encode", encodeDigipin);
router.post("/decode", decodeDigipin);

export default router;
