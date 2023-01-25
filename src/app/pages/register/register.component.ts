import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  private password = '';

  constructor() {}

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

  confirmationPasswordValidator(control: FormControl): {[s: string]: boolean;} {
    if (control.value !== this.password && this.password.length > 0) {
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
          } else if(!!c.nameControl.toLowerCase().includes('password') && c.nameControl.toLowerCase().includes('confirmation')) {
            return (c.nameControl = 'Confirmação de senha');
          } else {
            return (c.nameControl = 'Senha');
          }
        })
        .join(' - ');

      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar ='Campos do formulário inválidos. ' + controlsWithError;
      this.warningIcon = '../../../assets//warningIcon.png';
    } else {
      this.registerForm.reset();
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Cadastro realizado com sucesso!';
      this.warningIcon = '../../../assets//successIcon.png';
      console.log(this.registerForm);
    }
  }
}
