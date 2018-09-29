import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import * as fs from 'fs';
import * as React from 'react';

interface ContactAddress {
  line1?: string,
  line2?: string,
  town?: string,
  county?: string,
  postcode?: string,
}

class ContactsTable extends React.Component {
  public render() {
    
    // const json = this.fetchJSONData();
    // tslint:disable-next-line:no-console
    // console.log(json);
    const rows = [
      {
        "address": {
          "line1": "1 Julius Court",
          "line2": "Stanground South",
          "town": "Peterborough",
          // tslint:disable-next-line:object-literal-sort-keys
          "county": "Cambridgeshire",
          "postcode": "PE2 8SY"
        },
        "email": "michael@thornyweb.co.uk",
        "id": 1,
        "name": "Michael Thorn",
        "telephone": "01234567890"
      },
      {
        "address": {
          "line1": "8 High Street",
          "line2": "",
          "town": "Cottenham",
          // tslint:disable-next-line:object-literal-sort-keys
          "county": "Cambridgeshire",
          "postcode": ""
        },
        "email": "hans@hotmail.com",
        "id": 2,
        "name": "Hans Keller",
        "telephone": "07123456789"
      }
    ];

    return (
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Tel</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => {
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
        })}
      </TableBody>
    </Table>
    );
  }

  // private fetchJSONData() {
  //   fs.readFile('temp.txt', (err, buf) => {
  //     try {
  //       // tslint:disable-next-line:no-console
  //       console.log(buf.toString());
  //     } catch (err) {
  //       // tslint:disable-next-line:no-console
  //       console.log(err);
  //     }
  //   });
  // }

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
