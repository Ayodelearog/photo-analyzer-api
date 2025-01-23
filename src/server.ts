import express, { type Request, type Response, NextFunction } from "express"
import dotenv from "dotenv"
import analyzePhotos from "./routes/analyzePhotos"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())


app.use((req, res, next) => {
  // console.log(`${req.method} ${req.url}`)
  next()
})


app.use("/api", analyzePhotos)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" })
})

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack)
  res.status(500).json({ error: "Internal Server Error" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

