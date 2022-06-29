import * as express from "express";
import MailGun from "mailgun.js";
import * as Mailgun from "mailgun.js";
import * as FormData from "form-data";
import { MAILGUN_CONFIG } from "../../config";
import * as Types from "../../../types";

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
  username: "api",
  key: MAILGUN_CONFIG.mailgunAPIKey!,
});

const contactRouter = express.Router();

// Current route is /api/contact

contactRouter.post("/", async (req: Types.ReqUser, res) => {
  const newEmail = req.body;
  try {
    const result = await mailgun.messages.create(MAILGUN_CONFIG.mailgunDomain!, {
      to: MAILGUN_CONFIG.mailgunToEmail,
      subject: newEmail.subject,
      from: req!.user!.username,
      text: newEmail.message,
    });
    res.json(result);
  } catch (error) {
    console.log(`Mailgun Error...\n`);
    console.error(error);
    res.status(500).json({ message: "Mailgun misfired" });
  }
});

export default contactRouter;
