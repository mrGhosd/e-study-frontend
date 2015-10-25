export default class UserFormController {
    constructor($scope, user, $filter){
        this.user = user;
        this.$scope = $scope;
        this.$filter = $filter;
        $scope.user = user;
        if($scope.user.hasOwnProperty("date_of_birth")){
            $scope.user.date_of_birth = new Date($filter("date")(Date.now(), 'yyyy-MM-dd'));
        }
    }
}