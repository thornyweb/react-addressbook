import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import ContactForm from './ContactForm';

class AddPage extends React.Component {
  public render() {
    return (
        <Paper>
          <Typography
            variant="title"
            align="center"
            gutterBottom={true}
            style={{paddingTop: '1em'}}
          >Add Contact</Typography>
          <ContactForm />
        </Paper>
    );
  }
}

export default AddPage;
