import express, { Request } from "express";
const router = express.Router();
import { ensureAdmin, ensureAuthenticated } from "../middleware/checkAuth";

const getAllSessions = (req: Request) => {
  return new Promise((resolve, reject) => {
    if (!req.sessionStore.all){
      return reject("No active sessions");
    }
    req.sessionStore.all((error, res) => {
      if (error){
        return reject(error);
      } else {
        return resolve(res);
      }
    });
  });
}

const destroySession = (req: Request, sid: string) => {
  return new Promise((resolve, reject) => {
    req.sessionStore.destroy(sid, (error: any) => {
      if (error) {
        reject(`Error destroying session ${sid}: ${error}`);
      } else {
        resolve(sid);
      }
    });
  });
};

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, ensureAdmin, async (req, res) => {

  const allActiveSessions = await getAllSessions(req);
  console.log(allActiveSessions);

  let sessionIds = [""];

  if (allActiveSessions) {
      sessionIds = Object.keys(allActiveSessions);
      console.log(`sessionIds: ${sessionIds}`)
  }

  res.render("admin", {
    user: req.user,
    sessions: allActiveSessions,
    sessionIds: sessionIds
  });
});

router.post("/revoke", async (req, res) => {
  try {
    const sessionId = req.body.sessionId;
    if (!sessionId) {
      return res.status(400).send("No session id");
    }
    await destroySession(req, sessionId);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error revoking sessions");
  }
})

export default router;
