import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('1') })

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: '1',
      title: 'Edit title',
      content: 'Edit content',
      questionId: newQuestion.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Edit title',
      content: 'Edit content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('1') })

    inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        authorId: '2',
        title: 'Edit title',
        content: 'Edit content',
        questionId: newQuestion.id.toString(),
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
