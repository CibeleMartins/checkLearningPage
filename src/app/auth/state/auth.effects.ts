import {
  setLoadingSpinner,
  setErrorMessage,
} from './../../store/Shared/shared.actions';
import { AuthService } from './../../services/auth.service';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { of } from 'rxjs';
import { Router } from '@angular/router';

// o que deu a entender é que os efeitos acontecem após algumas ações
// executam algum código após o login por exemplo

@Injectable()
export class AuthEffects {
  constructor(
    // tem as actions entâo faz alguma coisa com elas
    private actions$: Actions,
    // tem o AuthService entâo deve usar algum metodo de la
    private authService: AuthService,
    // tem a store entâo dele armazenar algo nela
    private store: Store<AppState>,
    // deve ter algo que redirecionar pra algum lugar pq tem acesso ao router
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            // pega os dados da ação de login e formata com a função do AuthService
            const user = this.authService.formatUser(data);
            // salva esse usuário no local storage
            this.authService.setUserInLocalStorage(user);
            // retorna a ação de login success
            console.log('sucesso login')
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            console.log('efeito redirect')
            this.router.navigate(['anotacoes']);
          }
        })
      );
    },
    { dispatch: false }
  );

  // signUp$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(signupStart),
  //     exhaustMap((action) => {
  //       return this.authService.signUp(action.email, action.password).pipe(
  //         map((data) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const user = this.authService.formatUser(data);
  //           this.authService.setUserInLocalStorage(user);
  //           return signupSuccess({ user, redirect: true });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = this.authService.getErrorMessage(
  //             errResp.error.error.message
  //           );
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        console.log('AUTOLOGIN')
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );
}
