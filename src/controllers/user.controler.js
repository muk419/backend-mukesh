import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { username, email, fullName, password } = req.body
  const requiredFields = [fullName, username, email, password]
  if (requiredFields.some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }
  else if (!email.includes("@") || !email.includes(".")) {
    throw new ApiError(400, "Email is not valid")
  }
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ApiError(409, "User already exists")
  }
  const existingUsername = await User.findOne({ username })
  if (existingUsername) {
    throw new ApiError(409, "Username already exists")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required")
  }
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is required")
  }
  console.log(avatarLocalPath,"data")
  console.log(coverImageLocalPath,"data")
  const avatarUpload = await uploadOnCloudinary(avatarLocalPath)
  const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatarUpload) {
    throw new ApiError(400, "Avatar upload failed")
  }
  if (!coverImageUpload) {
    throw new ApiError(400, "Cover image upload failed")
  }

  const user = await User.create({
    username,
    email,
    fullName,
    password,
    avatar: avatarUpload.url,
    coverImage: coverImageUpload.url,
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  return res.status(201).json({
    success: true,
    user: createdUser,
  })  
})
export { registerUser }