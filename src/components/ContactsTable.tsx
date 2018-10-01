import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ErrorIcon from '@material-ui/icons/Error';
import * as React from 'react';
import { GetContacts } from '../api';
import { Contact } from '../types/contacts';

interface ContactsTableState {
  Contacts: Contact[] | null,
  FetchingAddresses: boolean
}

class ContactsTable extends React.Component<any, ContactsTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      Contacts: null,
      FetchingAddresses: true
    };
  }

  public componentDidMount() {
    /*
     * Make axios call to restdb.io database of contacts,
     * Update state boolean FetchingAddresses regardless of success of call, error is handled on component render
     * If successful, also update state with Contacts returned from the response.
     */
    GetContacts()
      .then(response => this.setState({ Contacts: response, FetchingAddresses: false }))
      .catch(err => this.setState({ FetchingAddresses: false }));
  }

  public render() {
    if (this.state.FetchingAddresses) {
      return <div style={{ textAlign: 'center', padding: '1em 0' }}><CircularProgress size={100} /><Typography><br />Loading...</Typography></div>;
    }

    if (!this.state.Contacts) {
      return <div style={{ textAlign: 'center', padding: '1em 0' }}><ErrorIcon /><Typography><br />Error loading data</Typography></div>;
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Telephone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            this.state.Contacts !== null &&
            this.state.Contacts.map(row => {
              return (
                <TableRow key={row.uid}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell><a href={`tel:${row.telephone}`}>{row.telephone}</a></TableCell>
                  <TableCell><a href={`mailto:${row.email}`}>{row.email}</a></TableCell>
                  <TableCell>{this.sanitizeAddress(row)}</TableCell>
                  <TableCell>
                    Edit | Delete
                  </TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  }

  private sanitizeAddress(contact: Contact) {
    let returnValue = '';
    const addressFields = ['address_line1', 'address_line2', 'address_town', 'address_county', 'address_postcode'];
    addressFields.forEach(field => {
      if (contact[field]) {
        returnValue += `${returnValue !== '' ? ', ' : ''}${contact[field]}`;
      }
    });
    return returnValue;
  }
}

export default ContactsTable;
