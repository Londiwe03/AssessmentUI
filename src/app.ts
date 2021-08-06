import { Sentence } from "./models/sentence";
import { Word } from "./models/word";
import { AssessmentService } from "services/assessment.service";
import { autoinject } from "aurelia-framework";
import { GridOptions } from "ag-grid-community";

@autoinject()
export class App {
  wordList: Word[];
  newWordList: string[] = [];
  wordTypes = [
    "Noun",
    "Verb",
    "Adjective",
    "Adverb",
    "Pronoun",
    "Preposition",
    "Conjunction",
    "Determiner",
    "Exclamation",
  ];

  sentence = "";
  sentenceList: Sentence[];

  constructor(
    private assessmentService: AssessmentService,
    private gridOptions: GridOptions
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async activate() {
    await this.getSentences();
  }

  async getSentences(): Promise<Sentence[]> {
    try {
      this.sentenceList = await this.assessmentService.GetExistingSentences();
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getWordsByType(selectedWordType: string): Promise<Word[]> {
    try {
      this.wordList = await this.assessmentService.GetWordsByType(
        selectedWordType
      );

      this.getFields(this.wordList, "data");

      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async submit(): Promise<Sentence[]> {
    try {
      const sentence = new Sentence();
      sentence.Id = 0;
      sentence.Data = this.sentence;
      await this.assessmentService.submitSentence(sentence);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addWordToSentence(word: string) {
    this.sentence = this.sentence.concat(word) + " ";
  }

  getFields(input: Word[], field: string): void {
    for (let i = 0; i < input.length; ++i)
      this.newWordList.push(input[i][field]);
  }
}
