import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ContactsTable from './ContactsTable';

class DetailsPage extends React.Component<RouteComponentProps<void>> {
  public render() {
    return (
      <Paper style={{width: '100%', overflowX: 'auto'}}>
        <Typography
          variant="title"
          align="center"
          gutterBottom={true}
          style={{ paddingTop: '1em' }}
        >Contact Details</Typography>
        <ContactsTable {...this.props} />
      </Paper>
    );
  }
}

export default DetailsPage;
