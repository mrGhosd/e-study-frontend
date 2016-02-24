export function onChangeStateError($rootScope, $state, Notification) {
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      usSpinnerService.stop('main-spinner');
      event.preventDefault();
      if(error.status === 401) {
          if (fromState.name !== "") {
              $state.go(fromState.name);
          } else {
              if (toState.name === 'profile') {
                  $state.go('users');
              }
          }
          Notification.alert('errors.401');
      }
  });
}
