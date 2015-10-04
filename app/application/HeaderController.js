import I18n from 'i18n-js';
export default class HeaderController{
    constructor($scope, $translate){
        this.$scope = $scope;
        this.locale = I18n.currentLocale();
        this.$translate = $translate;
        console.log(this.$translate);
    }
    changeLocale(){
        let lang = (this.$translate.use() === 'en' ) ? 'ru' : 'en';
        this.$translate.use((this.$translate.use() === 'en' ) ? 'ru' : 'en');
        this.locale = lang;
    }
}

