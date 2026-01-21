export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateProductInput = (data) => {
  const required = ["name", "description", "price", "category", "images"]
  const missing = required.filter((field) => !data[field])
  if (missing.length > 0) {
    return { valid: false, missing }
  }
  if (data.price < 0) {
    return { valid: false, error: "Price cannot be negative" }
  }
  return { valid: true }
}
