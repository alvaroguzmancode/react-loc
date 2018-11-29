/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
/* import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix'; */
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import CenteredSection from './CenteredSection';
/* import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages'; */
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { feathersServices } from "../App/redux/FeathersRedux";

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    /* if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    } */
  }

  onClickBtn = () => {
    feathersServices.services("estado").create({
      name: "CDMX",
    }).then(response => {
      console.log("este es el response");
      console.log(response);
    })
      .catch(err => {
        console.log("este es el error");
        console.log(err);
      }); 
  }

  render1() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <CenteredSection>
          
          </CenteredSection>
        </div>
      </article>
    );
  }

  handleHideClick = () => this.setState({ visible: false })

  handleShowClick = () => this.setState({ visible: true })

  handleSidebarHide = () => this.setState({ visible: false })

  render(){
    const { visible } = this.state;
    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }

}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ 
  key: 'home', 
  reducer,
  auth: feathersAuthentication.reducer,
  services: feathersServices, 
});
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
