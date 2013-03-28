angular.module('JSON', []).directive("editobjectproperty", function() {
    return {
        restrict : 'E',
        // templateUrl: 'editobjectproperty.html',
     template :
'<editobject object="object"></editobject><editproperty object="object"></editproperty>',
        scope : {
            object : '='
        }
    };
}).directive("editobject", function() {
    return {
        restrict : 'E',
        // templateUrl: 'editobject.html',
       template :
'<pre>{<br/><span ng-repeat="(p,v) in object"><nobr>&nbsp;&nbsp;"{{p}}": <input type="text" ng-model="v" editenter="updateProperty(p,v)" placeholder="value" title="Type ENTER to update value"></input>{{comma($last)}} <button ng-click="removeProperty(p)" title="Remove"><b> - </b></button></nobr><br></span>}</pre>',
         scope : {
             object : '='
         },
        controller : function($scope) {
            $scope.updateProperty = function(p, v) {
                $scope.object[p] = $scope.valueToSet(v);
            };

            $scope.removeProperty = function(p) {
                delete $scope.object[p];
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
                return value;
            };

            $scope.comma = function(last) {
                return ( last ? '' : ',');
            };
        }
    };
}).directive("editproperty", function() {
    return {
        restrict : 'E',
        // templateUrl: 'editproperty.html',
        template :
'<div> <input type="text" ng-model="propertyName" placeholder="property name"/><select style="width:1.5em;" ng-model="propertyName" ng-options="p as p for (p,v) in object"></select><span> : </span> <input type="text" ng-hide="objectValue" ng-model="propertyValue" editenter="addProperty()" placeholder="value" title="Type ENTER to add/update"/><span ng-hide="objectValue"> | </span> <label><input type="checkbox" ng-model="objectValue" title="Add object"></input>{}</label> <button ng-disabled="addUpdateDisabled" ng-click="addProperty()" title="{{operationTitle}}"><b>{{operation}}</b></button><button ng-visible="removeVisible" ng-click="removeProperty()" title="Remove"><b>-</b></button></div>',
        scope : {
            object : '='
        },
        controller : function($scope) {
            $scope.propertyName = '';
            $scope.propertyValue = '';
            $scope.objectValue = false;
            $scope.operation = '+';
            $scope.operationTitle = 'Add';
            $scope.removeVisibility = false;

            function adjustAddUpdateDisabled() {
                $scope.addUpdateDisabled = false;
                if ($scope.propertyName === '') {
                    $scope.addUpdateDisabled = true;
                    $scope.operation = '+';
                    $scope.operationTitle = 'Add';
                    $scope.removeVisible = false;
                } else {
                    if ($scope.object.hasOwnProperty($scope.propertyName)) {
                        $scope.operation = '=';
                        $scope.operationTitle = 'Update';
                        $scope.removeVisible = true;
                        if (valueToSet($scope.propertyValue) === $scope.object[$scope.propertyName]) {
                            $scope.addUpdateDisabled = true;
                            $scope.operationTitle += '(change value to enable)';
                        }
                    } else {
                        $scope.operation = '+';
                        $scope.operationTitle = 'Add';
                        $scope.removeVisible = false;
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
            $scope.$watch('propertyName', function() {
                if ($scope.propertyName !== '' && $scope.object.hasOwnProperty($scope.propertyName)) {
                    $scope.propertyValue = $scope.object[$scope.propertyName];
                } else {
                    $scope.propertyValue = '';
                }
                adjustAddUpdateDisabled();
            });

            $scope.$watch('propertyValue', function() {
                $scope.objectValue = (typeof $scope.propertyValue === 'object');
                adjustAddUpdateDisabled();
            });
            
            $scope.$watch('objectValue', function() {
                if (!$scope.objectValue) {
                    if (typeof $scope.propertyValue === 'object') {
                        $scope.propertyValue = '';
                    }
                } else {
                    if (typeof $scope.propertyValue !== 'object') {
                        $scope.propertyValue = {};
                    }
                }
            });
            
            $scope.addProperty = function() {
                if ($scope.objectValue) {
                    $scope.object[$scope.propertyName] = {};
                } else {
                    $scope.object[$scope.propertyName] = valueToSet($scope.propertyValue);
                }
                adjustAddUpdateDisabled();
            };
            $scope.removeProperty = function() {
                delete $scope.object[$scope.propertyName];
                $scope.propertyName = '';
                $scope.propertyValue = '';

                adjustAddUpdateDisabled();
            };

            adjustAddUpdateDisabled();
        }
    };
}).directive('ngVisible', function() {
    return function(scope, element, attr) {
        scope.$watch(attr.ngVisible, function(visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
}).directive('editenter', function() {
    return function(scope, elm, attrs) {
        elm.bind('keypress', function(e) {
            if (e.keyCode === 13) {
                scope[attrs.ngModel] = this.value;
                scope.$apply(attrs.editenter);
            }
        });
    };
});
