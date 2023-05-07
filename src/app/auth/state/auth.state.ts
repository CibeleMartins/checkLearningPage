import { User } from './../../models/user.model';

// o auth  estado tem uma propriedade user que recebe o modelo do usuário
export interface AuthState {
  user: User | null;
}
// o auth estado tbm tem um estado inicial pro usuário que é null
export const initialState: AuthState = {
  user: null,
};
