import schedule from 'node-schedule'

import { birthDayComposer } from '../infra/services/composers/BirthDay/birthDay'
/**
 * This is the main function that schedules birthday reminders and retries unsent emails.
 * It is executed once when the application starts.
 *
 * @return {Promise<void>} A promise that resolves when the main function is complete.
 */
export const main = async () => {
  // Run the allBirthday function to send out birthday reminders for the current day
  await birthDayComposer().allBirthday()

  // Schedule a recurring job to run daily at midnight
  schedule.scheduleJob('0 0 * * *', async () => {
    // Run the dailyBirthdayCheck function to check for upcoming birthdays
    await birthDayComposer().dailyBirthdayCheck()

    // Run the retryAllUnsentEmails function to resend any unsent birthday emails
    await birthDayComposer().retryAllUnsentEmails()
  })
}
