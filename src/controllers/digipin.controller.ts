import { Request, Response } from "express";
import {
  getDIGIPINFromLatLon,
  getLatLonFromDIGIPIN
} from "../index";

/**
 * POST /api/digipin/encode
 */
export const encodeDigipin = (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;

  if (latitude == null || longitude == null) {
    return res.status(400).json({
      message: "latitude and longitude are required"
    });
  }

  const digipin = getDIGIPINFromLatLon(latitude, longitude);

  res.json({ digipin });
};

/**
 * POST /api/digipin/decode
 */
export const decodeDigipin = (req: Request, res: Response) => {
  const { digipin } = req.body;

  if (!digipin) {
    return res.status(400).json({
      message: "digipin is required"
    });
  }

  const result = getLatLonFromDIGIPIN(digipin);

  // 🔥 IMPORTANT: handle invalid case
  if (result === "Invalid DIGIPIN") {
    return res.status(400).json({
      message: "Invalid DIGIPIN provided"
    });
  }

  // ✅ Now TypeScript KNOWS result is DigiPinLatLon
  res.json({
    latitude: result.latitude,
    longitude: result.longitude
  });
};
