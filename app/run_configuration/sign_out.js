export function onSignOut($state, $rootScope) {
  $rootScope.$on('signedOut', (event, args) => {
      if($state.current.name === 'profile'){
          $state.go('users');
      }
  });
}
