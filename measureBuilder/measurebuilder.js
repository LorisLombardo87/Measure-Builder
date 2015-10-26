define([
        'jquery',
        'qlik',
        './properties',
        './initialproperties',
        './lib/js/extensionUtils',
        'text!./lib/css/scoped-bootstrap.css',
        'text!./lib/partials/template.html'
],
function ($, qlik, props, initProps, extensionUtils, cssContent, template) {
    'use strict';

    extensionUtils.addStyleToHeader(cssContent);

    console.log('Initializing - remove me');

    return {

        definition: props,

        initialProperties: initProps,

        snapshot: { canTakeSnapshot: true },

        // Angular Support (uncomment to use)
        template: template,

        // Angular Controller
        controller: ['$scope', function ($scope) {

            // $scope.measure = {};

            // $scope.measure.name = '';
            // $scope.measure.description = '';
            // $scope.measure.definition = '';
            // $scope.measure.saved = false;
            // $scope.measure.testDim = '';

            // $scope.measure.field = '';
            // $scope.measure.aggrFunction = {};

            // $scope.measure.modifiers = [];
            // $scope.measure.mods = '';

            // $scope.measure.set = {};

            // $scope.step = -1;
            // $scope.maxStep = -1 ;
            //$scope.home();

            $scope.possAggrFunction = [
                {
                    "name": "Sum",
                    "funcb": "Sum(",
                    "funca": ")"
                },
                {
                    "name": "Count",
                    "funcb": "Count(",
                    "funca": ")"
                },
                {
                    "name": "Average",
                    "funcb": "Avg(",
                    "funca": ")"
                },
                {
                    "name": "Concat",
                    "funcb": "Concat(",
                    "funca": ",',')"
                }
                ,{
                    "name": "Max",
                    "funcb": "Max(",
                    "funca": ")"
                }
                ,{
                    "name": "Min",
                    "funcb": "Min(",
                    "funca": ")"
                }
            ]
            $scope.possSet = [
                {
                    "name": "on Current Selections",
                    "funcb":"{$",
                    "funca":"}",
                    "id": 1

                },
                 {
                    "name": "Whole data Set",
                    "funcb":"{1",
                    "funca":"}",
                    "id": 2

                }
            ];

            $scope.setDataSet = function(item){
                 $scope.measure.set = item;
            }
            
            //mod methods
            $scope.addModifiers = function(type){
                
                if(!$scope.measure.set.id){
                    $scope.measure.set = $scope.possSet[0];
                }
                
                var mod = {
                    //id: $scope.measure.modifiers.length,
                    type: type,
                    field: '',
                    value: ''
                };
               $scope.measure.modifiers.push(mod);
            }
            $scope.removeMod = function(mod){
                $scope.measure.modifiers.splice($scope.measure.modifiers.indexOf(mod), 1);
               $scope.makeMod();
            }

            $scope.makeMod = function(){
                if($scope.measure.modifiers.length > 0){
                    $scope.measure.mods = '<';
                }
                
                angular.forEach($scope.measure.modifiers, function(value, key) {
                    if((value.type == 1 && value.field )|| ((value.type == 2 || value.type == 3) && (value.field && value.value)) ){
                        $scope.measure.mods += value.field + '='; 
                        if(value.type == 2){
                            $scope.measure.mods += '{\'' + value.value + '\'}'; 
                        }
                        else if(value.type == 3){
                           $scope.measure.mods += '{$(=' + value.value + ')}';
                        }

                        if(key!=($scope.measure.modifiers.length-1)){
                            $scope.measure.mods += ',';
                        }
                    }
                });

                if($scope.measure.modifiers.length > 0){
                    $scope.measure.mods += '>';
                }

                if($scope.measure.modifiers.length == 0){
                    $scope.measure.mods = '';
                }

            };

            //step methods

            $scope.home = function(){
                $scope.measure = {};

                $scope.measure.name = '';
                $scope.measure.description = '';
                $scope.measure.definition = '';
                $scope.measure.saved = false;
                $scope.measure.testDim = '';

                $scope.measure.field = '';
                $scope.measure.aggrFunction = {};

                $scope.measure.modifiers = [];
                $scope.measure.mods = '';

                $scope.measure.set = {};

                $scope.step = -1;
                $scope.maxStep = -1 ;

                $scope.importText = '';
                $scope.msgText = '';

            };
            $scope.home();

            $scope.create = function(){
                $scope.measure.name = '';
                $scope.measure.description = '';
                $scope.measure.definition = '';
                $scope.measure.saved = false;
                $scope.measure.testDim = '';

                $scope.measure.field = '';
                $scope.measure.aggrFunction = {};

                $scope.measure.modifiers = [];
                $scope.measure.mods = '';

                $scope.measure.set = {};

                $scope.step = 0;
                $scope.maxStep = 0 ;
            };

            $scope.modify = function(){

                app.variable.getContent($scope.measure.name,function ( reply ) {
                    console.log('r',reply);
                    var val = reply.qContent.qString;
                    var n = val.indexOf("//measurbuilderdef");
                    console.log('n',n);
                    if(n > -1){
                        // console.log('ci siamo');
                        // console.log('obj',JSON.parse(val.substring(n+18)));
                        $scope.measure = JSON.parse(val.substring(n+18));
                        $scope.step = 3;
                        $scope.maxStep = 3 ;
                    }
                    else{
                        $scope.importText ='it is Not Possible to modify '+$scope.measure.name+' with measure Builder! You can Only modify measure created with Measure Builder!';
                        //console.log('non ci siamo');
                    }
                });
            };

            $scope.stepOver = function(){
                if( $scope.step<4 && $scope.maxStep<4){
                    $scope.step++;
                    $scope.maxStep = $scope.step;
                }
            };
            $scope.goToStep = function(n){
                $scope.step = n;
            };

            var app = qlik.currApp(this);

            var createHyperCube =  function () {

                var qDimensions= [];
                
                var qDef = {
                        qFieldDefs:[],
                        qFieldLabels: [], 
                        qSortCriterias:[],
                        qNumberPresentations:[],
                        //qReverseSort: false
                        //qActiveFields
                        //qGrouping
                    };
                qDef.qFieldDefs.push( "="+$scope.measure.testDim);
                qDef.qFieldLabels.push('Test Dimension');
                qDef.qSortCriterias.push({qSortByAscii: 1});

                var qDimension = {
                    qDef: qDef
                    //qLibraryId
                    //qNullSuppression: true,
                    //qShowAll: true,
                    //qTotalLabel: "Total"
                    //qOtherTotalSpec = 
                    //qOtherLabel
                };
                qDimensions.push(qDimension);

                var qMeasures= [], qDef = {};
                
                    var qMeasure = {
                            qDef:{
                                    qDef: "="+$scope.measure.aggrFunction.funcb+ ' '
                                            +$scope.measure.set.funcb+ ''
                                            +$scope.measure.mods+ ''
                                            +$scope.measure.set.funca+ ' '
                                            +$scope.measure.field+ ' '
                                            +$scope.measure.aggrFunction.funca, 
                                    qLabel: $scope.measure.name,
                                    qNumFormat: {
                                        qType: 'R'
                                        // qnDec
                                        // qUseThou
                                        // qFmt
                                        // qDec
                                        // qThou
                                    }
                                    // qDescription,
                                    // qTags,
                                    // qGrouping,
                                    // qRelative,
                                    // qBrutalSum,
                                    // qAggrFunc,
                                    // qAccumulate,
                                    // qReverseSort,
                                    // qActiveExpression,
                                    // qExpressions,

                            }
                            // qLibraryId,
                            // qSortBy,
                            // qAttributeExpressions

                    };
                    qMeasures.push(qMeasure);

                //console.log(qMeasures);

                var cubeDef = {
                    qInterColumnSortOrder: [0, 1],
                    qDimensions: qDimensions,
                    qMeasures: qMeasures,
                    qInitialDataFetch: 
                        [{
                                qWidth: 2,
                                qHeight: 50
                        }],
                    // qStateName
                    // qSuppressZero
                    // qSuppressMissing
                    // qMode
                    // qNoOfLeftDims
                    // qAlwaysFullyExpanded
                };
                console.log('cube def',cubeDef);

                app.createCube( cubeDef, function ( reply ) {
                    console.log( 'cube', reply );

                    $scope.hyperCube =  reply;    
                    
                } ); // app cube
            };

            $scope.hyperCube = []
            $scope.test = function(){
                $scope.msgText = '';
                if(!$scope.measure.set.id){
                    $scope.measure.set = $scope.possSet[0];
                }
                createHyperCube();
            }

            $scope.save = function(){
                console.log('s');
                // app.variable.getByName($scope.measure.name).then(function(model){
                //    console.log('mod',model);
                // });

                if(!$scope.measure.set.id){
                    $scope.measure.set = $scope.possSet[0];
                }

                $scope.measure.definition = $scope.measure.aggrFunction.funcb+ ''
                    +$scope.measure.set.funcb+ ''
                    +$scope.measure.mods+ ''
                    +$scope.measure.set.funca+ ''
                    +$scope.measure.field+ ''
                    +$scope.measure.aggrFunction.funca;

                
                if(!$scope.measure.saved) {
                    var qProp = {
                        "qName": $scope.measure.name,  //String  Variable name.
                        "qComment": $scope.measure.description,    //String  Optional. Comment.
                        "qDefinition": $scope.measure.definition +'//measurbuilderdef'+ JSON.stringify($scope.measure)
                        //"qNumberPresentation" Object  Optional.
                        //"qIncludeInBookmark"
                    };
                    app.variable.create(qProp)
                    .then(function(model){
                        console.log('mod',model);
                        if(model.id){
                            $scope.msgText = 'Measure Builded! use $('+ $scope.measure.name+') in your chart ';
                            $scope.measure.saved = true;
                        }
                    });
                }

                else if($scope.measure.saved) {
                    $scope.measure.saved = true;
                    app.variable.setStringValue( $scope.measure.name,$scope.measure.definition +'//measurbuilderdef'+ JSON.stringify($scope.measure))
                    .then(function(model){
                        console.log('mod',model);
                        $scope.msgText = 'Measure Builded! use $('+ $scope.measure.name+') in your chart ';
                    });
                }
            };
            

            $scope.setUp = function(){
                // console.log('varValues',varValues);
                // console.log('varDescs',varDescs);
                // console.log('ud',useDesc);


                //item.value as item.label for item in values               
                
                angular.forEach($scope.varValues, function(value, key) {
                    var item = {
                        value: '',
                        label: ''
                    };
                    item.value = value;
                    item.label = value;
                    if($scope.useDesc){
                        item.label = $scope.varDescs[key];
                    }

                    $scope.values.push(item);
                });

                app.variable.getContent($scope.layout.props.variableName,function ( reply ) {
                    //console.log('r',reply);
                    $scope.variableValue = reply.qContent.qString; 
                    $scope.variableIndex = $scope.varValues.indexOf($scope.variableValue);
                    $scope.variableValueDesc = $scope.values[$scope.variableIndex].label;  
                });
                //console.log('v',$scope.values);
               
            };
        }]
    };

});
