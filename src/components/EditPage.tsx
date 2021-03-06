import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import autobind from 'autobind-decorator';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { EditContact, GetContact } from '../api';
import { Contact } from '../types';
import ContactForm from './ContactForm';

/**
 * Model props and state
 * Edit page must have an id parameter
 */

interface EditPageParams {
  id: string
}

interface EditPageState {
  currentContact?: Contact;
  processing: boolean;
  showSnackbar: boolean;
  snackbarContent: string;
}

class EditPage extends React.Component<RouteComponentProps<EditPageParams>, EditPageState> {
  constructor(props: RouteComponentProps<EditPageParams>) {
    super(props);
    this.state = {
      processing: true,
      showSnackbar: false,
      snackbarContent: ''
    }
  }

  /**
   * Load contact from given id on initial mount
   */
  public componentDidMount() {
    GetContact(this.props.match.params.id)
      .then(response => {
        this.setState({ currentContact: response, processing: false });
      })
      .catch(err => {
        this.setState({ showSnackbar: true, snackbarContent: 'Error loading contact details', processing: false });
      });
  }

  public render() {
    /**
     * Default render if contact is loading, or failed to load.
     */
    if (!this.state.currentContact || this.state.processing) {
      return <div style={{ textAlign: 'center', padding: '1em 0' }}><CircularProgress size={100} /><Typography><br />Loading...</Typography></div>;
    }

    return (
      <Paper>
        <Typography
          variant="title"
          align="center"
          gutterBottom={true}
          style={{ paddingTop: '1em' }}
        >Edit Contact</Typography>
        <ContactForm
          submitCallback={this.editContact}
          processing={this.state.processing}
          processingCallback={this.toggleProcessing}
          contactDetails={this.state.currentContact}
        />
      </Paper>
    );
  }

  /**
   * Callback passed to ContactForm which validates the type of data being passed back
   * Call to database API to edit the existing contact with the updated values.
   */
  @autobind
  private editContact(formData: Contact) {
    this.setState({ processing: true });
    const userId = this.props.match.params.id;
    const userData: Contact = formData;
    userData._id = userId;
    if (this.state.currentContact && this.state.currentContact.uid) {
      userData.uid = this.state.currentContact.uid;
    }
    EditContact(userId, userData)
      .then(response => {
        this.setState({ processing: false });
        this.props.history.push(`/`);
      })
      .catch(err => {
        this.setState({ processing: false });
      });
  }

  @autobind
  private toggleProcessing() {
    this.setState(prevState => ({ processing: !prevState.processing }));
  }
}

export default EditPage;
