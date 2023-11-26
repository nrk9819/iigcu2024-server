import fs from "fs/promises";
import path from "path";
import express, { Request, Response } from "express";
import multer from "multer";
import generateId from "../functions/generate-id";
import executePgQuery from "../utils/execute-pg-query";
import createRegistrationTemplate, {
  FormData,
} from "../functions/create-registration-template";
import generatePdf from "../functions/generate-pdf";
import buildInsertQuery from "../utils/build-insert-query";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.post("/", upload.any(), async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[];
    const data = req.body;
    const regnId = generateId(6);
    const formData: FormData = { regnId, ...data };

    // check if the provided email address alredy exists in the registration table
    const queryResult = await executePgQuery(
      "SELECT COUNT(*) FROM registrations WHERE email_id = $1",
      [formData.email_id]
    );
    if (parseInt(queryResult[0].count, 10)) {
      return res.status(400).json({
        message:
          "A registration has already been made with this email address. If you have got your registration details deleted, kindly contact the organizers for recovery.",
      });
    }

    // create a directory for the registration
    const regnDir = path.join(process.cwd(), `registrations/${regnId}`);
    await fs.mkdir(regnDir, { recursive: true });

    // store images
    images.map(async (image) => {
      const filePath = path.join(
        regnDir,
        `${image.fieldname}.${image.originalname.split(".").pop()}`
      );
      if (image.fieldname === "registration_proof") {
        formData.registration_proof = true;
        await fs.writeFile(filePath, image.buffer);
        console.log(`${formData.registration_proof ? "Paid" : "Unpaid"}`);
      }
      if (image.fieldname === "accomodation_proof") {
        formData.accomodation_proof = true;
        await fs.writeFile(filePath, image.buffer);
      }
    });

    // store registration_details.pdf in directory
    const pdfBuffer = await generatePdf(createRegistrationTemplate(formData));
    if (pdfBuffer instanceof Buffer)
      await fs.writeFile(
        path.join(regnDir, "registration_details.pdf"),
        pdfBuffer
      );

    // write formData into database (registration table)
    const { query, params } = buildInsertQuery("registrations", formData);
    await executePgQuery(query, params);

    // respond to client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=registration_details.pdf`
    );

    const responseData = {
      pdfBuffer: pdfBuffer.toString("base64"),
      message: "Registration successful and PDF downloaded.",
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error. Try again later" });
    return;
  }
});

export default router;
