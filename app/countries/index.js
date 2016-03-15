import angular from 'angular';

import CountryService from './CountryService';

export default angular.module('estudy.countries', [])
                      .service('CountryService', CountryService).name;
