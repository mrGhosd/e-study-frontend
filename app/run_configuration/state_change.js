export function onStateChange($rootScope, usSpinnerService) {
  $rootScope.$on('$stateChangeStart', (event, viewConfig) => {
      usSpinnerService.spin('main-spinner');
  });

  $rootScope.$on('$stateChangeSuccess', (event) => {
      usSpinnerService.stop('main-spinner');
  });
}
