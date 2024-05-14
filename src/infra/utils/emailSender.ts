import axios from 'axios'

const sendEmail = async (fullName: string, email: string) => {
  try {
    if (!process.env.EMAIL_PROVIDER_API_URL) {
      throw new Error('EMAIL_PROVIDER_API_URL is not defined')
    }
    const response = await axios.post(process.env.EMAIL_PROVIDER_API_URL, {
      email,
      message: `Hey, ${fullName} it’s your birthday`,
    })
    return response.status === 200
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export { sendEmail }
