/**
 *
 * EstadoCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

/* eslint-disable react/prefer-stateless-function */
export class EstadoCreate extends React.Component {
  render() {
    return <div />;
  }
}

EstadoCreate.propTypes = {
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

export default compose(withConnect)(EstadoCreate);
