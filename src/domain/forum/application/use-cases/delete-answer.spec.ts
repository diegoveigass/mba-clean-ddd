import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('1') })

    inMemoryAnswersRepository.create(newAnswer)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: '1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('1') })

    inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: '2',
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
