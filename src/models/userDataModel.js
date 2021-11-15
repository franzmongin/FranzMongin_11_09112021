export class userDataModel {
  constructor(data) {
    this.userId = data.id;
    this.userInfos = data.userInfos;
    if (data.score) {
      this.todayScore = data.score;
    } else if (data.todayScore) {
      this.todayScore = data.todayScore;
    }
  }
}
