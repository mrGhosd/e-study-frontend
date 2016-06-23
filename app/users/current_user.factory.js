currentUserFactory.$inject = ['$rootScope'];

export default function currentUserFactory($rootScope) {
  var user = null;
  return {
    getUser() {
      return user;
    },
    setUser(u) {
      user = u;
    }
  };
}
