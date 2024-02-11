import { NextFunction, Request, Response } from "express";


export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user === undefined) {
    return "User does not exist";
  }

  if (req.user.role === "admin") {
    return next();
  }
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}