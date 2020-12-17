import {api} from '../utils/api'
import {User} from '../interfaces/UserModel'

export const InstagramSearch = async (username: string) => {
  return await api.get(`/instagram/${username}`) as User;
}