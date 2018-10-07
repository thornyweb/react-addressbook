/**
 * Data model for a single contact record
 * Schema designed based on specification for address book.
 */
export interface Contact {
  _id: string,
  uid: string,
  name: string,
  email?: string,
  telephone?: string,
  address_line1?: string,
  address_line2?: string,
  address_town?: string,
  address_county?: string,
  address_postcode?: string,
}

/**
 * Static typing of request passed to database when adding a new contact.
 */
export interface AddContactRequest {
  name: string,
  email?: string,
  telephone?: string,
  address_line1?: string,
  address_line2?: string,
  address_town?: string,
  address_county?: string,
  address_postcode?: string,
}

/**
 * Interface for database request, extends the add request model
 * Includes the id fields which are present on an existing user.
 */
export interface EditContactRequest extends AddContactRequest {
  _id: string;
  uid: number;
}
