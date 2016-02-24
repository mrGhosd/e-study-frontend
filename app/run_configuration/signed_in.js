export function onSignedIn($rootScope, $state) {
  $rootScope.$on('signedIn', (event, args) => {
      if($state.current.name === 'user'){
          $state.go('profile');
      }
  });
}
