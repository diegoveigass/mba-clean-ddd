import type { Slug } from './values-object/slug'
import { Entity } from '../../core/entities/entity'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

class Question extends Entity<QuestionProps> {}
