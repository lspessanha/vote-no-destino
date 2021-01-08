import React, { Component } from 'react';

export default class RadioOptions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onChange={this.props.selectedDestination.bind(this)}>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="destiny" id={`first-option-${this.props.step}`} value={this.props.firstOption.id} />
          <label className="form-check-label" htmlFor={`first-option-${this.props.step}`}>{this.props.firstOption.destination_name}</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="destiny" id={`second-option-${this.props.step}`} value={this.props.secondOption.id} />
          <label className="form-check-label" htmlFor={`second-option-${this.props.step}`}>{this.props.secondOption.destination_name}</label>
        </div>
      </div>
    );
  }
}
