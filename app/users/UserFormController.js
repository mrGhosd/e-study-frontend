export default class UserFormController {
    constructor($scope, $rootScope, $state, user,
                $filter, UserService, Upload, AuthService, Notification, usSpinnerService){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$filter = $filter;
        this.UserService = UserService;
        this.$state = $state;
        $scope.user = user;
        this.Upload = Upload;
        this.Notification = Notification;
        this.AuthService = AuthService;
        this.usSpinnerService = usSpinnerService;
        this.setDefaultLoadNotifications();
        if($scope.user.hasOwnProperty("date_of_birth")){
            $scope.user.date_of_birth = new Date($filter("date")(Date.now(), 'yyyy-MM-dd'));
        }
    }

    update(){
        let user = this.$scope.user;
        let userParams = { user: {
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            middle_name: user.middle_name,
            date_of_birth: user.date_of_birth,
            description: user.description
        }};
        if(user.image){
            userParams.user.image = {
                imageable_type: "User",
                id: user.image.id
            };
        }
        this.UserService.update(user.id, userParams)
        .then((data) => {
            this.Notification.info('notifications.profile_update');
            this.$rootScope.$broadcast('profileUpdated', data);
            this.$state.go('user', {id: data.id});
        })
        .catch((errors) => {
            this.Notification.alert('errors.profile_update');
            this.$scope.userForm.$submitted = true;
            this.$scope.userForm.$errors = errors;
            this.$scope.userForm.$invalid = true;
        });
    }

    upload(file){
        this.setDefaultLoadNotifications();
        this.usSpinnerService.spin('user-form-image');
        this.Upload.upload({
            url: 'http://localhost:3000/api/v0/images',
            fields: {'imageable_type': "User"},
            file: file
        }).then( (object) => {
            this.$scope.user.image = object.data;
            this.usSpinnerService.stop('user-form-image');
            this.loadedSuccessfully = true;
            this.loadedFailure = false;
        },
        (error) => {
            this.usSpinnerService.stop('user-form-image');
            this.loadedSuccessfully = false;
            this.loadedFailure = true;
            this.Notification.alert('notifications.profile_update_image_failure');
        })

    }

    setDefaultLoadNotifications(){
        this.loadedSuccessfully = false;
        this.loadedFailure = false;
    }
}