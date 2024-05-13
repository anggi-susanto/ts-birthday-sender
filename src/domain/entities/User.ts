import { ICreateUserRequestDTO } from '../dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../dtos/User/UpdateUser'
import { Email } from '../valueObjects/Email'

/**
 * Interface representing the structure of a user.
 *
 * @interface
 */
export interface UserInterface {
  firstName: string
  lastName: string
  location: string
  email: Email
  password: string
  dateOfBirth: string
}

/**
 * Class representing a user.
 *
 * @class
 */
export class User {
  private _firstName: string
  private _lastName: string
  private _location: string
  private _email: Email
  private _password: string
  private _dateOfBirth: string

  /**
   * Creates a new user instance based on the provided data.
   *
   * @static
   * @param {ICreateUserRequestDTO} data - The data to create a user.
   * @returns {User} The created user instance.
   */
  static create({
    email,
    firstName,
    lastName,
    location,
    password,
    dateOfBirth,
  }: ICreateUserRequestDTO): User {
    const newEmail = new Email({ address: email })
    return new User({
      firstName,
      lastName,
      location,
      email: newEmail,
      password,
      dateOfBirth,
    })
  }

  /**
   * Updates the user instance with the provided data.
   *
   * @static
   * @param {IUpdateUserRequestDTO} updatedUser - The data to update the user.
   * @returns {IUpdateUserRequestDTO} The updated user data.
   */
  static update(updatedUser: IUpdateUserRequestDTO): IUpdateUserRequestDTO {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address
    }
    return updatedUser
  }

  /**
   * Gets the user's first name.
   *
   * @readonly
   */
  get firstName(): string {
    return this._firstName
  }

  /**
   * Gets the user's last name.
   *
   * @readonly
   */
  get lastName(): string {
    return this._lastName
  }

  /**
   * Gets the user's location.
   *
   * @readonly
   */
  get location(): string {
    return this._location
  }

  /**
   * Gets the user's email.
   *
   * @readonly
   */
  get email(): Email {
    return this._email
  }

  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get password(): string {
    return this._password
  }

  /**
   * Gets the user's date of birth.
   *
   * @readonly
   */

  get dateOfBirth(): string {
    return this._dateOfBirth
  }

  /**
   * Creates an instance of User.
   *
   * @constructor
   * @param {UserInterface} props - The properties of the user.
   */
  constructor(props: UserInterface) {
    this._firstName = props.firstName
    this._lastName = props.lastName
    this._location = props.location
    this._password = props.password
    this._email = props.email
    this._dateOfBirth = props.dateOfBirth
  }
}
