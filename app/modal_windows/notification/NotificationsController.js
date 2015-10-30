export default class ErrorsModalController{
    constructor($modal, $modalInstance, message, type) {
        this.$modal = $modal;
        this.$modalInstance = $modalInstance;
        this.title = `${message}.title`;
        this.text = `${message}.text`;
        this.type = type;
    }

    close(){
        this.$modalInstance.dismiss('cancel');
    }
}