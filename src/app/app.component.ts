import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  //propName = 'Purple';
  propName = Math.random() > 0.5 ? 'blue' : 'pink' ;

  borderRadius = '8px';

  toolTipText = `The color is ${this.propName}`;

  someHtmlString = '<h1>attribute binding in da haus</h1>';

  quizzes = [];

  // manually added constructor
  constructor(private qSvc: QuizService) {

    this.quizzes = qSvc.loadQuizzes();
    console.log(this.quizzes);

  }

  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }



}
