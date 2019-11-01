import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes() {
    return [
      "quiz 1"
      ,"quiz 2"
      ,"quiz 3"
      ,"quiz 4"

    ];
  }


}
