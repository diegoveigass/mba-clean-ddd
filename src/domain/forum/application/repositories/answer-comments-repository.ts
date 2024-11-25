import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
