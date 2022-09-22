import { store } from '../redux/store'

export const getUserLoggedInfo = () => {
  return store.getState().userReducer
}
