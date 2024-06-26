/**
 * Integration tests for the UserPrismaRepository class using Vitest.
 * @module UserPrismaRepositoryTests
 */

import { beforeAll, describe, expect, it } from 'vitest'

import { IUsersRepository } from '../../../../../src/app/repositories/User'
import { UserRepository } from '../../../../../src/infra/repositories/prisma/User'
import { prisma } from '../../../../helpers/db/prisma'

/**
 * Test suite for the UserPrismaRepository class.
 * @function
 * @name UserPrismaRepositoryTests
 */
describe('UserPrismaRepository', () => {
  let userRepository: IUsersRepository
  const userData = {
    email: 'test@example.com',
    firstName: 'Test Integration',
    lastName: 'Exist User',
    location: 'Test Location',
    password: 'password',
    dateOfBirth: new Date('1990-01-01'),
    retryCount: 0,
    lastEmailSent: new Date(),
  }

  /**
   * Function to perform setup operations before running tests.
   * @function
   * @name beforeAllTests
   * @description This function initializes an instance of UserPrismaRepository before running tests.
   */
  beforeAll(async () => {
    userRepository = new UserRepository(prisma)
  })

  /**
   * Test case to verify that the create method creates a user.
   * @function
   * @name shouldCreateUser
   */
  it('create method should create a user', async () => {
    const createdUser = await userRepository.create(userData)
    expect(createdUser.email).toEqual(userData.email)
    expect(createdUser.firstName).toEqual(userData.firstName)
    expect(createdUser.lastName).toEqual(userData.lastName)
    expect(createdUser.location).toEqual(userData.location)
    expect(createdUser.dateOfBirth).toEqual(userData.dateOfBirth)
  })

  /**
   * Test case to verify that the findByEmail method finds a user by email.
   * @function
   * @name shouldFindUserByEmail
   */
  it('findByEmail method should find a user by email', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.findByEmail(createdUser.email)
    expect(user).not.toBeNull()
  })

  /**
   * Test case to verify that the findByEmail method does not find a user by email.
   * @function
   * @name shouldNotFindUserByEmail
   */
  it('findByEmail method should not find a user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com')
    expect(user).toBeNull()
  })

  /**
   * Test case to verify that the findById method finds a user by ID.
   * @function
   * @name shouldFindUserById
   */
  it('findById method should find a user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.findById(createdUser.id)
    expect(user).not.toBeNull()
  })

  /**
   * Test case to verify that the findById method does not find a user by ID.
   * @function
   * @name shouldNotFindUserById
   */
  it('findById method should not find a user by id', async () => {
    const user = await userRepository.findById('test')
    expect(user).toBeNull()
  })

  /**
   * Test case to verify that the findAll method finds all users.
   * @function
   * @name shouldFindAllUsers
   */
  it('findAll method should find all users', async () => {
    const createdUser = await prisma.user.create({
      data: userData,
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
    const paginatedData = await userRepository.findAll(1)

    expect(paginatedData.last_page).toEqual(1)
    expect(paginatedData.page).toEqual(1)
    expect(paginatedData.total).toEqual(1)
    expect(paginatedData.body).toEqual([createdUser])
  })

  /**
   * Test case to verify that the update method updates a user by ID.
   * @function
   * @name shouldUpdateUserById
   */
  it('update method should update a user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.update(createdUser, {
      firstName: 'New User',
      lastName: 'Updated',
      location: 'Updated Location',
      dateOfBirth: new Date('1990-01-01'),
      password: '123',
      retryCount: 0,
      lastEmailSent: new Date(),
    })

    expect(user.firstName).toEqual('New User')
    expect(user.lastName).toEqual('Updated')
    expect(user.location).toEqual('Updated Location')
    expect(user.dateOfBirth).toEqual(new Date('1990-01-01'))
  })

  /**
   * Test case to verify that the delete method deletes the user by ID.
   * @function
   * @name shouldDeleteUserById
   */
  it('delete method should delete the user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.delete(createdUser.id)

    expect(user).toBeUndefined()
  })
})
