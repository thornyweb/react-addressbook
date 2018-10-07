import { AddContactRequest, Contact, LookupPostcodeResponse, ValidatePostcodeResponse } from '../types';
import { axiosPromise, postcodesIORequest, restDBRequest } from "./apis";

/**
 * Model all API requests to address book database and postcode validation / lookup service
 * Return Promises based on Typed data specified in /src/types
 */

 /**
  * Returns array of all contacts stored in address book.
  */
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

/**
 * Returns Individual contact based on id being passed in to request.
 */
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

/**
 * Add contact request, model of a new contact passed in
 * Promise returned with Contact object
 */
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

/**
 * Take id of contact to edit and model of Contact.
 * Promise returned with contact object
 */
export function EditContact(uid: string, req: Contact): Promise<Contact> {
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

/**
 * Remove contact by passing in the id to database API.
 */
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

/**
 * validate postcode, return typed response as specified by postcodes.io API documentation.
 */
export function ValidatePostcode(postcode: string): Promise<ValidatePostcodeResponse> {
  return axiosPromise(() => postcodesIORequest.get(`/${postcode}/validate`));
}

/**
 * return postcode lookup information.
 */
export function LookupPostcode(postcode: string): Promise<LookupPostcodeResponse> {
  return axiosPromise(() => postcodesIORequest.get(`/${postcode}`));
}