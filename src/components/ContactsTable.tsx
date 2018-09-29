import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ErrorIcon from '@material-ui/icons/Error';
import Axios from 'axios';
import * as React from 'react';

interface ContactsTableState {
  Contacts?: Contacts[],
  FetchingAddresses: boolean
}

interface Contacts {
  id: number,
  name: string,
  email?: string,
  telephone?: string,
  address: ContactAddress,
}

interface ContactAddress {
  line1?: string,
  line2?: string,
  town?: string,
  county?: string,
  postcode?: string,
}

class ContactsTable extends React.Component<any, ContactsTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      FetchingAddresses: true
    };
  }

  public componentDidMount() {
    /*
     * Make axios call to local JSON server, - in production this would go to standard database / API endpoint. 
     * Update state boolean FetchingAddresses regardless of success of call, error is handled in component render
     * If successful, also update state with Contacts returned from the response.
     */
    Axios.get('http://localhost:8888/Addresses').then(
      response => this.setState({ Contacts: response.data, FetchingAddresses: false })
    ).catch(
      err => this.setState({ FetchingAddresses: false })
    );
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
          </TableRow>
        </TableHead>
        <TableBody>
          {
            this.state.Contacts.map( row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell><a href={`tel:${row.telephone}`}>{row.telephone}</a></TableCell>
                  <TableCell><a href={`mailto:${row.email}`}>{row.email}</a></TableCell>
                  <TableCell>{this.sanitizeAddress(row.address)}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  }

  private sanitizeAddress(address: ContactAddress) {
    let returnValue = '';
    Object.keys(address).forEach(field => {
      if (address[field]) {
        returnValue += `${returnValue !== '' ? ', ' : ''}${address[field]}`;
      }
    });
    return returnValue;
  }
}

export default ContactsTable;
