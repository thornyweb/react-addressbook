/**
 * Model response from postcodes.io when calling the validate postcode endpoint
 */
export interface ValidatePostcodeResponse {
  status: number;
  result: boolean;
}

/**
 * Response from postcodes.io when getting the details of a valid postcode
 * Could be improved by fully specifying the result object rather than giving an `any` typing.
 */
export interface LookupPostcodeResponse {
  status: number;
  result: any;
}