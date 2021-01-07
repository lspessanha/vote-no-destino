import React, { Component } from 'react';
import { MultiStepForm, Step } from 'react-multi-form';

export default class Destination extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      destinations: [],
      destinationsVoted: [],
      currentStep: 1,
      loaded: false
    };
  }

  componentDidMount = () => {
    this.setState({ destinations: this.props.destinations, loaded: true })
  }

  voteDestiny = (event) => {
    console.log(event.target.value);
  }

  setStep = (step) => this.setState({currentStep: step});

  sendSurvey = () => console.log("Enviar votação");

  render() {
    let multiStepForm = (
      <div className="text-center">
        <span className="spinner-border" role="status" />
      </div>
    );

    if (this.state.loaded) {
      multiStepForm = (
        <div className="text-center">
          <p className="lead">Qual dos destinos você prefere?</p>
          <MultiStepForm activeStep={this.state.currentStep}>
            <Step>
              <div onChange={this.voteDestiny.bind(this)}>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="destiny" id={`destiny${this.state.destinations[0].id}`} value={this.state.destinations[0].id} />
                  <label className="form-check-label" htmlFor={`destiny${this.state.destinations[0].id}`}>{this.state.destinations[0].destination_name}</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="destiny" id={`destiny${this.state.destinations[1].id}`} value={this.state.destinations[1].id} />
                  <label className="form-check-label" htmlFor={`destiny${this.state.destinations[1].id}`}>{this.state.destinations[1].destination_name}</label>
                </div>
              </div>
            </Step>
            <Step>
              <div onChange={this.voteDestiny.bind(this)}>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="destiny" id={`destiny${this.state.destinations[2].id}`} value={this.state.destinations[2].id} />
                  <label className="form-check-label" htmlFor={`destiny${this.state.destinations[2].id}`}>{this.state.destinations[2].destination_name}</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="destiny" id={`destiny${this.state.destinations[3].id}`} value={this.state.destinations[3].id} />
                  <label className="form-check-label" htmlFor={`destiny${this.state.destinations[3].id}`}>{this.state.destinations[3].destination_name}</label>
                </div>
              </div>
            </Step>
            <Step>
              <div onChange={this.voteDestiny.bind(this)}>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="destiny" id={`destiny${this.state.destinations[4].id}`} value={this.state.destinations[4].id} />
                  <label className="form-check-label" htmlFor={`destiny${this.state.destinations[4].id}`}>{this.state.destinations[4].destination_name}</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="destiny" id={`destiny${this.state.destinations[0].id}`} value={this.state.destinations[0].id} />
                  <label className="form-check-label" htmlFor={`destiny${this.state.destinations[0].id}`}>{this.state.destinations[0].destination_name}</label>
                </div>
              </div>
            </Step>
            <Step>
              <div className="w-50 mx-auto">
                <div className="form-group">
                  <label htmlFor="inputEmail">Informe o seu e-mail</label>
                  <input type="email" className="form-control" id="inputEmail" placeholder="E-mail"/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputName">Informe o seu nome</label>
                  <input type="text" className="form-control" id="inputName" placeholder="Nome"/>
                </div>
              </div>
            </Step>
          </MultiStepForm>
          {this.state.currentStep < 4 && (
            <button className="btn btn-primary" onClick={() => this.setStep(this.state.currentStep + 1)}>Votar</button>
          )}
          {this.state.currentStep === 4 && (
            <button className="btn btn-primary" onClick={() => this.sendSurvey()}>Enviar votação</button>
          )}
        </div>
      );
    }

    return (
      <div className="container">
        <div className="py-2 text-center">
          <h3>Vote no destino</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            {multiStepForm}
          </div>
        </div>
      </div>
    );
  }
}
