export function onChangeStateError($rootScope, $state, Notification, usSpinnerService, currentUserFactory) {
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      usSpinnerService.stop('main-spinner');
      event.preventDefault();

      if(error.status === 401) {
        console.log(toState.name);
          if (fromState.name !== "") {
              $state.go(fromState.name);
          } else {
              if (toState.name === 'profile') {
                  $state.go('users');
              }
              if (toState.name === 'homework') {
                  $state.go('course', {id: toParams.course_id});
              }

              if (toState.name === 'new_lesson') {
                $state.go('course', {id: toParams.course_id});
              }

              if (toState.name === 'edit_lesson') {
                $state.go('course', {id: toParams.course_id});
              }
              if (toState.name.match(/chat/)) {
                $state.go('users');
              }
          }
          Notification.alert('errors.401');
      }

      if (error.status === 403) {
        if (fromState.name !== "") {
            $state.go(fromState.name);
        } else {
          const user = currentUserFactory.getUser();

          if (toState.name === 'lesson') {
            $state.go('course', {id: toParams.course_id});
          }

          if (toState.name === 'homework') {
            $state.go('course', {id: toParams.course_id});
          }

          if (toState.name === 'new_lesson') {
            $state.go('course', {id: toParams.course_id});
          }

          if (toState.name === 'edit_lesson') {
            $state.go('course', {id: toParams.course_id});
          }

          if (user !== undefined) {

          }
        }
        Notification.alert('errors.403');
      }
  });
}
