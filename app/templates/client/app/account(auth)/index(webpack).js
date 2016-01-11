import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './account.routes';

import login from './login';
import settings from './settings';
import signup from './signup';

export default angular.module('<%= scriptAppName %>.account', [
    uirouter,
    login,
    settings,
    signup
])
    .config(routing)
    .name;
