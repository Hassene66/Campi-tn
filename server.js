const express = require("express")
const router = require("./routes/api/users")
const app =express()
app.use(express.json())
app.use("/api",router)
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}... `))