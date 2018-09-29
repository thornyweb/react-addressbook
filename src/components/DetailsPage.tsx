import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import ContactsTable from './ContactsTable';

class DetailsPage extends React.Component {
  public render() {
    return (
        <Paper>
          <Typography
            variant="title"
            align="center"
            gutterBottom={true}
          >Contact Details</Typography>
          <ContactsTable />
        </Paper>
    );
  }
}

export default DetailsPage;
