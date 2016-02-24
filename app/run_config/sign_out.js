export function onSignOut($rootScope) {
  $rootScope.$on('signedOut', (event, args) => {
      if($state.current.name === 'profile'){
          $state.go('users');
      }
  });
}
