/**
 * Data Transfer Object (DTO) representing the request to create a new user.
 *
 * @interface
 */
export interface ICreateUserRequestDTO {
  /**
   * The first name of the user.
   */
  firstName: string

  /**
   * The last name of the user.
   */
  lastName: string

  /**
   * The location of the user
   */
  location: string

  /**
   * The email address of the user.
   */
  email: string

  /**
   * The password of the user.
   */
  password: string

  /**
   * The date of birth of the user.
   */
  dateOfBirth: Date

  /**
   * The retry count of the user.
   */
  retryCount?: number

  /**
   * The last email sent of the user.
   */
  lastEmailSent?: Date
}
