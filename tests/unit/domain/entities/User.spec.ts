/**
 * Unit tests for the User class using Vitest.
 * @module UserClassTests
 */

import { it, describe, expect } from 'vitest'

import { User } from '../../../../src/domain/entities/User'
import { Email } from '../../../../src/domain/valueObjects/Email'

/**
 * Test suite for the User class.
 * @function
 * @name UserClassTests
 */
describe('User Class', () => {
  /**
   * Test case to verify that it creates a user instance with provided data.
   * @function
   * @name shouldCreateUserInstance
   */
  it('should create a user instance with provided data', () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      location: 'Test Location',
      email: new Email({ address: 'john@example.com' }),
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      retryCount: 0,
    })
    expect(user.firstName).toBe('John')
    expect(user.lastName).toBe('Doe')
    expect(user.location).toBe('Test Location')
    expect(user.dateOfBirth).toStrictEqual(new Date('1990-01-01'))
    expect(user.email.address).toBe('john@example.com')
    expect(user.password).toBe('password123')
  })

  /**
   * Test case to verify that it creates a new user with the create method.
   * @function
   * @name shouldCreateNewUserWithCreateMethod
   */
  it('should create a new user with the create method', () => {
    const user = User.create({
      firstName: 'Jane',
      lastName: 'Doe',
      location: 'Test Location',
      email: 'jane.doe@example.com',
      password: '654321',
      dateOfBirth: new Date('1990-01-01'),
      retryCount: 0,
    })

    expect(user.firstName).toBe('Jane')
    expect(user.lastName).toBe('Doe')
    expect(user.location).toBe('Test Location')
    expect(user.dateOfBirth).toStrictEqual(new Date('1990-01-01'))
    expect(user.email.address).toBe('jane.doe@example.com')
    expect(user.password).toBe('654321')
  })
})
