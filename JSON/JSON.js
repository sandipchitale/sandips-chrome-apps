angular.module('JSON', []).directive("editproperty", function() {
    return {
        restrict : 'E',
        scope : {
            object : '='
        },
        templateUrl: 'JSON.html',
//        template : 
//'<div> <input type="text" ng-model="propertyName" placeholder="property name"/><select style="width:1.5em;" ng-model="propertyName" ng-options="p as p for (p,v) in object"></select><span> : </span> <input type="text" ng-model="propertyValue" placeholder="value"/> <input type="checkbox" ng-model="overwrite" title="Overwrite"> <button ng-disabled="addUpdateDisabled" ng-click="addProperty()" title="{{operationTitle}}"> {{operation}} </button> <button ng-visible="removeVisible" ng-click="removeProperty()" title="Remove"> - </button> </div>',
        controller : function($scope) {
            $scope.propertyName = '';
            $scope.propertyValue = '';
            $scope.overwrite = false;
            $scope.operation = '+';
            $scope.operationTitle = 'Add';
            $scope.addUpdateDisabled = false;
            $scope.removeVisibility = false;
            
            $scope.$watch('propertyName', function(propertyName) {
                $scope.addUpdateDisabled = ('' === propertyName);
                if ($scope.object.hasOwnProperty(propertyName)) {
                    $scope.propertyValue = $scope.object[propertyName];
                    $scope.overwrite = true;
                    $scope.operation = '=';
                    $scope.operationTitle = 'Update';
                    $scope.removeVisible = true;
                } else {
                    $scope.propertyValue = '';
                    $scope.overwrite = false;
                    $scope.operation = '+';
                    $scope.operationTitle = 'Add';
                    $scope.removeVisible = false;
                }
            });
            $scope.addProperty = function() {
                if ($scope.propertyName && ($scope.overwrite || (!$scope.object.hasOwnProperty($scope.propertyName)))) {
                    var f = parseFloat($scope.propertyValue);
                    if (f !== NaN && f == $scope.propertyValue) {
                        $scope.object[$scope.propertyName] = f;
                    } else {
                        var i = parseInt($scope.propertyValue);
                        if (i !== NaN && i == $scope.propertyValue) {
                            $scope.object[$scope.propertyName] = i;
                        } else {
                            $scope.object[$scope.propertyName] = $scope.propertyValue;
                        }
                    }
                }
                if (!$scope.overwrite) {
                    $scope.propertyName = '';
                    $scope.propertyValue = ''; 
                }
            };
            $scope.removeProperty = function() {
                delete $scope.object[$scope.propertyName];
                $scope.propertyName = '';
            };
        }
    }
}).directive('ngVisible', function() {
    return function(scope, element, attr) {
        scope.$watch(attr.ngVisible, function(visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
});
