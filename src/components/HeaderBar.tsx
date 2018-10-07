import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './HeaderBar.css';

/**
 * HeaderBar component using Material UI to give familar
 * 'Google-esque' appearance to app.
 */

class HeaderBar extends React.Component {
  public render() {
    return (
      <AppBar position="static" className="ApplicationHeaderBar">
        <Toolbar>
          <Typography variant="title" className="Title">
            <BookmarksIcon />&nbsp;Address Book
          </Typography>
          <div className="Links">
            <Tooltip title="Browse">
              <Link to="/">
                <IconButton><HomeIcon /></IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Add">
            <Link to="/add">
              <IconButton><PersonAddIcon /></IconButton>
            </Link>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderBar;
