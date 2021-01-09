import axios from 'axios';

export default class ResultSurveyActions {
  static getUserRanking(userId) {
    const url = '/ranking.json';

    const data = {
      params: {
        user_id: userId
      }
    }

    return axios.get(url, data);
  }
}
