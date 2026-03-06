import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"



const connnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(connectionInstance.connection.host, "data")
  }
  catch (error) {
    console.log("Error", error)
    process.exit(1)
  }
}

export default connnectDB;
