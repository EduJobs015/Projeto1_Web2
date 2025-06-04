import express from "express"


const app = express()

const PORT = process.env.PORT ?? 3090

app.use(express.json())

app.post("/api/")