import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import autobind from 'autobind-decorator';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { DeleteContact, GetContacts } from '../api';
import { Contact } from '../types';
import SharedSnackbar from './SharedSnackbar';

interface ContactsTableState {
  contacts: Contact[] | null;
  deleteDialogOpen: boolean;
  fetchingAddresses: boolean;
  idToDelete: string;
  showSnackbar: boolean;
  snackbarContent: string;
}

class ContactsTable extends React.Component<RouteComponentProps<void>, ContactsTableState> {
  constructor(props: RouteComponentProps<void>) {
    super(props);
    this.state = {
      contacts: null,
      deleteDialogOpen: false,
      fetchingAddresses: false,
      idToDelete: '',
      showSnackbar: false,
      snackbarContent: ''
    };
  }

  public componentDidMount() {
    this.getContacts();
  }

  public render() {
    if (this.state.fetchingAddresses) {
      return <div style={{ textAlign: 'center', padding: '1em 0' }}><CircularProgress size={100} /><Typography><br />Loading...</Typography></div>;
    }

    if (!this.state.contacts) {
      return <div style={{ textAlign: 'center', padding: '1em 0' }}><ErrorIcon /><Typography><br />Error loading data</Typography></div>;
    }

    if (this.state.contacts.length === 0) {
      return <div style={{ textAlign: 'center', padding: '1em 0' }}><InfoIcon /><Typography><br />No contacts to display</Typography></div>;
    }

    return (
      <React.Fragment>
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
              this.state.contacts !== null &&
              this.state.contacts.map(contact => {
                return (
                  <TableRow key={contact.uid}>
                    <TableCell component="th" scope="row">
                      {contact.name}
                    </TableCell>
                    <TableCell><a href={`tel:${contact.telephone}`}>{contact.telephone}</a></TableCell>
                    <TableCell><a href={`mailto:${contact.email}`}>{contact.email}</a></TableCell>
                    <TableCell>{this.sanitizeAddress(contact)}</TableCell>
                    <TableCell>
                      <a style={{ cursor: 'pointer' }} data-id={contact._id} onClick={this.editContact}>Edit</a>&nbsp;
                      | <a style={{ cursor: 'pointer', color: 'red' }} data-id={contact._id} onClick={this.openDeleteDialog}>Delete</a>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
        <Dialog
          open={this.state.deleteDialogOpen}
          onClose={this.closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete contact</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this contact? This can't be undone!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDeleteDialog} color="default">
              Stop!
            </Button>
            <Button onClick={this.confirmDeleteDialog} color="secondary" autoFocus={true}>
              Do it!
            </Button>
          </DialogActions>
        </Dialog>
        <SharedSnackbar open={this.state.showSnackbar} message={this.state.snackbarContent} closeCallback={this.closeSnackBar} />
      </React.Fragment>
    );
  }

  @autobind
  private getContacts() {
    /*
     * Make axios call to restdb.io database of contacts,
     * Update state boolean FetchingAddresses regardless of success of call, error is handled on component render
     * If successful, also update state with Contacts returned from the response.
     */
    this.setState({ fetchingAddresses: true });
    GetContacts()
      .then(response => this.setState({ contacts: response, fetchingAddresses: false }))
      .catch(err => this.setState({ fetchingAddresses: false }));
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

  @autobind
  private openDeleteDialog(event: React.SyntheticEvent<HTMLAnchorElement>) {
    if (event.currentTarget.dataset.id) {
      this.setState({ deleteDialogOpen: true, idToDelete: event.currentTarget.dataset.id });
    }
  }

  @autobind
  private closeDeleteDialog() {
    this.setState({ deleteDialogOpen: false, idToDelete: '' });
  }

  @autobind
  private confirmDeleteDialog() {
    DeleteContact(this.state.idToDelete)
      .then(response => {
        this.setState({ deleteDialogOpen: false, idToDelete: '', showSnackbar: true, snackbarContent: 'Contact deleted' });
        this.getContacts();
      })
      .catch(err => {
        this.setState({ deleteDialogOpen: false, idToDelete: '', showSnackbar: true, snackbarContent: 'Error deleting contact' });
      });
  }

  @autobind
  private closeSnackBar() {
    this.setState({ showSnackbar: false, snackbarContent: '' });
  }

  @autobind
  private editContact(event: React.SyntheticEvent<HTMLAnchorElement>) {
    if (event.currentTarget.dataset.id) {
      this.props.history.push(`/edit/${event.currentTarget.dataset.id}`);
    }
  }
}

export default ContactsTable;
