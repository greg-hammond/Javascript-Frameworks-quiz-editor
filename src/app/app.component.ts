import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';


// add an interface here !
interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
  markedForDelete: boolean;
  expiryDate: NgbDateStruct;    // { year: , month:, day: }
  newlyAddedQuiz: boolean;
  naiveQuizChecksum: string;
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
    
    this.loadQuizzes();

  }

  title = 'quiz-editor';

  quizzes: QuizDisplay[] = [];

  selectedQuiz = undefined;

  private loadQuizzes() {
    this.qSvc
      .loadQuizzes()
      .subscribe(data => {
        console.log(data);
        // +1: data is cast to an array of any.
        // since it's cast as an array, we now have .map
        // this is ugly, but it makes typescript happy....
        // will get to a 'better way' in the future..?
        this.quizzes = (<any[]>data).map(x => ({
          name: x.name,
          questions: x.questions,
          markedForDelete: false,
          expiryDate: { year: 2019, month: 1, day: 1 },
          newlyAddedQuiz: false,
          naiveQuizChecksum: this.generateNaiveQuizChecksum(x)
          
        }));
      }, error => {
        console.error(error.error);
        this.failedToLoadQuizzes = true;
      });
  }


  generateNaiveQuizChecksum(q: QuizDisplay) {
    return q.name + q.questions.map( x => '~' + x.name).join('');
  }



  selectQuiz(q) {
    this.selectedQuiz = q;
  }

  addQuiz() {

    const newQuiz = {
      name: 'Untitled Quiz',
      questions: [],
      markedForDelete: false
      ,expiryDate: {year: 2020, month: 2, day: 22}
      ,newlyAddedQuiz: true
    };

    // is this any different/better than using .push(newQuiz) ??
    // tom: yes!  arrays should be immutable - so never use push!
    this.quizzes = [...this.quizzes, newQuiz];

    //this.selectedQuiz = newQuiz;
    this.selectQuiz(newQuiz);
  }

  quizIsExpired(quiz: QuizDisplay): boolean {
    const today = new Date();
    // kludge-o-rific.  better way?
    const todayNgDate = new NgbDate( today.getFullYear(), today.getMonth() + 1, today.getDate() )
    return todayNgDate.after(quiz.expiryDate);
  }


  addQuestion() {

    this.selectedQuiz.questions = 
      [...this.selectedQuiz.questions, {name: ''}];

  }


  removeQuestion(q) {

    this.selectedQuiz.questions = 
      this.selectedQuiz.questions.filter( x => x !== q );

  }

  // week 12
  cancelBatchEdits() {

    this.loadQuizzes();
    this.selectedQuiz = undefined;

  }


  get numberOfDeletedQuizzes() {
    return this.getDeletedQuizzes().length;
  }

  getDeletedQuizzes() {
    return this.quizzes.filter( x => x.markedForDelete);
  }


  get numberOfAddedQuizzes() {
    return this.getAddedQuizzes().length;
  }

  getAddedQuizzes() {
    return this.quizzes.filter( x => x.newlyAddedQuiz && !x.markedForDelete);
  }


  get numberOfEditedQuizzes() {
    return this.getEditedQuizzes().length;
  }

  getEditedQuizzes() {
    return this.quizzes
      .filter( x => this.generateNaiveQuizChecksum(x) != x.naiveQuizChecksum 
        && !x.newlyAddedQuiz 
        && !x.markedForDelete );
  }

  // ------------------------------------------------------
  // promises testing below - nothing else to see here

  // looking at Promise usage
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

  // looking at async/await usage
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

  // looking at async/await usage
  async jsPromisesThree() {

    try {
      const x = this.qSvc.getMagicNumberPromise(true);
      console.log(x);  // x is... 42 (a number) -- not a  promise -- it circumvents the .then() thing.
  
      const y = this.qSvc.getMagicNumberPromise(true);
      console.log(y);

      const results = await Promise.all([x, y]);    // returns an array of results
      //const results = await Promise.race([x, y]);     // race returns just ONE result
      
      console.log(results);

    }

    catch(err) {
      console.error(err);
    }

  }





}
