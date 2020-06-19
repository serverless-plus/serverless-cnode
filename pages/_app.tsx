import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AppProps } from 'next/app';
import withReduxStore from '@store/with-redux-store';

import '@assets/scss/app.scss';

type APageProps = {
  reduxStore: Store;
  props: any;
};

type MyAppProps = AppProps & APageProps;

// @ts-ignore
class MyApp extends App<MyAppProps, AppComponentContext> {
  render() {
    // @ts-ignore
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
