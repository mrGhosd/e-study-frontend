export default class ErrorsModalController{
    constructor($modal, error){
        this.$modal = $modal;
        this.text = error;
    }
}

export default angular.module('estudy.errors', []).controller('ErrorsModalController', ErrorsModalController).name;