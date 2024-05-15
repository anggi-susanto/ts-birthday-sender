import { IUsersRepository } from 'src/app/repositories/User'
import { IUserOutRequestDTO } from 'src/domain/dtos/User/UserOut'

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

  /**
   * A function that processes daily user data to send birthday emails if applicable.
   *
   * @param {number} page - the page number to process
   * @return {void}
   */
  processDaily(page: number): void

  /**
   * Process users recursively based on pagination.
   *
   * @param {number} page - The page number for pagination.
   * @return {void} No return value.
   */
  generateSchedule(page: number): void

  /**
   * Handle retry for user.
   *
   * @param {User} user - The user to be retried.
   * @return {void} No return value.
   */
  handleRetry(user: IUserOutRequestDTO, repo: IUsersRepository): void
}
