import admin from "../config/firebaseConfig"

const db = admin.firestore()
const usersCollection = db.collection("USERS")

interface User {
  first_name: string
  last_name: string
  email: string
  phone: number
}

interface UserWithId extends User {
  id: string
}

export const getUserById = async (id: string): Promise<UserWithId> => {
  try {
    const userDoc = await usersCollection.doc(id).get()
    if (!userDoc.exists) {
      throw new Error("User not found")
    }
    return { id: userDoc.id, ...userDoc.data() } as UserWithId
  } catch (error) {
    throw new Error(`Error fetching user: ${(error as any).message}`)
  }
}

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<UserWithId> => {
  try {
    await usersCollection.doc(id).set(user, { merge: true })
    const updatedUser = await getUserById(id)
    return updatedUser
  } catch (error) {
    throw new Error(`Error updating user: ${(error as any).message}`)
  }
}

export const getAllUsers = async (): Promise<UserWithId[]> => {
  try {
    const allUsers = await usersCollection.get()
    const usersList = allUsers.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserWithId[]
    return usersList
  } catch (error) {
    throw new Error(`Error fetching users: ${(error as any).message}`)
  }
}
