import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import autobind from 'autobind-decorator';
import * as _ from 'lodash';
import * as React from 'react';
import { LookupPostcode, ValidatePostcode } from '../api';
import { AddContactRequest, Contact } from '../types';
import SharedSnackbar from './SharedSnackbar';

interface ContactFormProps {
  contactDetails?: Contact;
  processing: boolean;
  processingCallback: () => void;
  submitCallback: (formData: AddContactRequest) => void;
}

interface ContactFormState {
  address1Value: string;
  address2Value: string;
  addressTownValue: string;
  addressCountyValue: string;
  emailFieldError: boolean;
  emailValue: string;
  nameFieldError: boolean;
  nameValue: string;
  postcodeValue: string;
  postcodeValid?: boolean;
  displaySnackBar: boolean;
  snackBarMessage: string;
  telephoneValue: string;
}

class ContactForm extends React.Component<ContactFormProps, ContactFormState> {

  constructor(props: ContactFormProps) {
    super(props);
    this.state = {
      address1Value: '',
      address2Value: '',
      addressCountyValue: '',
      addressTownValue: '',
      displaySnackBar: false,
      emailFieldError: false,
      emailValue: '',
      nameFieldError: false,
      nameValue: '',
      postcodeValue: '',
      snackBarMessage: '',
      telephoneValue: ''
    };
  }

