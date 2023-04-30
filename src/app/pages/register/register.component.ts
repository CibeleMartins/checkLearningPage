import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { desenv } from '../../../environment/environment';
import { UserService } from 'src/app/services/UserService.service';
import { UserRegistered } from 'src/app/interfaces/interfacesUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  viewSnackbar: boolean = false;
  messageSnackBar!: string;
  warningIcon!: string;

  private readonly apiKey = desenv.publicKeyEmailJs
  private readonly idService = desenv.idServiceEmailJs
  private readonly template = desenv.templateEmailJs

  private password = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      completeName: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(10),
          this.completeNameValidator.bind(this),
        ],
        null
      ),
      email: new FormControl(
        '',
        [Validators.required, Validators.email, this.emailValidator.bind(this)],
        null
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.passwordValidator.bind(this),
        ],
        null
      ),
      confirmationPassword: new FormControl(
        '',
        [Validators.required, this.confirmationPasswordValidator.bind(this)],
        null
      ),
    });
  }


  completeNameValidator(control: FormControl): { [s: string]: boolean } {
    const timeout = setTimeout(() => {
      if (control.value && control.errors) {
        this.viewSnackbar = !this.viewSnackbar;
        this.messageSnackBar = 'O nome completo muito pequeno.';
        this.warningIcon = '../../../assets//warningIcon.png';
      }
    }, 1500);
    return null;
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (
      control.value &&
      control.errors &&
      control.errors['email'] &&
      control.value.length > 4
    ) {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'E-mail inválido.';
      this.warningIcon = '../../../assets//warningIcon.png';
      return { emailInvalid: true };
    }
    return null;
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    setTimeout(() => {
      if (control.value && control.errors) {
        this.viewSnackbar = !this.viewSnackbar;
        this.messageSnackBar = 'Senha muito pequena.';
        this.warningIcon = '../../../assets//warningIcon.png';
      }
      this.password = control.value;
    }, 1500);

    return null;
  }

  confirmationPasswordValidator(control: FormControl): { [s: string]: boolean; } {
    if (control.value && control.value !== this.password) {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'As senhas não estão iguais.';
      this.warningIcon = '../../../assets//warningIcon.png';
      return { confirmationPasswordInvalid: true };
    } else {
      return null;
    }
  }

  onRegister() {
    if (this.registerForm.invalid) {
      let invalidControls: any = [];
      let key!: string;

      for (key in this.registerForm.controls) {
        if (this.registerForm.controls[key].errors !== null) {
          invalidControls.push({
            error: this.registerForm.controls[key].errors !== null,
            nameControl: key,
          });
        }
      }

      const controlsWithError = invalidControls
        .map((c: any) => {
          if (c.nameControl && c.nameControl.toLowerCase().includes('name')) {
            return (c.nameControl = 'Nome completo');
          } else if (c.nameControl.toLowerCase().includes('email')) {
            return (c.nameControl = 'E-mail');
          } else if (!!c.nameControl.toLowerCase().includes('password') && c.nameControl.toLowerCase().includes('confirmation')) {
            return (c.nameControl = 'Confirmação de senha');
          } else {
            return (c.nameControl = 'Senha');
          }
        })
        .join(' - ');

      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Campos do formulário inválidos. ' + controlsWithError;
      this.warningIcon = '../../../assets//warningIcon.png';
    } else {
      const templateParams = {
        to_name: "Check Learning",
        from_name: this.registerForm.get('completeName').value,
        message: "Estamos muito felizes em ter você com a gente! Esperamos que aproveite ao máximo o método de registro e checagem de aprendizado que a Check Learning desenvolveu pensando em você e no seu futuro!",
        emailUser: this.registerForm.get('email').value
      }

      emailjs.send(this.idService, this.template, templateParams, this.apiKey).then(response => {
        console.log("Email enviado com sucesso!", response.status, response.text)
      }).catch((error) => console.log(error))

      this.userService.register(
        {
          nameUser: this.registerForm.get('completeName').value,
          emailUser: this.registerForm.get('email').value,
          passwordUser: this.registerForm.get('password').value
        })

      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Cadastro realizado com sucesso! Enviamos um e-mail para você.';
      this.warningIcon = '../../../assets//successIcon.png';
      // console.log(this.registerForm);

      setTimeout(() => {
        this.registerForm.reset()
      }, 2000)
    }
  }
}
