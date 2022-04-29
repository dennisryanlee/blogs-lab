import * as express from "express";
import baseRouter from "./routes/index";
import * as path from "path";

const app = express();

app.use(express.static("public")); // send public directory to client
app.use(express.json()); // allows for req.body parsing
app.use(baseRouter); // collects and organizes our routes

const clientPaths = ["/", "/blogs"]; // establishes paths for client to use

// allows for refreshing on client paths
app.get(clientPaths, (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

// if the client tries to access /api/* they will be notified
app.use("/api/*", (req, res) => res.status(404).json({ message: "Bad Route!" }));

// redirects client back to home after attempting an incorrect route not handled above
app.use("*", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
