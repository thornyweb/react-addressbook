import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import autobind from 'autobind-decorator';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AddContact } from '../api';
import { AddContactRequest } from '../types';
import ContactForm from './ContactForm';

class AddPage extends React.Component<RouteComponentProps<void>> {
  public render() {
    return (
        <Paper>
          <Typography
            variant="title"
            align="center"
            gutterBottom={true}
            style={{paddingTop: '1em'}}
          >Add Contact</Typography>
          <ContactForm submitCallback={this.addContact} />
        </Paper>
    );
  }

  @autobind
  private addContact(formData: AddContactRequest) {
    // tslint:disable-next-line:no-console
    AddContact(formData)
    .then(response => {
      this.props.history.push(`/`);
    })
    // tslint:disable-next-line:no-console
    .catch(err => console.error(`Error adding contact: ${err.message}`));
  }
}

export default AddPage;
