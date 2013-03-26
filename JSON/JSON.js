angular.module('JSON', []).directive("editobject", function() {
    return {
        restrict : 'E',
        scope : {
            object : '='
        },
        templateUrl: 'editobject.html',
//        template :
//'<pre>{<br/><span ng-repeat="(p,v) in object"><nobr>&nbsp;&nbsp;<button ng-click="removeProperty(p)" title="Remove"> - </button>"{{p}}": {{valueToSet(v)}}{{comma($last)}}</nobr><br></span>}</pre>',
        controller : function($scope) {
            $scope.removeProperty = function(p) {
                delete $scope.object[p];
                $scope.propertyName = '';
            };
            
            $scope.valueToSet = function(value) {
                var f = parseFloat(value);
                if (f !== NaN && f == value) {
                    return f;
                } else {
                    var i = parseInt(value);
                    if (i !== NaN && i == value) {
                        return i;
                    }
                }
                return "'" + value + "'";
            }
            
            $scope.comma = function(last) {
                return (last ? '' : ',');
            } 
        }
    }
}).directive("editproperty", function() {
    return {
        restrict : 'E',
        scope : {
            object : '='
        },
        templateUrl: 'editproperty.html',
//        template :
//'<div> <input type="text" ng-model="propertyName" placeholder="property name"/><select style="width:1.5em;" ng-model="propertyName" ng-options="p as p for (p,v) in object"></select><span> : </span> <input type="text" ng-model="propertyValue" placeholder="value"/> <input type="checkbox" ng-model="overwrite" title="Overwrite"> <button ng-disabled="addUpdateDisabled" ng-click="addProperty()" title="{{operationTitle}}"> {{operation}} </button> <button ng-visible="removeVisible" ng-click="removeProperty()" title="Remove"> - </button> </div>',
        controller : function($scope) {
            $scope.propertyName = '';
            $scope.propertyValue = '';
            $scope.overwrite = false;
            $scope.operation = '+';
            $scope.operationTitle = 'Add';
            $scope.removeVisibility = false;
            
            function adjustAddUpdateDisabled() {
                $scope.addUpdateDisabled = false;
                if ($scope.propertyName === '') {
                    $scope.addUpdateDisabled = true;
                } else {
                    if ($scope.object.hasOwnProperty($scope.propertyName)) {
                        if (valueToSet($scope.propertyValue) === $scope.object[$scope.propertyName]) {
                            $scope.addUpdateDisabled = true;
                        } else if (!$scope.overwrite) {
                            $scope.addUpdateDisabled = true;
                        }
                    }
                }
            }
            
            function valueToSet(value) {
                var f = parseFloat(value);
                if (f !== NaN && f == value) {
                    return f;
                } else {
                    var i = parseInt(value);
                    if (i !== NaN && i == value) {
                        return i;
                    }
                }
                return value;
            }
            $scope.$watch('propertyName', function(propertyName) {
                if ($scope.object.hasOwnProperty(propertyName)) {
                    $scope.propertyValue = $scope.object[propertyName];
                    $scope.overwrite = true;
                    $scope.operation = '=';
                    $scope.operationTitle = 'Update';
                    $scope.addUpdateDisabled = true;
                    $scope.removeVisible = true;
                } else {
                    $scope.propertyValue = '';
                    $scope.overwrite = false;
                    $scope.operation = '+';
                    $scope.operationTitle = 'Add';
                    $scope.removeVisible = false;
                }
                adjustAddUpdateDisabled();
            });
            
            $scope.$watch('propertyValue', adjustAddUpdateDisabled);
            
            $scope.$watch('overwrite', adjustAddUpdateDisabled);
            
            $scope.addProperty = function() {
                if ($scope.propertyName && ($scope.overwrite || (!$scope.object.hasOwnProperty($scope.propertyName)))) {
                    $scope.object[$scope.propertyName] = valueToSet($scope.propertyValue);
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

            adjustAddUpdateDisabled();
        }
    }
}).directive('ngVisible', function() {
    return function(scope, element, attr) {
        scope.$watch(attr.ngVisible, function(visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
});
