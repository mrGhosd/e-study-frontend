export default class ErrorsModalController{
    constructor($modal, $modalInstance, error){
        this.$modal = $modal;
        this.$modalInstance = $modalInstance;
        this.text = error;
    }

    close(){
        this.$modalInstance.dismiss('cancel');
    }
}