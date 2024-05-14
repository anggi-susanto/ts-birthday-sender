import moment from 'moment-timezone'
import schedule from 'node-schedule'
import { IUserOutRequestDTO } from 'src/domain/dtos/User/UserOut'

import { sendEmail } from '../../../../infra/utils/emailSender'
import { IUsersRepository } from '../../../repositories/User'
import { IBirthDayUseCase } from '../BirthDay'

/**
 * Use case for handling birthday.
 *
 * @class
 * @implements {IBirthDayUseCase}
 */
export class BirthDayUseCase implements IBirthDayUseCase {
  /**
   * Creates an instance of BirthDayUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
   */
  constructor(private userRepository: IUsersRepository) {}

  /**
   * Gnerate all schedules.
   *
   * @async
   * @returns {Promise<void>} The response data.
   */
  async scheduleAllBirthDay(): Promise<void> {
    try {
      console.log("initialize to schedule all birthday's email")
      await this.generateSchedule(1)
      console.log("finished to schedule all birthday's email")
    } catch (error: any) {
      console.log(error)
    }
  }

  /**
   * Process users recursively based on pagination.
   *
   * @param {number} page - The page number for pagination.
   * @return {void} No return value.
   */
  async generateSchedule(page: number) {
    const users = await this.userRepository.findAll(page)
    if (!users.body.length) return
    users.body.forEach((v: IUserOutRequestDTO | unknown) => {
      if (typeof v !== 'undefined' && v !== null) {
        this.scheduleBirthdayEmail(v as IUserOutRequestDTO)
      }
    })
    if (users.page < users.last_page) {
      this.generateSchedule(users.page + 1)
    }
  }

  /**
   * Schedules a birthday email to be sent to a user.
   *
   * @param {IUserOutRequestDTO} user - The user object containing the necessary information for sending the email.
   * @return {Promise<void>} - A promise that resolves when the birthday email is scheduled.
   */
  async scheduleBirthdayEmail(user: IUserOutRequestDTO) {
    const timeZone = user.location
    const birthday = moment(user.dateOfBirth)
      .tz(timeZone)
      .startOf('day')
      .add(9, 'hours')
      .toDate()

    schedule.scheduleJob(birthday, async () => {
      const fullName = `${user.firstName} ${user.lastName}`
      const now = new Date()

      if (
        user.lastEmailSent &&
        moment(user.lastEmailSent).isSame(now, 'year')
      ) {
        return
      }

      const success = await sendEmail(fullName, user.email)
      if (success) {
        await this.userRepository.update(user, {
          lastEmailSent: now,
          retryCount: 0,
        })
      } else {
        await this.handleRetry(user)
      }
    })
  }

  /**
   * Handles the retry logic for sending birthday emails to a user.
   *
   * @param {IUserOutRequestDTO} user - The user object containing the necessary information for sending the email.
   * @return {Promise<void>} - A promise that resolves when the retry logic is completed.
   */
  async handleRetry(user: IUserOutRequestDTO) {
    if (
      user.retryCount &&
      user.retryCount < Number(process.env.MAX_RETRY_COUNT)
    ) {
      schedule.scheduleJob(moment().add(1, 'hour').toDate(), async () => {
        const fullName = `${user.firstName} ${user.lastName}`
        const now = new Date()
        const success = await sendEmail(fullName, user.email)

        if (success) {
          await this.userRepository.update(user, {
            lastEmailSent: now,
            retryCount: 0,
          })
        } else {
          await this.userRepository.update(user, {
            lastEmailSent: now,
            retryCount: user.retryCount ? user.retryCount + 1 : 1,
          })
          this.handleRetry(user)
        }
      })
    } else {
      await this.userRepository.update(user, {
        firstName: user.firstName,
        lastName: user.lastName,
        retryCount: 0,
      })
    }
  }

  /**
   * Asynchronously retrieves all users with unsent emails and retries sending them.
   *
   * @return {Promise<void>} A promise that resolves when all unsent emails have been retried.
   */
  async retryAllUnsentEmails(): Promise<void> {
    console.log("initialize retry birthday's email")
    const unsentUsers = await this.userRepository.findNotSentEmails()
    unsentUsers.forEach(this.handleRetry)
  }

  /**
   * Asynchronously checks for daily birthday greetings by processing users' data
   * starting from the first page.
   *
   * @return {Promise<void>} A promise that resolves when the process is complete.
   */
  async dailyBirthdayCheck(): Promise<void> {
    console.log("initialize daily birthday's email")
    await this.processDaily(1)
    console.log("finished daily birthday's email")
  }

  /**
   * A function that processes daily user data to send birthday emails if applicable.
   *
   * @param {number} page - the page number to process
   * @return {void}
   */
  async processDaily(page: number) {
    const now = moment()
    const users = await this.userRepository.findAll(page)
    if (!users.body.length) return
    users.body.forEach((v: IUserOutRequestDTO | unknown) => {
      if (typeof v !== 'undefined' && v !== null) {
        const user = v as IUserOutRequestDTO
        const birthdayThisYear = moment(user.dateOfBirth).year(now.year())

        if (
          now.isSame(birthdayThisYear, 'day') &&
          (!user.lastEmailSent ||
            !moment(user.lastEmailSent).isSame(now, 'year'))
        ) {
          this.scheduleBirthdayEmail(user)
        }
      }
    })
    if (users.page < users.last_page) {
      this.processDaily(users.page + 1)
    }
  }
}
