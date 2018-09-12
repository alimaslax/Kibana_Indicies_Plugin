import moment from 'moment';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';

import overviewTemplate from './templates/index.html';
import detailTemplate from './templates/detail.html';
import { helloController } from './helloController';


uiRoutes.enable();
uiRoutes
.when('/', {
  template: overviewTemplate,
  controller: 'elasticsearchStatusController',
  controllerAs: 'ctrl'
})
.when('/index/:name', {
  template: detailTemplate,
  controller: 'elasticsearchDetailController',
  controllerAs: 'ctrl'
});

uiModules

.get('app/elasticsearch_status')

.controller('elasticsearchStatusController', function ($http) {
  $http.get('../api/es-status-sao/indices').then((response) => {
    this.indices = response.data;
  });
})

.controller('elasticsearchDetailController', function($routeParams, $http) {
  this.index = $routeParams.name;

	//  Note the funny quotes around the bit that gets substituted.
	//  THEY ARE REQUIRED - using normal quotes breaks the substitution
    $http.get('../api/es-status-sao/index/' + `${this.index}`).then((response) => {
    this.status = response.data;
  });
})
.controller('helloController', helloController)
.controller('MainCtrl', function ($scope) {
  $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
  };})
.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();

				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});
