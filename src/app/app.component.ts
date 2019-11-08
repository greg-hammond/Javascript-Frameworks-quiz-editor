import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


// add an interface here !
interface QuizDisplay {
  name: string;
  temporaryQuestionCount: number;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // week 10: this isn't really the right place to do this!
  // we should move this to ngOnInit
  // see  https://angular.io/guide/lifecycle-hooks
  // usually, constructors are used solely for DI
  constructor(private qSvc: QuizService) {}

  ngOnInit() {
    this.quizzes = this.qSvc
      .loadQuizzes()
      .map( x => ({ 
        name: x.name
        , temporaryQuestionCount: x.questionCount
      }));
  }

  title = 'quiz-editor';

  quizzes: QuizDisplay[] = [];

  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
  }

  addQuiz() {

    const newQuiz = {
      name: 'Untitled Quiz',
      temporaryQuestionCount: 0
    };

    // is this any different/better than using .push(newQuiz) ??
    // tom: yes!  arrays should be immutable - so never use push!
    this.quizzes = [...this.quizzes, newQuiz];

    //this.selectedQuiz = newQuiz;
    this.selectQuiz(newQuiz);
  }


}
