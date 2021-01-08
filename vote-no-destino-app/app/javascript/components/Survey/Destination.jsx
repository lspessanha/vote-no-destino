import React, { Component } from 'react';
import { MultiStepForm, Step } from 'react-multi-form';
import RadioOptions from '../base/RadioOptions';

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

  selectedDestination = (event) => {
    const destinyValue = event.target.value;

    if (this.state.destinationsVoted.length === 0) return this.setState({ destinationsVoted: [destinyValue] });
    if (this.state.destinationsVoted.length < this.state.currentStep) return this.setState(prevState => ({ destinationsVoted: [...prevState.destinationsVoted, destinyValue] }));

    let destinationsVoted = this.state.destinationsVoted;
    destinationsVoted[destinationsVoted.length - 1] = destinyValue;

    this.setState({ destinationsVoted: destinationsVoted });
  }

  setStep = (step) => {
    if (this.state.destinationsVoted.length < this.state.currentStep) return alert('Selecione um destino.');
    
    this.setState({currentStep: step});
  }

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
          <MultiStepForm activeStep={this.state.currentStep} accentColor={'#007bff'}>
            <Step>
              <RadioOptions
                firstOption={this.state.destinations[0]}
                secondOption={this.state.destinations[1]}
                destinations={this.state.destinations}
                destinationsVoted={this.state.destinationsVoted}
                step={1}
                selectedDestination={this.selectedDestination}
              />
            </Step>
            <Step>
              <RadioOptions
                firstOption={this.state.destinations[2]}
                secondOption={this.state.destinations[3]}
                destinations={this.state.destinations}
                destinationsVoted={this.state.destinationsVoted}
                step={2}
                selectedDestination={this.selectedDestination.bind(this)}
              />
            </Step>
            <Step>
              <RadioOptions
                firstOption={this.state.destinations[4]}
                secondOption={parseInt(this.state.destinationsVoted[0]) === 2 ? this.state.destinations[0] : this.state.destinations[1]}
                destinations={this.state.destinations}
                destinationsVoted={this.state.destinationsVoted}
                step={3}
                selectedDestination={this.selectedDestination.bind(this)}
              />
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
