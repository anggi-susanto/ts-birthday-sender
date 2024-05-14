import { IBirthDayUseCase } from '../../../../app/useCases/BirthDay/BirthDay'
import { BirthDayUseCase } from '../../../../app/useCases/BirthDay/Implementations/BirthDayUcase'
import { prismaClient } from '../../../databases/prisma/connection'
import { UserRepository } from '../../../repositories/prisma/User'

export interface IBirthDayHandler {
  allBirthday: () => Promise<void>
  dailyBirthdayCheck: () => Promise<void>
  retryAllUnsentEmails: () => Promise<void>
}

class BirthDayHandler implements IBirthDayHandler {
  constructor(private useCase: IBirthDayUseCase) {}

  async allBirthday(): Promise<void> {
    await this.useCase.scheduleAllBirthDay()
  }

  async dailyBirthdayCheck(): Promise<void> {
    await this.useCase.dailyBirthdayCheck()
  }

  async retryAllUnsentEmails(): Promise<void> {
    await this.useCase.retryAllUnsentEmails()
  }
}
export function birthDayComposer(): BirthDayHandler {
  const repoository = new UserRepository(prismaClient)
  const useCase = new BirthDayUseCase(repoository)
  const handler = new BirthDayHandler(useCase)
  return handler
}
