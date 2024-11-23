import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('1') })

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: '1',
      content: 'Edit content',
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Edit content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('1') })

    inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        authorId: '2',
        content: 'Edit content',
        answerId: newAnswer.id.toString(),
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
