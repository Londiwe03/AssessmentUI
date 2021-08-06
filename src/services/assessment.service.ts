import { Sentence } from "./../models/sentence";
import { Word } from "./../models/word";
import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { StringDecoder } from "string_decoder";

@inject(HttpClient)
export class AssessmentService {
  http = new HttpClient();

  constructor(httpClient) {
    this.http = httpClient;

    const baseUrl = "http://localhost:55167/assessment/";

    this.http.configure((config) => {
      config.withBaseUrl(baseUrl);
    });
  }

  GetWordsByType(wordType: string): Promise<Word[]> {
    return this.http
      .fetch(wordType)
      .then((response) => response.json())
      .then((words) => {
        return words;
      })
      .catch(() => {
        console.log("Error getting words");
      });
  }

  GetExistingSentences(): Promise<Sentence[]> {
    return this.http
      .fetch("history")
      .then((response) => response.json())
      .then((words) => {
        return words;
      })
      .catch(() => {
        console.log("Error getting sentences");
      });
  }

  submitSentence(sentence: Sentence): Promise<Sentence[]> {
    return this.http
      .fetch("sentence", {
        method: "post",
        body: json(sentence),
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers",
          "Access-Control-Allow-Methods": "POST",
        },
      })
      .then((response) => response.json())
      .then((words) => {
        return words;
      })
      .catch((error) => {
        console.log("Error saving sentence");
      });
  }
}
