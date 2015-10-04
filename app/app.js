import angular from 'angular';
import uirouter from 'uirouter';
import angularBootstrap from 'angular_bootstrap';
import devise from 'angular_devise';
import translate from 'angular_translate';
import upload from 'angular_upload';
import jQuery from 'jquery';
import bootstrap from 'bootstrap';
import fileUpload from 'ng_file_upload';
import rangy from 'rangy';
//import textAngular from 'textAngular';

import routes from 'app.config';
import home from 'home/index';
import users from 'users/main'

import './index.html';
import 'css/main.scss';

angular.module('estudy', [uirouter, home, users])
    .config(routes);