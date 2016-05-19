import envConfig from '../../../../config/env.config.js';

export default class AttachesController {
    constructor($scope) {
      this.hostName = envConfig[process.env.NODE_ENV].host;
      this.portName = envConfig[process.env.NODE_ENV].port;
      $scope.attachURL = this.formCorrectURL();
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

    formCorrectURL() {
      return this.attach.url;
    }

}
