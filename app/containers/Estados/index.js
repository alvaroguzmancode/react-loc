/**
 *
 * Estados
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import feathers from '@feathersjs/client';
import io from 'socket.io-client';

/* eslint-disable react/prefer-stateless-function */
export class Estados extends React.Component {

  componentDidMount(){
    const socket = io('http://localhost:3030/', { transports: ['websocket'] });
    const client = feathers().configure(feathers.socketio(socket));
    client.service("estado").create({
      name: "CDMX",
    }).then(response => {
      console.log("este es el response");
      console.log(response);
    })
      .catch(err => {
        console.log("este es el error");
        console.log(err);
      }); 
    const estadoService = client.service('estado');

    estadoService.find()
      .then(res => {
        console.log("este es el resultado");
        console.log(res);
      }).catch(err => {
        console.log("asdads");
        console.log(err);
      });
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


  render() {
    return (
      <div>
        <Helmet>
          <title>Estados</title>
          <meta name="description" content="Description of Estados" />
        </Helmet>
        <Button basic color="green" onClick={this.onClickBtn} />
        <h1>Hola mundo</h1>
      </div>
    );
  }
}

Estados.propTypes = {
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

export default compose(withConnect)(Estados);
