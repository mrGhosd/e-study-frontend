import envConfig from '../../config/env.config.js';

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
        this.host = envConfig[process.env.NODE_ENV].host;
        this.port = envConfig[process.env.NODE_ENV].port;
        this.imageUrl = `http://${this.host}:${this.port}/api/v0/attaches`;
        // if($scope.user.hasOwnProperty("date_of_birth")){
        //     $scope.user.date_of_birth = new Date($filter("date")(Date.now(), 'yyyy-MM-dd'));
        // }
        this.beginDatePopupOpened = null;
        this.endDatePopupOpened = null;
        this.datePickerFormat = 'dd.MM.yyyy';
    }

    update(){
        let user = this.$scope.user;
        let userParams = { user: {
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            middle_name: user.middle_name,
            date_of_birth: this.$filter('date')(user.date_of_birth,'dd.MM.yyyy'),
            description: user.description
        }};
        if(user.image){
            userParams.user.image = {
                attachable_type: "User",
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
            url: this.imageUrl,
            fields: {'attachable_type': "User", 'type': "Image"},
            file: file
        }).then( (object) => {
            this.$scope.user.image = object.data.attach;
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

    openDatepicker(id) {
      if (id === 'begin') {
        this.beginDatePopupOpened = true;
        this.endDatePopupOpened = false;
      }
      else {
        this.beginDatePopupOpened = false;
        this.endDatePopupOpened = true;
      }
    }
}
