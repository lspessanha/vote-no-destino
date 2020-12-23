import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Destination = props => (
  <>
    <h1>Vote no seu destino!</h1>
    {props.destinations.map((val) => 
      <p>{val.destination_name}</p>
    )}
  </>
)

Destination.defaultProps = {
  destinations: []
}

Destination.propTypes = {
  name: PropTypes.array
}

export default Destination