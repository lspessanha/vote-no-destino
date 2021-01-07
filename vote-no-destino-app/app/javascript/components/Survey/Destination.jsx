import React from 'react';

export default class Destination extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      destinations: []
    };
  }

  componentDidMount() {
    this.setState({ destinations: this.props.destinations })
  }

  render() {
    return (
      <>
        <h1>Vote no seu destino!</h1>
        {this.state.destinations.map((val) =>
          <p>{val.destination_name}</p>
        )}
      </>
    );
  }
}
