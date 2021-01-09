import React, { Component } from 'react';
import ResultSurveyActions from '../actions/ResultSurveyActions';

export default class ResultSurvey extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      generalRanking: [],
      userRanking: [],
      loaded: false
    };
  }

  componentDidMount = () => {
    ResultSurveyActions.getUserRanking(this.props.userId).then(response => {
      this.setState({
        generalRanking: response.data.general_results,
        userRanking: response.data.user_results,
        loaded: true
      });
    });
  }

  render() {
    const loader = (
      <div className="text-center">
        <span className="spinner-border" role="status" />
      </div>
    );

    const tbodyGeneralRanking = (
      this.state.generalRanking.map((row, idx) => (
        <tr key={idx}>
          <th scope="row">{idx + 1}º</th>
          <td>{row.destino}</td>
          <td>{row.votos}</td>
        </tr>
      ))
    );

    const tbodyUserRanking = (
      this.state.userRanking.map((row, idx) => (
        <tr key={idx}>
          <th scope="row">{idx + 1}º</th>
          <td>{row.destino}</td>
          <td>{row.votos}</td>
        </tr>
      ))
    );
    return (
      <>
        <div className="col-md-12">
          <div className="text-center">
            <h3 className="my-5">Obrigado pelo seu voto!</h3>
            <p className="lead">Veja abaixo os destinos mais votados:</p>
          </div>
          <table className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Destino</th>
                <th scope="col">Votos</th>
              </tr>
            </thead>
            <tbody>
              {tbodyGeneralRanking}
            </tbody>
          </table>
          {this.state.loaded ? null : loader}

          <hr className="my-5" />

          <div className="text-center">
            <h5>Veja abaixo os seus votos:</h5>
          </div>
          <table className="table table-hover table-striped table-sm">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Destino</th>
                <th scope="col">Votos</th>
              </tr>
            </thead>
            <tbody>
              {tbodyUserRanking}
            </tbody>
          </table>
          {this.state.loaded ? null : loader}

        </div>
        <div className="col-md-12 text-center py-3">
          <button type="button" className="btn btn-primary" onClick={() => this.props.changeCurrentTab(this.props.previousTab)}>Votar novamente</button>
        </div>
      </>
    );
  }
}
