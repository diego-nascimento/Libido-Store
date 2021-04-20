interface ILoginInfo{
  Email: string,
  Senha: string
}

export const Login = (LoginInfo: ILoginInfo) => {
  return {
    type: '@user/login',
    LoginInfo,
  };
}

export const Logout = () => {
  return {
    type: '@user/logout'
  }
}

export const AutoLogin = () => {
  return {
    type: '@user/autoLogin'
  }
}
