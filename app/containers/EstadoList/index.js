/**
 *
 * EstadoList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Divider, Form, Segment, Button, Pagination } from 'semantic-ui-react';
import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import SideBar from '../../components/SideBar/Loadable';
/* eslint-disable react/prefer-stateless-function */
export class EstadoList extends React.Component {
  state = {
    name: "",
    page: 1,
    totalPages: 0,
  }

  componentDidMount(){
    this.getData();
  }

  renderPagination = () => {
    const { page, totalPages } = this.state;
    return <Pagination defaultActivePage={page} totalPages={totalPages} />;
  }

  getData = () => {
    const socket = io('http://localhost:3030/', { transports: ['websocket'] });
    const client = feathers().configure(feathers.socketio(socket));
    client.service("estado").find()
      .then(response => {
        console.log("este es el response");
        console.log(response);
      })
      .catch(err => {
        console.log("este es el error");
        console.log(err);
      });
    return
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

  renderb() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <h1>Estados</h1>
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

EstadoList.propTypes = {
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

export default compose(withConnect)(EstadoList);
