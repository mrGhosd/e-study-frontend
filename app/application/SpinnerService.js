//SpinnerService.$inject = ['$qProvider', '$windowProvider', 'usSpinnerService'];

export function SpinnerService($q, $window, usSpinnerService){
    return (promise) => {
        return promise.then((response) => {

            usSpinnerService.spin('main-spinner');
            return response;
        }, (errors) => {
            usSpinnerService.stop('main-spinner');
            return $q.reject(errors);
        })
    }
}