// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { persistStore } from 'redux-persist';
import { compose, withState, lifecycle } from 'recompose';

type AppPropsType = {
  store: any,
  rehydrated: boolean,
};


const App = ({ store, rehydrated }: AppPropsType) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      {rehydrated ? <div name="application">
        <Helmet
          defaultTitle="React Redux Application"
          title="React Redux Application"
          links={[
            { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' },
          ]}
        />

        React Redux Application
      </div> : null}
    </MuiThemeProvider>
  </Provider>
);

const enhance = compose(
  withState('rehydrated', 'completeRehydrated', false),
  lifecycle({
    componentWillMount() {
      // eslint-disable-next-line immutable/no-this
      persistStore(
        this.props.store,
        { whitelist: [] },
        () => {
          this.props.completeRehydrated(true);
        },
      );
    },
  }),
);

export default enhance(App);
