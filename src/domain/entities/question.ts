import { randomUUID } from 'node:crypto'
import type { Slug } from './values-object/slug'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}
class Question {
  public id: string
  public title: string
  public content: string
  public authorId: string
  public slug: Slug

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title
    this.content = props.content
    this.authorId = props.authorId
    this.slug = props.slug
    this.id = id ?? randomUUID()
  }
}
