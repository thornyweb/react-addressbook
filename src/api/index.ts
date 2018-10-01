import { Contact } from '../types/contacts';
import { api, axiosPromise } from "./endpoints";

export function GetContacts(): Promise<Contact[]> {
  return axiosPromise(() => api.get(
    '/contacts',
    {
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': '5bb25b0abd79880aab0a78a1'
      }
    }
  ));
}