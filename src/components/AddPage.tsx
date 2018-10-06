import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import autobind from 'autobind-decorator';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AddContact } from '../api';
import { AddContactRequest } from '../types';
import ContactForm from './ContactForm';

interface AddPageState {
  processing: boolean;
  showSnackbar: boolean;
  snackbarContent: string;
}

class AddPage extends React.Component<RouteComponentProps<void>, AddPageState> {
  constructor(props: RouteComponentProps<void>) {
    super(props);
    this.state = {
      processing: false,
      showSnackbar: false,
      snackbarContent: ''
    }
  }

  public render() {
    return (
      <Paper>
        <Typography
          variant="title"
          align="center"
          gutterBottom={true}
          style={{ paddingTop: '1em' }}
        >Add Contact</Typography>
        <ContactForm
          submitCallback={this.addContact}
          processing={this.state.processing}
          processingCallback={this.toggleProcessing}
        />
      </Paper>
    );
  }

  @autobind
  private addContact(formData: AddContactRequest) {
    this.setState({ processing: true });
    AddContact(formData)
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

export default AddPage;
