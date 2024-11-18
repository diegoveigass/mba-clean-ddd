export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // s => whitespace
      .replace(/[^\w-]/g, '') // \w all words, ^ before \w non words
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '') // $ end of string

    return new Slug(slugText)
  }
}
