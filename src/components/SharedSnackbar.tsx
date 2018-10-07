import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

/**
 * Component props map
 * Model which props to take, their type and if they are optional
 */
interface SharedSnackbarProps {
  open: boolean;
  message: string;
  closeCallback?: () => void;
}

/**
 * Return a Material UI Snackbar component with a standard configuration
 * Extracted to it's own component to avoid large code repitition.
 */
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
