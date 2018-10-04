import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import autobind from 'autobind-decorator';
import * as _ from 'lodash';
import * as React from 'react';
import { ValidatePostcode } from '../api';

interface ContactFormState {
  postcodeValue?: string;
  postcodeValid: boolean;
  postcodeProcessing: boolean;
  displaySnackBar: boolean;
  snackBarMessage?: string;
}

class ContactForm extends React.Component<any, ContactFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      displaySnackBar: false,
      postcodeProcessing: false,
      postcodeValid: true
    };
  }
  public render() {
    return (
      <React.Fragment>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12}>
            <Grid container={true} alignContent="center" justify="center" direction="column" spacing={24}>
              <Grid item={true}>
                <TextField
                  label="Name"
                  placeholder="Joe Bloggs"
                  required={true}
                  autoFocus={true}
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Email"
                  placeholder="name@email.com"
                  type="email"
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Telephone"
                  placeholder="01234 567890"
                  type="tel"
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Postcode"
                  placeholder="PE1 1AA"
                  onChange={this.setPostcodeState}
                  error={!this.state.postcodeValid}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ verticalAlign: 'bottom', marginLeft: '1em' }}
                  onClick={this.addressLookup}
                  disabled={this.state.postcodeProcessing}
                >Lookup address</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}
          open={this.state.displaySnackBar}
          onClose={this.closeSnackBar}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackBarMessage}</span>}
          action={
            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.closeSnackBar}>
              <CloseIcon />
            </IconButton>
          }
        />
      </React.Fragment>
    );
  }

  @autobind
  private setPostcodeState(event: any) {
    this.setState({ postcodeValue: event.target.value })
  }

  @autobind
  private addressLookup() {
    if (this.state.postcodeValue) {
      this.setState({ postcodeProcessing: true });
      ValidatePostcode(this.state.postcodeValue)
        .then(response => this.setState({
          displaySnackBar: !response.result,
          postcodeProcessing: false,
          postcodeValid: response.result,
          snackBarMessage: 'Invalid postcode'
        }))
        .catch(err => this.setState({
          displaySnackBar: true,
          postcodeProcessing: false,
          postcodeValid: false,
          snackBarMessage: 'Error validating postcode'
        }));
    } else {
      this.setState({
        displaySnackBar: true,
        postcodeValid: false,
        snackBarMessage: 'Please enter a postcode'
      });
    }
  }

  @autobind
  private closeSnackBar() {
    this.setState({ displaySnackBar: false });
  }

}

export default ContactForm;
