import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  loadQuizzes() {

    //this is returning an observable now !!!!
    return this.builtInAngularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Greg%20Hammond');


    // this is the dummy stuff - to be replaced.
    // return [
    //   { name: 'Quiz 1',  questionCount: 10 }
    //   ,{ name: 'Quiz 2',  questionCount: 0 }
    //   ,{ name: 'Quiz 3',  questionCount: 25 }
    // ];
  }



  SaveQuizzes(changedQuizzes: any[], newQuizzes: any[] = []) {
    ​
        let h = new HttpHeaders({
          'Content-Type': 'application/json'
          , 'X-Sas-Token': 'sig=K2WE6NQPtyoV6ke5hwPEaEaW52fgvyFWUeCEdPJls1s'
        });
    ​
        //console.log(h);
    ​
        return this.builtInAngularHttpClient.post(
          'https://modern-js.azurewebsites.net/save-quizzes-proxy'
          , JSON.stringify(
            {
              "changedQuizzes": changedQuizzes
              , "newQuizzes": newQuizzes
            }
          )
          , {
            headers: h
          }
        );
      }




  getMagicNumberPromise(makeThisPromiseSucceed: boolean): Promise<number> {

    let p = new Promise<number>(
      (resolve, reject) => makeThisPromiseSucceed ? resolve(42) : reject("failed")
    );

    return p;

  }

}
