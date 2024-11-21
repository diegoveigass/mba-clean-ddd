import { AnswerQuestionUseCase } from './answer-question'
import type { AnswersRepository } from '../repositories/answers-repository'
import { CreateQuestionUseCase } from './create-question'
import type { QuestionsRepository } from '../repositories/questions-repository'

const fakeQuestionsRepository: QuestionsRepository = {
  async create(question) {
    return
  },
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    content: 'Nova question',
    title: 'Nova question',
    authorId: '1',
  })

  expect(question.id).toBeTruthy()
  expect(question.content).toEqual('Nova question')
})
