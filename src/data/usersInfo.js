let usersInfo = {
  userInfoList: [],         // key: age, value: an array containing all the user information under the age in the key
  setUserInfoListByAgeRange(ageRangeStart, ageRangeEnd,mapAgeToUserInfo) {
    this.userInfoList = []
    for (let i = ageRangeStart; i <= ageRangeEnd; i++) {
      this.userInfoList = this.userInfoList.concat(mapAgeToUserInfo[i])
    }
  },
  getUserInfoList() {
    return this.userInfoList
  }
}


export default usersInfo
