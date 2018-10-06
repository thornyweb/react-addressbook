import { AddContactRequest, Contact, LookupPostcodeResponse, ValidatePostcodeResponse } from '../types';
import { axiosPromise, postcodesIORequest, restDBRequest } from "./apis";

export function GetContacts(): Promise<Contact[]> {
  return axiosPromise(() => restDBRequest.get(
    '/contacts',
    {
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': '5bb25b0abd79880aab0a78a1'
      }
    }
  ));
}

export function GetContact(uid: string): Promise<Contact> {
  return axiosPromise(() => restDBRequest.get(
    `/contacts/${uid}`,
    {
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-apikey': '5bb25b0abd79880aab0a78a1'
      }
    }
  ));
}

export function AddContact(req: AddContactRequest): Promise<Contact> {
  return axiosPromise(() => restDBRequest.post(
    '/contacts',
    req,
    {
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-apikey': '5bb25b0abd79880aab0a78a1'
      }
    }
  ));
}

export function EditContact(uid: string, req: Contact): Promise<Contact> {
  // tslint:disable-next-line:no-console
  console.log(`Editing contact : ${uid} : with data : ${JSON.stringify(req,null,2)}`);
  return axiosPromise(() => restDBRequest.put(
    `/contacts/${uid}`,
    req,
    {
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-apikey': '5bb25b0abd79880aab0a78a1'
      }
    }
  ));
}

export function DeleteContact(uid: string): Promise<Contact> {
  return axiosPromise(() => restDBRequest.delete(
    `/contacts/${uid}`,
    {
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-apikey': '5bb25b0abd79880aab0a78a1'
      }
    }
  ));
}

export function ValidatePostcode(postcode: string): Promise<ValidatePostcodeResponse> {
  return axiosPromise(() => postcodesIORequest.get(`/${postcode}/validate`));
}

export function LookupPostcode(postcode: string): Promise<LookupPostcodeResponse> {
  return axiosPromise(() => postcodesIORequest.get(`/${postcode}`));
}