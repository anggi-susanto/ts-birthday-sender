/**
 * Data Transfer Object (DTO) representing the request to update a user.
 *
 * @interface
 */
export interface IUpdateUserRequestDTO {
  /**
   * The ID of the user to be updated.
   */
  id?: string

  /**
   * The first name of the user.
   */
  firstName: string

  /**
   * The last name of the user.
   */
  lastName: string

  /**
   * The updated location of the user.
   */
  location?: string

  /**
   * The updated email address of the user.
   */
  email?: string

  /**
   * The updated password of the user.
   */
  password?: string

  /**
   * The updated date of birth of the user.
   */
  dateOfBirth?: string
}
