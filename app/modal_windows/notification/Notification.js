export default class Notification {
    constructor($modal) {
        this.$modal = $modal;
    }

    info(){

    }

    alert(error){
        this.showModal(error, "error");
    }

    showModal(message, type){
        const modalWindow = this.$modal.open({
            animation: true,
            template: require('./notification_modal.html'),
            controller: 'NotificationsController as modal',
            resolve: {
                message: () => {
                    return message;
                },
                type: () => {
                    return type;
                }
            }
        });
        setTimeout(() => {
            modalWindow.dismiss('cancel');
        }, 2000)
    }
}