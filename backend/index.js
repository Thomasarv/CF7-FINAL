import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);





app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is listening at port ${PORT}`);
});