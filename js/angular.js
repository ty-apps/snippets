//Custom keyboard controller
angular.module('ib.controllers')
  .controller('KeyboardSettingsCtrl', function($scope, DbService) {

    $scope.model = $scope.model || {};

    $scope.moveKeyboardItem = function(item, fromIndex, toIndex) {
      $scope.settings.keyboard.splice(fromIndex, 1);
      $scope.settings.keyboard.splice(toIndex, 0, item);
      DbService.storeSettings($scope.settings);
    };

    $scope.keyboardItemDelete = function(item) {
      $scope.settings.keyboard.splice($scope.settings.keyboard.indexOf(item), 1);
      DbService.storeSettings($scope.settings);
    };

    $scope.addKeyboardItem = function() {
      var newItem = {name: '', value: ''};
      $scope.settings.keyboard.push(newItem);
      DbService.storeSettings($scope.settings);
    };

  })

//Nested states communication example
angular.module('ib.controllers')
  .controller('ObjInfoCtrl', function($scope, $log, objInfo, FieldObjFactory, JobsFactory, $rootScope) {
    //Listen to obj update event.
    $scope.$on('objctrl.update', function() {
      $scope.objInfo = FieldObjFactory.getObjectInfo(JobsFactory.job.data);
      //Trigger child update event.
      $scope.$emit('childobj.updated');
    });

    $scope.objInfo = objInfo;
    if ($rootScope.debugMode) {
      $log.info("ObjInfoCtrl enter time " + Date.now(), {'controllerStartTime' : Date.now()});
    }

    $scope.isLongText = function(item) {
      return item.Type == "7";
    };
    $scope.isNotLongText = function(item) {
      return !$scope.isLongText(item);
    };
    $scope.hasNoValue = function(item) {
      return !item.Value && !item.FemaleParentValue && !item.MaleParentValue;
    };
    $scope.hasParentValue = function(item) {
      return item.FemaleParentValue || item.MaleParentValue;
    };

  })
