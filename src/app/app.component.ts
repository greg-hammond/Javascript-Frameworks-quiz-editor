import { Component } from '@angular/core';

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


}
