import { api } from '../utils/api';
import { User } from '../interfaces/UserModel';

export const SaveData = async (userData: User) => {
  return (await api.post(`/user`, { userData })) as boolean;
};
