import User from "../models/User.js"

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.userId })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const syncUser = async (req, res, next) => {
  try {
    const { clerkId, email, firstName, lastName, profileImage } = req.body

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    let user = await User.findOne({ clerkId })
    if (!user) {
      user = new User({
        clerkId,
        email,
        firstName,
        lastName,
        profileImage,
      })
    } else {
      user.email = email
      user.firstName = firstName
      user.lastName = lastName
      user.profileImage = profileImage
    }

    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
}
