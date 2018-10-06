import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

interface SharedSnackbarProps {
  open: boolean;
  message: string;
  closeCallback?: () => void;
}

class SharedSnackbar extends React.Component<SharedSnackbarProps> {

  public render() {
    const { open, message, closeCallback } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        open={open}
        onClose={closeCallback}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={
          <IconButton key="close" aria-label="Close" color="inherit" onClick={closeCallback}>
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}

export default SharedSnackbar;
