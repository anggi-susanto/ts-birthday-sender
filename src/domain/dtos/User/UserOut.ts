/**
 * Data Transfer Object (DTO) representing the output user data.
 *
 * @interface
 */
export interface IUserOutRequestDTO {
  /**
   * The ID of the user.
   */
  id: string

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
   * The optional creation date of the user account.
   */
  createdAt?: Date

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
  lastEmailSent?: Date | null
}
