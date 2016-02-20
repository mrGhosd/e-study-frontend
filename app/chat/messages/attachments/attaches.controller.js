import envConfig from '../../../../config/env.config.js';

export default class AttachesController {
    constructor($scope) {
      const hostName = envConfig[process.env.NODE_ENV].host;
      const portName = envConfig[process.env.NODE_ENV].port;
      $scope.attachURL = `http://${hostName}:${portName}${this.attach.url}`;
      $scope.fileType = this.attach.type;
      this.attachURL = $scope.attachURL;
      this.fileType = $scope.fileType;
      this.isImage = $scope.fileType === 'Image';
      this.isDoc = $scope.fileType === 'Doc';
      this.isZip = $scope.fileType === 'Zip';
      this.isPdf = $scope.fileType === 'Pdf';
      this.isTable = $scope.fileType === 'Table';
      this.isAttach = $scope.fileType === 'Attach' || $scope.fileType == null;
      this.isPresentation = $scope.fileType === 'Presentation';
    }
}
