import * as express from "express";
import MailGun from "mailgun.js";
import * as Mailgun from "mailgun.js";
import * as FormData from "form-data";
import { CONFIG } from "../../config";

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
  username: "api",
  key: CONFIG.mailgunAPIKey,
});

const contactRouter = express.Router();

// Current route is /api/contact

contactRouter.post("/", async (req, res) => {
  const newEmail = req.body;
  try {
    const result = await mailgun.messages.create(CONFIG.mailgunDomain, {
      to: CONFIG.mailgunToEmail,
      subject: newEmail.subject,
      from: newEmail.from,
      text: newEmail.message,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Mailgun misfired" });
  }
});

export default contactRouter;
