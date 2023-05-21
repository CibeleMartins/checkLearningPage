import { Component } from '@angular/core';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {

  textAnimated: {}[] = [
    "Registrar",
    "Checar",
    "O SEU processo de desenvolvimento de uma habilidade nova",
    "Ou até mesmo uma habilidade que você já tenha, mas que deseja aprimorar",
  ];

  ngOnInit() {

  }


}
