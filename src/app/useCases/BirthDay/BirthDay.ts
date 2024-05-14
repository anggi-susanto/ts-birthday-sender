/**
 * Interface for the use case of creating a new user.
 *
 * @interface
 */
export interface IBirthDayUseCase {
  /**
   * Gnerate all schedules.
   *
   * @async
   * @returns {Promise<void>} The response data.
   */
  scheduleAllBirthDay(): Promise<void>

  /**
   * Asynchronously retrieves all users with unsent emails and retries sending them.
   *
   * @return {Promise<void>} A promise that resolves when all unsent emails have been retried.
   */
  retryAllUnsentEmails(): Promise<void>

  /**
   * Asynchronously checks for daily birthday greetings by processing users' data
   * starting from the first page.
   *
   * @return {Promise<void>} A promise that resolves when the process is complete.
   */
  dailyBirthdayCheck(): Promise<void>
}
