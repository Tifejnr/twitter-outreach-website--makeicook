let emailErrorMessage: string

const isValidEmailId = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

export default function validateEmailInput(email: string) {
  if (email === "") {
    emailErrorMessage = "Email cannot be empty"
    return { emailErrorMessage }
  }

  if (!isValidEmailId(email)) {
    emailErrorMessage = "Provide a valid email address"
    return { emailErrorMessage }
  }

  return true
}
