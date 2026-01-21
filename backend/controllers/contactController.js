import Contact from "../models/Contact.js"
import { validateEmail } from "../utils/validation.js"

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" })
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ error: "Message too short" })
    }

    const contact = new Contact({ name, email, subject, message })
    await contact.save()

    res.status(201).json({
      message: "Thank you for your message. We will get back to you soon.",
      contact,
    })
  } catch (error) {
    next(error)
  }
}
