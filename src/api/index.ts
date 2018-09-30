import Axios, { AxiosPromise } from "axios";
import { Contacts } from '../common/types';

export const GetContacts = (): AxiosPromise<Contacts[]> => {
  return new Promise((resolve, reject) => {
    Axios.get(
      'https://addressbook-1c4b.restdb.io/rest/contacts',
      {
        headers: {
          'cache-control': 'no-cache',
          'x-apikey': 'a8455aaa000cbb87de9aa0324a4a54cf7583d'
        }
      }
    ).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    });
  });
};