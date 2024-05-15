import cors from 'cors'
import express from 'express'
import schedule from 'node-schedule'

import { birthDayComposer } from '../../../infra/services/composers/BirthDay/birthDay'
import { authenticateRoutes } from '../routers/authenticate'
import { documentsRoutes } from '../routers/documentation'
import { userRoutes } from '../routers/user'

/**
 * Express application instance.
 */
const app = express()

/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json())

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
app.use('/', documentsRoutes)
app.use('/users', userRoutes)
app.use('/authenticate', authenticateRoutes)

// Run the allBirthday function to send out birthday reminders for the current day
birthDayComposer().scheduleAllBirthDay()

// Run the retryAllUnsentEmails function to resend any unsent birthday emails
birthDayComposer().retryAllUnsentEmails()

// Schedule a recurring job to run daily at midnight
schedule.scheduleJob('0 0 * * *', async () => {
  // Run the dailyBirthdayCheck function to check for upcoming birthdays
  birthDayComposer().dailyBirthdayCheck()

  // Run the retryAllUnsentEmails function to resend any unsent birthday emails
  birthDayComposer().retryAllUnsentEmails()
})

export { app }
