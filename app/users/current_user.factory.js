currentUserFactory.$inject = [];

export default function currentUserFactory() {
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
