import {v2 as cloundinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

cloundinary.config({
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    cloud_name:process.env.CLOUD_NAME
})

export default cloundinary