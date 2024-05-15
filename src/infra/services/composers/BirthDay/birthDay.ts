import { BirthDayUseCase } from '../../../../app/useCases/BirthDay/Implementations/BirthDayUcase'
import { prismaClient } from '../../../databases/prisma/connection'
import { UserRepository } from '../../../repositories/prisma/User'

export function birthDayComposer(): BirthDayUseCase {
  const repoository = new UserRepository(prismaClient)
  const useCase = new BirthDayUseCase(repoository)
  return useCase
}
