import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { desenv } from '../../../environment/environment';
import { UserService } from 'src/app/services/UserService.service';
import { AnimationOptions } from 'ngx-lottie';
import {SnackBarFeedbackService } from 'src/app/services/SnackbarFeedback.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '100vh',
    width: '80vh',
    paddingRight: '7%',
  };
  options: AnimationOptions = {
    path: '/assets/lottie-login-3.json',
  };

  private readonly apiKey = desenv.publicKeyEmailJs
  private readonly idService = desenv.idServiceEmailJs
  private readonly template = desenv.templateEmailJs

  private password = '';

  constructor(private userService: UserService, private feedbackService: SnackBarFeedbackService) { }

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
        this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Nome completo muito pequeno', icon: '../../../assets/warningIcon.png' })
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
      this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'E-mail inválido', icon: '../../../assets/warningIcon.png' })
      return { emailInvalid: true };
    }
    return null;
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    setTimeout(() => {
      if (control.value && control.errors) {
        this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Senha muito pequena', icon: '../../../assets//warningIcon.png' })
      }
      this.password = control.value;
    }, 1500);

    return null;
  }

  confirmationPasswordValidator(control: FormControl): { [s: string]: boolean; } {
    if (control.value && control.value !== this.password) {
      this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'As senhas não estão iguais', icon: '../../../assets//warningIcon.png' })

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
      this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Campos do formulário inválidos: ' + controlsWithError, icon: '../../../assets//warningIcon.png' })
    } else {
      const templateParams = {
        to_name: "Check Learning",
        from_name: this.registerForm.get('completeName').value,
        message: "Estamos muito felizes em ter você com a gente! Esperamos que aproveite ao máximo o método de registro e checagem de aprendizado que a Check Learning desenvolveu pensando em você e no seu futuro!",
        emailUser: this.registerForm.get('email').value
      }

      this.userService.register({ nameUser: this.registerForm.get('completeName').value, emailUser: this.registerForm.get('email').value, passwordUser: this.registerForm.get('password').value }).subscribe({
        next: (data) => console.log('usuario registrado: ', data),
        error: (error) => { this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Erro no serviço de cadastro do usuário. Aguarde alguns segundos.', icon: '../../../assets//warningIcon.png' }) },
        complete: () => {
          this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Cadastro realizado com sucesso!', icon: '../../../assets//successIcon.png' }),
          this.registerForm.reset()
          emailjs.send(this.idService, this.template, templateParams, this.apiKey).then(response => {
          this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'E-mail enviado p/ usuário cadastrado', icon: '../../../assets/successIcon.png' })
          }).catch((error) => { console.log(error), this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Erro no envio do e-mail p/ usuário cadastrado.', icon: '../../../assets/warningIcon.png' }) })
        }
      })
    }
  }
}
