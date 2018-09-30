import Axios from "axios";
import { Contacts } from '../common/types';

export const GetContacts = () => {
  return Axios.get(
    'https://addressbook-1c4b.restdb.io/rest/contacts',
    {
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': 'a8455aaa000cbb87de9aa0324a4a54cf7583d'
      }
    }
  )
  .then(response => response.data as Contacts)
  .catch(err => Error(err))
};