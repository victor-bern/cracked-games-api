import axios from "axios";
import { Router } from "express";
import { loadData } from "../services/scrap";

const router = Router();

router.get("/:game", async (req, res) => {
  try {
    const { game } = req.params;

    const { data } = await axios.get<string>(
      `https://steamcrackedgames.com/search/?q=${game}`
    );
    const results = loadData(data);

    return res.status(200).json(results);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

export default router;
