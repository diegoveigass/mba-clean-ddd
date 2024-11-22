import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create an question', async () => {
    const { question } = await sut.execute({
      content: 'Nova question',
      title: 'Nova question',
      authorId: '1',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Nova question')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
