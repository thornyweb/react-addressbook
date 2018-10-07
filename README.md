# React Addressbook

Bootstrapped with Create React App.

Written with Typescript to help ensure code quality by benefitting from static typing.

Utilising the Google Material UI component library for styling which is mobile first by design.

SASS to CSS compilation for the development and build processes.

Database hosted by restdb.io with postcode validation & information coming from postcodes.io

## Potential Improvements.

Extract `SnackBar` component to top of application and pass callbacks through so that any page can leverage the same component

Refactor `/src/components/ContactForm.tsx` with special focus being paid to the onChange methods of each field, typescript disallows lambda's and there is a lot of repitition