import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import autobind from 'autobind-decorator';
import * as _ from 'lodash';
import * as React from 'react';
import { LookupPostcode, ValidatePostcode } from '../api';

interface ContactFormState {
  lookedupAddress1?: string;
  lookedupAddress2?: string;
  lookedupAddressTown?: string;
  lookedupAddressCounty?: string;
  lookedupAddressPostcode?: string;
  postcodeValue?: string;
  postcodeValid?: boolean;
  postcodeProcessing: boolean;
  displaySnackBar: boolean;
  snackBarMessage?: string;
}

class ContactForm extends React.Component<any, ContactFormState> {

  constructor(props: any) {
    super(props);
    this.state = {
      displaySnackBar: false,
      postcodeProcessing: false
    };
  }

  public renderAddressFields() {
    return (
      <React.Fragment>
        <Grid item={true}>
          <TextField
            label="Address line 1"
            placeholder="1 London Road"
            fullWidth={true}
            name="address_line_1"
            value={this.state.lookedupAddress1}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            label="Address line 2"
            placeholder="Woodston"
            fullWidth={true}
            name="address_line_2"
            value={this.state.lookedupAddress2}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            label="Town"
            placeholder="Peterborough"
            fullWidth={true}
            name="address_town"
            value={this.state.lookedupAddressTown}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            label="County"
            fullWidth={true}
            name="address_county"
            value={this.state.lookedupAddressCounty}
          />
        </Grid>
      </React.Fragment>
    );
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
                  fullWidth={true}
                  name="name"
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Email"
                  placeholder="name@email.com"
                  type="email"
                  fullWidth={true}
                  name="email"
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Telephone"
                  placeholder="01234 567890"
                  type="tel"
                  fullWidth={true}
                  name="telephone"
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Postcode"
                  placeholder="PE1 1AA"
                  onChange={this.setPostcodeState}
                  error={this.state.postcodeValid === false}
                  name="address_postcode"
                  value={this.state.lookedupAddressPostcode}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ verticalAlign: 'bottom', marginLeft: '1em' }}
                  onClick={this.checkPostcodeValid}
                  disabled={this.state.postcodeProcessing}
                >Lookup address</Button>
              </Grid>
              {
                this.state.postcodeValid === true &&
                this.renderAddressFields()
              }
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
    this.setState({ postcodeValue: event.target.value, postcodeValid: undefined })
  }

  @autobind
  private checkPostcodeValid() {
    const postcode = this.state.postcodeValue;
    if (postcode) {
      this.setState({ postcodeProcessing: true });
      ValidatePostcode(postcode)
        .then(response => {
          this.setState({
            displaySnackBar: response.result === false,
            postcodeProcessing: false,
            postcodeValid: response.result === true,
            snackBarMessage: `${response.result === true ? undefined : 'Invalid postcode'}`
          });
          if (response.result === true) {
            this.fetchPostcodeData();
          }
        })
        .catch(err => this.setState({
          displaySnackBar: true,
          postcodeProcessing: false,
          postcodeValid: undefined,
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
  private fetchPostcodeData() {
    const postcode = this.state.postcodeValue;
    if (postcode) {
      this.setState({ postcodeProcessing: true });
      LookupPostcode(postcode)
        .then(response => {
          const postcodeResult = response.result;
          // tslint:disable-next-line:no-console
          console.log(postcodeResult);
          this.setState({
            lookedupAddress2: postcodeResult.admin_ward,
            lookedupAddressCounty: postcodeResult.admin_county,
            lookedupAddressPostcode: postcodeResult.postcode,          
            lookedupAddressTown: postcodeResult.admin_district,          
            postcodeProcessing: false            
          });
        })
    }
  }

  @autobind
  private closeSnackBar() {
    this.setState({ displaySnackBar: false });
  }

}

export default ContactForm;
