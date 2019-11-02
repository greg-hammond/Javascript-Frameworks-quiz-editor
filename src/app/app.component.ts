import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'quiz-editor';

  quizzes = [];

  selectedQuiz = undefined;

  // manually added constructor
  constructor(private qSvc: QuizService) {

    this.quizzes = qSvc.loadQuizzes();

  }


  selectQuiz(q) {
    this.selectedQuiz = q;
  }


  addQuiz() {

    const newQuiz = {
      name: 'Untitled Quiz',
      questionCount: 0
    };

    // is this any different/better than using .push(newQuiz) ??
    this.quizzes = [...this.quizzes, newQuiz];

    this.selectedQuiz = newQuiz;

  }


}
