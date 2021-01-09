import axios from 'axios';

export default class VotedDestinationsActions {
  static sendSurvey(destinationsVoted, user) {
    const url = '/voted_destinations';

    const data = {
      destinations: {
        ids: destinationsVoted
      },
      user: {
        email: user.email,
        name: user.name
      }
    };

   return axios.post(url, data);
  }
}
