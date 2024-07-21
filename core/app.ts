import express from "express"
import userRoutes from "../routes/userRoutes"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend Repo")
})

app.use("/api/users", userRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

export default app
