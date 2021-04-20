import produce from 'immer';
import {IDataLogin} from '../../../Interfaces/IDataLogin'
import { IUserInfo } from '../../../Interfaces/IUserInfo';

interface IActionUser{
  type: string,
  LoginInfo: IDataLogin | null
}

export default function user(state: IUserInfo | null  = null, action: IActionUser) {
  switch (action.type) {
    case '@user/login':
      return produce(state, (draft: IUserInfo | null) => {
        draft = {
          nome: 'Diego Nascimento',
          token: 'ioajdiaioijo'
        }
        localStorage.setItem('token', JSON.stringify(draft));
        return draft
      });
    case '@user/logout':
      return produce(state, (draft: IUserInfo | null) => {
        draft = null
        localStorage.removeItem('token')
        return draft
      })
    case '@user/autoLogin':
      return produce(state, (draft: IUserInfo | null) => {
        const userInfo = localStorage.getItem('token')
        if (userInfo) {
          draft = JSON.parse(userInfo);
        }
        return draft
      })
    default:
      return state
  }
}
