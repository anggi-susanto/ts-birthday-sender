import { PrismaClient } from '@prisma/client'

import { IUsersRepository } from '../../../app/repositories/User'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'
import { IUserInRequestDTO } from '../../../domain/dtos/User/UserIn'
import { IUserOutRequestDTO } from '../../../domain/dtos/User/UserOut'

/**
 * Prisma implementation of the user repository.
 *
 * @class
 * @implements {IUsersRepository}
 */
export class UserRepository implements IUsersRepository {
  /**
   * Creates an instance of UserRepository.
   *
   * @constructor
   * @param {PrismaClient} prisma - The Prisma client instance.
   */
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new user.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The user data.
   * @returns {Promise<IUserOutRequestDTO>} The created user.
   */
  async create({
    email,
    firstName,
    lastName,
    location,
    password,
    dateOfBirth,
  }: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        location,
        password,
        dateOfBirth,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        location: true,
        createdAt: true,
        dateOfBirth: true,
        retryCount: true,
        lastEmailSent: true,
      },
    })

    return user
  }

  /**
   * Finds a user by email.
   *
   * @async
   * @param {string} email - The email to search for.
   * @returns {Promise<IUserInRequestDTO | unknown>} The found user or undefined.
   */
  async findByEmail(email: string): Promise<IUserInRequestDTO | unknown> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        location: true,
        password: true,
        createdAt: true,
        dateOfBirth: true,
        retryCount: true,
        lastEmailSent: true,
      },
    })

    return user
  }

  /**
   * Finds a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<IUserInRequestDTO | null>} The found user or null.
   */
  async findById(id: string): Promise<IUserInRequestDTO | null> {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        location: true,
        password: true,
        createdAt: true,
        dateOfBirth: true,
        retryCount: true,
        lastEmailSent: true,
      },
    })

    return user
  }

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of users.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4
    const users: IUserOutRequestDTO[] = await this.prisma.user.findMany({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        location: true,
        createdAt: true,
        dateOfBirth: true,
        retryCount: true,
        lastEmailSent: true,
      },
    })

    const total = await this.prisma.user.count()

    return {
      body: users,
      total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }

  /**
   * Updates a user with new data.
   *
   * @async
   * @param {IUserOutRequestDTO} user - The user to update.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user.
   */
  async update(
    user: IUserOutRequestDTO,
    {
      email,
      firstName,
      lastName,
      location,
      password,
      dateOfBirth,
      retryCount,
      lastEmailSent,
    }: IUpdateUserRequestDTO,
  ): Promise<IUserOutRequestDTO> {
    const userUpdated = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        firstName,
        lastName,
        location,
        password,
        dateOfBirth,
        retryCount,
        lastEmailSent,
      },
    })

    return userUpdated
  }

  /**
   * Deletes a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A Promise that resolves once the user is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }

  /**
   * Retrieves a list of users who have not received an email yet.
   *
   * @return {Promise<IUserOutRequestDTO[]>} A promise that resolves to an array of user objects who have not received an email yet.
   */
  async findNotSentEmails(): Promise<IUserOutRequestDTO[]> {
    const users = await this.prisma.user.findMany({
      where: {
        lastEmailSent: null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        location: true,
        createdAt: true,
        dateOfBirth: true,
        retryCount: true,
        lastEmailSent: true,
      },
    })
    return users
  }
}
