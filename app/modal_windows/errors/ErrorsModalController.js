export default class ErrorsModalController{
    constructor($modal, $modalInstance, error){
        this.$modal = $modal;
        this.$modalInstance = $modalInstance;
        this.title = `${error}.title`;
        this.text = `${error}.text`;
    }

    close(){
        this.$modalInstance.dismiss('cancel');
    }
}