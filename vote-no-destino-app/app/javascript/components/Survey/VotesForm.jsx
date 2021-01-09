import React, { Component } from 'react';
import { MultiStepForm, Step } from 'react-multi-form';
import RadioOptions from '../base/RadioOptions';
import VotedDestinationsActions from '../actions/VotedDestinationsActions';
import ResultSurvey from './ResultSurvey';

export default class VotesForm extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      destinations: [],
      destinationsVoted: [],
      currentStep: 1,
      user: {
        id: 0,
        email: '',
        name: ''
      },
      currentTab: 'voteForm',
      loaded: false
    };
  }

  componentDidMount = () => {
    this.setState({ destinations: this.props.destinations, loaded: true })
  }

  selectedDestination = event => {
    const destinyValue = event.target.value;

    if (this.state.destinationsVoted.length === 0) return this.setState({ destinationsVoted: [destinyValue] });
    if (this.state.destinationsVoted.length < this.state.currentStep) return this.setState(prevState => ({ destinationsVoted: [...prevState.destinationsVoted, destinyValue] }));

    let destinationsVoted = this.state.destinationsVoted;
    destinationsVoted[destinationsVoted.length - 1] = destinyValue;

    this.setState({ destinationsVoted: destinationsVoted });
  }

  setStep = step => {
    if (this.state.destinationsVoted.length < this.state.currentStep) return alert('Selecione um destino.');
    
    this.setState({currentStep: step});
  }

  sendSurvey = () => {
    if (this.state.user.email === '' || this.state.user.name === '') return alert('Por gentileza preencha todos os campos.');
    if (!(/.+@.+\.[A-Za-z]+$/.test(this.state.user.email))) return alert('Informe um e-mail válido');
    if (!(/^[a-zA-Z ]{2,}$/.test(this.state.user.name))) return alert('Informe um nome válido');

    VotedDestinationsActions.sendSurvey(this.state.destinationsVoted, this.state.user).then(response => {
      if (response.status === 201)
        this.setState(prevState => ({ currentTab: 'resultSurvey', user: { ...prevState.user, id: response.data.userId } }));
    });
  };

  handleUserEmail = event => this.setState(prevState => ({ user: { ...prevState.user, email: event.target.value } }));

  handleUserName = event => this.setState(prevState => ({ user: { ...prevState.user, name: event.target.value } }));

  clearState = () => {
    this.setState({
      destinationsVoted: [],
      currentStep: 1,
      user: { id: 0, email: '', name: '' }
    });
  }

  changeCurrentTab = tab => {
    if (tab === 'voteForm') this.clearState();
    this.setState({ currentTab: tab });
  }

  render() {
    let contentSurvey = (
      <div className="col-md-12">
        <div className="text-center">
          <span className="spinner-border" role="status" />
        </div>
      </div>
    );

    if (this.state.loaded) {
      if (this.state.currentTab === 'voteForm') {
        contentSurvey = (
          <div className="col-md-12">
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
                      <input type="email" className="form-control" id="inputEmail" placeholder="E-mail" value={this.state.user.email} onChange={this.handleUserEmail}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Informe o seu nome</label>
                      <input type="text" className="form-control" id="inputName" placeholder="Nome" value={this.state.user.name} onChange={this.handleUserName}/>
                    </div>
                  </div>
                </Step>
              </MultiStepForm>
              {this.state.currentStep < 4 && (
                <button className="btn btn-primary mt-3" onClick={() => this.setStep(this.state.currentStep + 1)}>Votar</button>
              )}
              {this.state.currentStep === 4 && (
                <button className="btn btn-primary" onClick={() => this.sendSurvey()}>Enviar votação</button>
              )}
            </div>
          </div>
        );
      }

      if (this.state.currentTab === 'resultSurvey') {
        contentSurvey = (
          <ResultSurvey
            userId={this.state.user.id}
            previousTab='voteForm'
            changeCurrentTab={this.changeCurrentTab.bind(this)}
          />
        );
      }
    }

    return (
      <div className="container">
        <div className="py-2 text-center">
          <h3>Vote no destino</h3>
        </div>
        <div className="row">
          {contentSurvey}
        </div>
      </div>
    );
  }
}
