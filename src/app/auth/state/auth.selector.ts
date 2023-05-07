import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';


// da um nome para o estado
export const AUTH_STATE_NAME = 'auth';

// o selector cria uma função/feature baseada do auth state selecionar o auth estado 
const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

// cria um seletor pra pegar esse auth state e retornar true se tiveo usuário no estado
export const isAuthenticated = createSelector(getAuthState, (state) => {
  console.log('selector isAuthenticated')
  if (state.user) {
    console.log('temo usuário true porra')
    return true;
  }

  return console.log(false)
});

// cria um seletor pra pegar/selecionar o token do usuário
export const getToken = createSelector(getAuthState, (state) => {
  return state.user ? state.user.userToken : null;
});


