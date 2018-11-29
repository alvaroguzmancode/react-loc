/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';
import Home from 'containers/Home/Loadable';
import EstadoList from 'containers/EstadoList/Loadable';

import GlobalStyle from '../../global-styles';
import 'semantic-ui-css/semantic.min.css';
const AppWrapper = styled.div`
    position:fixed;
    padding:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    height: 100% !important;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/estados" component={EstadoList} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
