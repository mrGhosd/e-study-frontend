import envConfig from '../../../../config/env.config.js';

export default class AttachesController {
    constructor($scope) {
      const hostName = envConfig[process.env.NODE_ENV].host;
      const portName = envConfig[process.env.NODE_ENV].port;
      $scope.attachURL = `http://${hostName}:${portName}${this.attach.file.file.url}`;
      $scope.fileType = this.attach.type;
      $scope.isImage = $scope.fileType === 'Image';
      this.attachURL = $scope.attachURL;
      this.fileType = $scope.fileType;
      this.isImage = $scope.isImage;
    }
}
