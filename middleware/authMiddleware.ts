import { Request, Response, NextFunction } from "express"
import admin from "../config/firebaseConfig"
import { ApiError } from "../entities/ApiError"

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    const apiError = new ApiError(401, "Unauthorized")
    return res.status(apiError.statusCode).send(apiError)
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    ;(req as any).user = decodedToken
    next()
  } catch (error) {
    const apiError = new ApiError(401, "Unauthorized")
    res.status(apiError.statusCode).send(apiError)
  }
}
