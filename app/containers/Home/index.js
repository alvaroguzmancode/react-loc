/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Divider, Form, Segment, Button } from 'semantic-ui-react';
import SideBar from '../../components/SideBar/Loadable';
/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  state = {
    name: ""
  }

  renderb() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <h1>Dasboard</h1>
        <Divider />
        <Segment raised>
          <Form>
            <Form.Group widths="equal">
              <Form.Input 
                fluid
                label="Nombre"
                placeholder="Nombre"
                value={this.state.name}
              />
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }

  render(){
    return <SideBar childrenp={this.renderb()}/>
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Home);
