import { Request, Response } from "express"
import { ApiError } from "../entities/ApiError"
import { updateUser, getAllUsers } from "../repository/userCollection"

export const updateUserData = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params
  const { data } = req.body

  try {
    const updatedUser = await updateUser(id, data)
    res.status(200).send(updatedUser)
  } catch (error) {
    const apiError = new ApiError(500, "Error updating user data")
    res.status(apiError.statusCode).send(apiError)
  }
}

export const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)
  } catch (error) {
    const apiError = new ApiError(500, "Error fetching user data")
    res.status(apiError.statusCode).send({ message: apiError.message })
  }
}
