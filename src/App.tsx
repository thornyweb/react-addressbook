import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import HeaderBar from './components/HeaderBar';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        { this.resetCSS() }
        <div className="AppContainer">
          <HeaderBar />
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
