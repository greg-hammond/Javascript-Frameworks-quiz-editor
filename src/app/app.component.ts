import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


// add an interface here !
interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
}

interface QuestionDisplay {
  name: string;
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

  failedToLoadQuizzes = false;

  ngOnInit() {
    
    //this.quizzes = [];
    
    this.qSvc
      .loadQuizzes()
      .subscribe(
        
        data => {
          console.log(data);
          // +1: data is cast to an array of any.
          // since it's cast as an array, we now have .map
          // this is ugly, but it makes typescript happy....
          // will get to a 'better way' in the future..?
          this.quizzes = (<any[]> data).map(x => ({
            name: x.name
            , questions: x.questions
          }));
        },

        error => {
          console.error(error.error);
          this.failedToLoadQuizzes = true;
        }

      );

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
      questions: []
    };

    // is this any different/better than using .push(newQuiz) ??
    // tom: yes!  arrays should be immutable - so never use push!
    this.quizzes = [...this.quizzes, newQuiz];

    //this.selectedQuiz = newQuiz;
    this.selectQuiz(newQuiz);
  }


  addQuestion() {

    this.selectedQuiz.questions = 
      [...this.selectedQuiz.questions, {name: ''}];

  }


  removeQuestion(q) {

    this.selectedQuiz.questions = 
      this.selectedQuiz.questions.filter( x => x !== q );

  }


  jsPromisesOne() {

    const x = this.qSvc.getMagicNumberPromise(false);
    console.log(x);   // this is a promise, not a number !!!

    x.then(
      n => {
        console.log(n);  // now we get a number
        const y = this.qSvc.getMagicNumberPromise(true);
        console.log(y); // 
        y.then( n => console.log(n));
      }
    )

    .catch(err => console.error(err));

  }


  async jsPromisesTwo() {

    try {
      const x = await this.qSvc.getMagicNumberPromise(true);
      console.log(x);  // x is... 42 (a number) -- not a  promise -- it circumvents the .then() thing.
  
      const y = await this.qSvc.getMagicNumberPromise(false);
      console.log(y);
    }

    catch(err) {
      console.error(err);
    }

  }

}