  public componentDidMount() {
    if (this.props.contactDetails) {
      this.setState({
        address1Value: this.props.contactDetails.address_line1 ? this.props.contactDetails.address_line1 : '',
        address2Value: this.props.contactDetails.address_line2 ? this.props.contactDetails.address_line2 : '',
        addressCountyValue: this.props.contactDetails.address_county ? this.props.contactDetails.address_county : '',
        addressTownValue: this.props.contactDetails.address_town ? this.props.contactDetails.address_town : '',
        emailValue: this.props.contactDetails.email ? this.props.contactDetails.email : '',
        nameValue: this.props.contactDetails.name ? this.props.contactDetails.name : '',
        postcodeValid: true,
        postcodeValue: this.props.contactDetails.address_postcode ? this.props.contactDetails.address_postcode : '',
        telephoneValue: this.props.contactDetails.telephone ? this.props.contactDetails.telephone : ''
      });
    }
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
            value={this.state.address1Value}
            onChange={this.changeAddress1}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            label="Address line 2"
            placeholder="Woodston"
            fullWidth={true}
            name="address_line_2"
            InputLabelProps={{ shrink: true }}
            value={this.state.address2Value}
            onChange={this.changeAddress2}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            label="Town"
            placeholder="Peterborough"
            fullWidth={true}
            name="address_town"
            InputLabelProps={{ shrink: true }}
            value={this.state.addressTownValue}
            onChange={this.changeAddressTown}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            label="County"
            fullWidth={true}
            name="address_county"
            InputLabelProps={{ shrink: true }}
            value={this.state.addressCountyValue}
            onChange={this.changeAddressCounty}
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
                  onChange={this.changeName}
                  name="name"
                  value={this.state.nameValue}
                  error={this.state.nameFieldError}
                  helperText={this.state.nameFieldError ? 'Please enter your name' : ''}
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Email"
                  placeholder="name@email.com"
                  type="email"
                  fullWidth={true}
                  name="email"
                  onChange={this.changeEmail}
                  value={this.state.emailValue}
                  error={this.state.emailFieldError}
                  helperText={this.state.emailFieldError ? 'Please enter a valid email address' : ''}
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  label="Telephone"
                  placeholder="01234 567890"
                  type="tel"
                  fullWidth={true}
                  name="telephone"
                  onChange={this.changeTel}
                  value={this.state.telephoneValue}
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  id="address_postcode"
                  label="Postcode"
                  placeholder="PE1 1AA"
                  value={this.state.postcodeValue}
                  onChange={this.changePostcode}
                  error={this.state.postcodeValid === false}
                  name="address_postcode"
                  required={true}
                  helperText={this.state.postcodeValid === false ? 'You must enter a valid postcode' : ''}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ verticalAlign: 'bottom', marginLeft: '1em' }}
                  onClick={this.checkPostcodeValid}
                  disabled={this.props.processing}
                >Lookup address</Button>
              </Grid>
              {
                this.state.postcodeValid === true &&
                this.renderAddressFields()
              }
              <Grid item={true}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.props.processing}
                  onClick={this.validateFormData}
                >Save Contact</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SharedSnackbar open={this.state.displaySnackBar} message={this.state.snackBarMessage} closeCallback={this.closeSnackBar} />
      </React.Fragment>
    );
  }

  @autobind
  private changeName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ nameValue: event.target.value, 'nameFieldError': event.target.value.length === 0 })
  }

  @autobind
  private changeTel(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ telephoneValue: event.target.value })
  }

  @autobind
  private changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    // Email Regex taken from input type="email" from W3C
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let emailFieldInvalid = false;
    if (!emailRegex.test(event.target.value)) {
      emailFieldInvalid = true;
    }
    this.setState({ emailFieldError: emailFieldInvalid, emailValue: event.target.value })
  }

  @autobind
  private changePostcode(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ postcodeValue: event.target.value, postcodeValid: undefined })
  }

  @autobind
  private changeAddress1(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ address1Value: event.target.value })
  }

  @autobind
  private changeAddress2(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ address2Value: event.target.value })
  }

  @autobind
  private changeAddressTown(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ addressTownValue: event.target.value })
  }

  @autobind
  private changeAddressCounty(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ addressCountyValue: event.target.value })
  }

  @autobind
  private checkPostcodeValid() {
    const postcode = this.state.postcodeValue;
    this.props.processingCallback();
    if (postcode) {
      ValidatePostcode(postcode)
        .then(response => {
          this.setState({
            displaySnackBar: response.result === false,
            postcodeValid: response.result === true,
            snackBarMessage: `${response.result === true ? undefined : 'Invalid postcode'}`
          });
          if (response.result === true) {
            this.fetchPostcodeData();
          }
        })
        .catch(err => {
          this.setState({
            displaySnackBar: true,
            postcodeValid: undefined,
            snackBarMessage: 'Error validating postcode'
          });
          this.props.processingCallback();
        });
    } else {
      this.setState({
        displaySnackBar: true,
        postcodeValid: false,
        snackBarMessage: 'Please enter a postcode'
      });
      this.props.processingCallback();
    }
  }

  @autobind
  private fetchPostcodeData() {
    const postcode = this.state.postcodeValue;
    if (postcode) {
      LookupPostcode(postcode)
        .then(response => {
          const postcodeResult = response.result;
          this.setState({
            address2Value: postcodeResult.admin_ward ? postcodeResult.admin_ward : '',
            addressCountyValue: postcodeResult.admin_county ? postcodeResult.admin_county : '',
            addressTownValue: postcodeResult.admin_district ? postcodeResult.admin_district : '',
            postcodeValue: postcodeResult.postcode
          });
          this.props.processingCallback();
        })
        .catch(err => this.props.processingCallback());
    }
  }

  @autobind
  private closeSnackBar() {
    this.setState({ displaySnackBar: false });
  }

  @autobind
  private validateFormData() {
    const invalidName = !this.state.nameValue;
    const invalidPostcode = this.state.postcodeValid !== true;
    if (invalidName || invalidPostcode) {
      this.setState({ nameFieldError: invalidName, postcodeValid: !invalidPostcode });
    } else {
      this.props.submitCallback({
        address_county: this.state.addressCountyValue,
        address_line1: this.state.address1Value,
        address_line2: this.state.address2Value,
        address_postcode: this.state.postcodeValue,
        address_town: this.state.addressTownValue,
        email: this.state.emailValue,
        name: this.state.nameValue,
        telephone: this.state.telephoneValue
      });
    }
  }

}

export default ContactForm;
