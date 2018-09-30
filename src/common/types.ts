export interface Contacts {
  id: number,
  name: string,
  email?: string,
  telephone?: string,
  address: string,
}

export interface ContactAddress {
  line1?: string,
  line2?: string,
  town?: string,
  county?: string,
  postcode?: string,
}