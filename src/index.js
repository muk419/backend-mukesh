// require('dotenv').config({ path: './env' })
import dotenv from "dotenv"
import connnectDB from "./db/index.js"

dotenv.config({
  path: "./env"
})

connnectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error", error);
      throw error
    })
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listing on Port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log("")
  })




// import express from "express"
// const app = express()
//   (async () => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//       app.on("error", (error) => {
//         console.log("Error", error);
//         throw error
//       })
//       app.listen(process.env.PORT, () => {
//         console.log(`App is listing on Port ${process.env.PORT}`)
//       })
//     }
//     catch (error) {
//       console.log("Error", error)
//       throw error
//     }
//   })()