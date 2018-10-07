import CssBaseline from '@material-ui/core/CssBaseline'; // Targeted imports where possible to minimise extraneous importing to keep package size minimal.
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddPage from './components/AddPage';
import DetailsPage from './components/DetailsPage';
import EditPage from './components/EditPage';
import HeaderBar from './components/HeaderBar';

class App extends React.Component {
  public render() {
    /**
     * Top level application component, kept out of component folder
     * Render HeaderBar at top level as it's common across all pages.
     * Use React Router to control navigation based on path,
     * Catch all redirect to main address book view if path given doesn't match any specified components.
     */
    return (
      <React.Fragment>
        {this.resetCSS()}
        <div className="AppContainer">
          <HeaderBar />
          <Switch>
            <Route exact={true} path="/" component={DetailsPage} />
            <Route exact={true} path="/add" component={AddPage} />
            <Route exact={true} path="/edit/:id" component={EditPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }

  public resetCSS() {
    /**
     * CssBaseline - Material UI equivalent of normalize.css
     * Make browsers render elements more consistently.
     */
    return <CssBaseline />;
  }
}

export default App;
