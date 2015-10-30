export default class Notification {
    constructor($modal) {
        this.$modal = $modal;
    }

    info(){

    }

    alert(error){
        this.$modal.open({
            animation: true,
            template: require('./errors/errors_modal.html'),
            controller: 'ErrorsModalController as modal',
            resolve: {
                error: () => {
                    return error;
                }
            }
        });
    }
}