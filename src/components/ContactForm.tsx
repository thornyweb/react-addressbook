import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as _ from 'lodash';
import * as React from 'react';

interface ContactFormState {
  postcodeValue: string | undefined;
}

class ContactForm extends React.Component<any, ContactFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      postcodeValue: undefined
    }
  }

  public render() {
    return (
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
              />
              <Button
                variant="contained"
                color="primary"
                style={{ verticalAlign: 'bottom', marginLeft: '1em' }}
                onClick={this.addressLookup()}
              >Lookup address</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  private setPostcodeState(event: any): any {
    this.setState({ postcodeValue: event.target.value })
  }

  private addressLookup(): any {
    alert(this.state.postcodeValue);
  }
}

export default ContactForm;
