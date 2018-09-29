import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import * as React from 'react';

class HeaderBar extends React.Component {
  public render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            <BookmarksIcon />&nbsp;Address Book
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderBar;
