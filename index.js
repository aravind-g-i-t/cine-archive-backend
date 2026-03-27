import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import movieRouter from "./routes/movieRoutes.js";
import morgan from "morgan";


dotenv.config()

const app= express()
const PORT = process.env.PORT


app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:["GET","POST","DELETE"]
    })
);

app.use(morgan('dev'));

app.use(express.json())


app.use("/api/movies",movieRouter)

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.use((err,req,res,next)=>{
    console.error("Unhandled error:",err.message);
    res.status(500).json({error:"Internal server error"})
})

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})