import { Router } from "express"
import { updateUserData, fetchAllUsers } from "../controller/api"
import { authMiddleware } from "../middleware/authMiddleware"

const router = Router()

router.put("/update/:id", authMiddleware, updateUserData)
router.get("/all", authMiddleware, fetchAllUsers)

export default router
