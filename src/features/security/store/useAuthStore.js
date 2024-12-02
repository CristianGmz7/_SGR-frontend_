import { create } from 'zustand'
import { loginAsync } from '../../../shared/actions/auth/auth.action';
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  roles: [],
  refreshToken: null,
  isAuthenticated: false,
  message: "",
  error: false,
  login: async ( form ) => {

    const { status, data, message } = await loginAsync(form);

    if(status){
      set({
        error: false,
        user: {
          email: data.email,
          tokenExpiration: data.tokenExpiration
        },
        token: data.token,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        message: message
      });

      localStorage.setItem('user', JSON.stringify(get().user ?? {}));
      localStorage.setItem('token', get().token);
      localStorage.setItem('refreshToken', get().refreshToken);

      return;

    }

    set({message: message, error: true});
    return;

  },
  logout: () => {
    set({
      user: null,
      token: null,
      roles: [],
      refreshToken: null,
      isAuthenticated: false,
      message: '',
      error: false
    });
    localStorage.clear();
  },
  setSession: (user, token, refreshToken) => {
    set({
      user: user, 
      token: token, 
      refreshToken: refreshToken, 
      isAuthenticated: true
    })
    localStorage.setItem('user', JSON.stringify(get().user ?? {}))
    localStorage.setItem('token', get().token)
    localStorage.setItem('refreshToken', get().refreshToken)
  },
  validateAuthentication: () => {
    const token = localStorage.getItem('token') ?? '';

    if(token === ''){
      //si esto pasa no hay una sesion activa
      set({isAuthenticated: false});
      return;
    } else {
      try{
        const decodeJwt = jwtDecode(token);

        const currentTime = Math.floor(Date.now()/1000);    //fecha y hora actual en milisegundos

        if(decodeJwt.exp < currentTime){
          //token ya expirado
          console.log('Token expirado');
          set({isAuthenticated: false});
          return;
        }

        //extraer los roles
        const roles = decodeJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? [];
        // console.log(roles);    //si es string solo viene un rol entonces toca meterlo dentro de un arreglo
        set({isAuthenticated: true, roles: typeof(roles) === 'string' ? [roles] : roles})
        

        set({isAuthenticated: true});

      }
      catch(error){
        console.error(error);
        set({isAuthenticated: false});
      }
    }

  },
  //nuevo metodo implementado para evitar problemas renderizado del toast
  resetError: () => set({error: false, message: ""}),
}));
