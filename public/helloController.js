import moment from 'moment';

export function helloController ($scope, $route, $interval) {
  $scope.title = 'Hello';
  $scope.description = 'An awesome Kibana plugin';

  const currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  const unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
}
