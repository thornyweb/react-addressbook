import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddPage from './components/AddPage';
import DetailsPage from './components/DetailsPage';
import HeaderBar from './components/HeaderBar';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        { this.resetCSS() }
        <div className="AppContainer">
          <HeaderBar />
          <Switch>
            <Route exact={true} path="/add" component={AddPage} />
            <Route path="/" component={DetailsPage} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }

  public resetCSS() {
    // CssBaseline - Material UI equivalent of normalize.css
    return <CssBaseline />;
  }
}

export default App;
