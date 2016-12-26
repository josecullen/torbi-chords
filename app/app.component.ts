import { Component } from '@angular/core';

import { Bar, LineBar } from './bars/bars.component'
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';




@Component({
  selector: 'my-app',
  template: `
<router-outlet></router-outlet>
`,
  styles: [`
    :host {
      height: 100%;
    }

  `]
})
export class AppComponent  { 

}

/*

song "flaca"
  section "intro"
    |: G | B7 | Em | C :|
    | G | D  | G  | D |


Flaca[G], no me claves[B7] tus puñales[Em] por la espalda[C]
tan profundo[G], no me duelen[D], no me hacen mal[G].    [D] 
    

*/
