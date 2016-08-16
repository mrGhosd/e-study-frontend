currentUserFactory.$inject = ['$rootScope'];

export default function currentUserFactory($rootScope) {
  var user = {
    studying_courses: []
  };
  return {
    getUser() {
      return user;
    },
    setUser(u) {
      user = u;
    }
  };
}
