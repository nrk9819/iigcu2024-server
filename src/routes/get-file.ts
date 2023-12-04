import express, { Request, Response } from "express";
import path from "path";
import fg from "fast-glob";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const { id, fileName } = req.query;

  if (!id || !fileName) {
    return res.status(400).send({
      message: "Missing id or fileName",
    });
  }

  const fileEntries = fg.sync([
    `registrations/${id}/${fileName}.*{jpg,jpeg,png}`,
  ]);

  if (fileEntries.length === 0) {
    return res.sendStatus(404);
  }

  // Send the file as a response
  res.sendFile(path.resolve(fileEntries[0]));
});

export default router;
