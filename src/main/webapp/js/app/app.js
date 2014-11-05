/*
 * -------------------------------
 * Infomarktplatz App | AngularJS 
 * -------------------------------
*/
(function(){
    /*
        Application Initialization
    */
    var app = angular.module('infomarktplatz', ['ngRoute', 'ngSanitize']);
    var currentLang = "en",
        Root = '/projectile/api/infomarktplatz/';

    /*
        Application Config
    */
    app.config(function($routeProvider) {
   	
        $routeProvider.when('/', {
     		 templateUrl: Root + 'templates/first_page.html', 
      	     controller: 'FirstPageController'
    	})
        .when('/list/:keyword', {
            templateUrl: Root + 'templates/list_page.html', 
            controller:  'ListController'
        })
        .when('/add/keyword=:keyword', {
            templateUrl: Root + 'templates/add_page.html', 
            controller:  'AddFormController',
            resolve: {_zhType: function(){return "new";}}
        })
        .when('/edit/:infobitId', {
            templateUrl: Root + 'templates/add_page.html', 
            controller:  'AddFormController',
            resolve: {_zhType: function(){return "edit";}}
        })
        .when('/duplicate/:infobitId', {
            templateUrl: Root + 'templates/add_page.html', 
            controller:  'AddFormController',
            resolve: {_zhType: function(){return "duplicate";}}
        })
        .otherwise({ redirectTo: '/' });
    
    });
    
    /*
        Application Controllers
        (custom ng Controllers)
    */
    /*
        @Main Controller
        (is declared on index page and it's called "parent" for other controllers)
    */
    app.controller('MainController', function ($scope, $http, $routeParams) {
        var captions = {};
   	    captions.en = {
            newEntry: 'New Entry',
            livePreview: 'Live Preview',
            keyword: 'Keyword',
            category: 'Category',
            textLabel: 'Text',
            files: 'Files',
            submit: 'Submit',
            message: 'Message',
            addFav: 'Star this Entry',
            addFavMsg: 'Infonod was succefully starred',
            addFavAllreadyMsg: 'Infonode was allready starred',
            remFav: 'Unstar this Entry',
            remFavMsg: 'Infonode was unstarred',
            star_unstar: 'Star',
            getInfobitLink: 'Get Link',
            editEntry: 'Edit Entry',
            confirmation: 'Confirmation',
            removeConfirmationText: 'Are you sure that you want to remove this Infobit?',
            ok: 'OK',
            yes: 'Yes',
            no: 'No',
            cancel: 'Cancel',
            keywordNameTitle: 'Change the keyword name',
            keywordNameText: 'Write the new keyword name bellow:',
            keywordNameInfo: function(num1){return 'Information: <em>' + num1 + ' '+ (num1 == 1 ? 'infobit' : 'infobits') + '</em> linked to this keyword founded.';},
            add: 'Add',
            addD: 'Add new Infobit',
            addK: 'Add new Keyword',
            edit: 'Edit',
            refresh: 'Refresh',
            duplicate: 'Duplicate',
            remove: 'Remove',
            user: 'User',
            date: 'Date',
            last_change: 'Last Change',
            history1: 'Von hier aus besucht:',
            history2: 'Hierher gekommen von:',
            historyT: 'Softlinks',
            favEntries: 'Popular Entries',
            recentEntries: 'Recent Keywords',
            lastNews: 'Last News', 
            smallStatisticLabel: 'Gesamtstatistik',
            smallStatistic: function(num1, num2, num3){ return num1 + " " + (num1 == 1 ? "Keyword" : "Keywords") + ", " + num2 + " " + (num2 == 1 ? "Infonode" : "Infonodes") + ", " + num3 + " " + (num3 == 1 ? "Softlink" : "Softlinks")},
            statistic: 'Statistic',
            showRandomText: 'Show a random Keyword List',
            users: 'Users',
            categories: 'Categories',
            search: 'Search',
            searchPlaceholder: 'Enter a keyword to search',
            sortByCategories: 'Sort by Categories',
            sortInfondesT: 'Sort Infonodes',
            searchResultText: 'Searches related to',
            searchNoResults: 'Didn\'t find what you were looking for',
            searchFailText: 'Sorry, no results found for:',
            success: 'Success',
            nodeSCreatedT: 'Infonode was succefully created',
            nodeSEditedT: 'Infonode was succefully edited',
        };
        captions.de = {
            
        };
        captions.pt = {
             
        };
        $scope.captions = captions[currentLang];
        
        loadJqueryFn('all');
    });
    
    /*
        @FirstPage Controller
        (is declared on First Page)
    */
    app.controller('FirstPageController', function($scope, $http, $routeParams, CategoriesService, KeywordsService, InfoNodesService, OthersService){
        CategoriesService.list(function(data){
            $scope.categories = data.Entries;
            $scope.sCategories = [];
        });
        KeywordsService.list(function(data){
            $scope.keywords = data;
        });
        InfoNodesService.get(null, function(data){
            var lastKeywords = [];
            var filter = data.Entries.filter( function(r){
                if(lastKeywords.indexOf(r.keyword) == -1){
                    lastKeywords.push(r.keyword);
                    return true;
                }else{
                    return false;   
                }
            });
            $scope.lastNews = filter;
        },{category:'News'});
        
        $scope.getSmallStatistic = function(){
            if(typeof($scope.keywords)=='undefined' || typeof($scope.keywords.TotalEntryCount)=='undefined'){return '0';}
            var num1 = $scope.keywords.TotalEntryCount,
                num2 = 0,
                num3 = 0;
            
            return $scope.captions.smallStatistic(num1,num2,num3);       
        };
        
        $scope.randomEntry = function(){
            var randomKey = $scope.keywords.Entries[Math.floor(Math.random() * $scope.keywords.Entries.length)];
            location = '#/list/' + randomKey.keyword;    
        };
        
        $scope.searchKeyWordForm = function(data){
            if(typeof($scope.lastKeyWordSearched) == 'undefined' || $scope.lastKeyWordSearched != data){
                OthersService.keywordSearchAction(data, $scope.captions);
            }
            $scope.lastKeyWordSearched = data;
        };
        
        $scope.toggleStatistic = function(){
            if($scope.sCategories.length == 0){
                for(category in $scope.categories){
                    InfoNodesService.get(null, function(data, param){
                        var category = $scope.categories.filter(function(o, index){
                            if(o.id == param.category){ return true; }
                        }), _o = {id: category[0].id, name: category[0].name, count: 0};
                        _o.count = (data && typeof(data.TotalEntryCount) != 'undefined' ? data.TotalEntryCount : 0);
                        $scope.sCategories.push(_o);
                    }, {category: $scope.categories[category].id});
                }
            }
            
            if(!$('.statistic').is(':visible')){
                $('.statistic').slideDown(250);
                $("body").animate({scrollTop: $('.statistic').offset().top - $(window).scrollTop() + 5},"slow");
            }else{
               $('.statistic').slideUp(250);    
            }   
        };
        
        loadJqueryFn();
    });
    
    /*
        @List Controller
        (is declared on Infonodes List Page)
    */
    app.controller('ListController', function($scope, $http, $routeParams, CategoriesService, KeywordsService, InfoNodesService, SoftLinksService){
        var keyword = $routeParams.keyword,
            callback = function(data){
                if(!data.Entries || !data){
                    $scope.keyword = {id: keyword, keyword: keyword};
                    return false;
                }else{
                    $scope.keyword = data.Entries[0];
                }
                
                InfoNodesService.list($scope.keyword.id, function(data){
                    $scope.infobits = data.Entries;
                });
                
                KeywordsService.visit($scope.keyword.id);
                
                SoftLinksService.list($scope.keyword.id, function(data){
                    $scope.softLinksList = data.Entries;
                });
                
                $scope.keywordEdit = function(){
                    modal({
                        type: 'prompt',
                        title: $scope.captions.keywordNameTitle,
                        text:  $scope.captions.keywordNameText + '<p class="muted" style="font-size:10px;">'+ $scope.captions.keywordNameInfo($scope.infobits.length) +'</p>',
                        buttonText: {ok:$scope.captions.ok,yes:$scope.captions.yes,cancel:$scope.captions.cancel},
                        callback: function(e){
                            if(e){
                                KeywordsService.update($scope.keyword.id, {keyword: e}, function(data){
                                    if(data){
                                        location.href = '#/list/' + e;
                                    }else{
                                        modal({type:'error',title:'Error', text:'Something is wrong. Please try again later!'});
                                    }
                                });
                            }
                        }
                    });
                }
                
                $scope.infobitRemove = function(el, id){
                    el = $(el)[0];
                    modal({title: $scope.captions.confirmation, type: 'confirm', text: $scope.captions.removeConfirmationText, buttonText: {ok:$scope.captions.ok,yes:$scope.captions.yes,cancel:$scope.captions.cancel} ,callback: function(e){
                            if(e){
                                InfoNodesService.delete(id);
                                $(el.currentTarget).closest('.item').slideUp(250, function(){
                                    $(this).remove();
                                });
                            }
                        }
                    });
                }
                
                $scope.toggleStar = function(el, id){
                    InfoNodesService.star(id, function(data){
                        var notifyOpts = {
                            title: null,
                            message: null,
                            icon: null,
                        };
                        switch(data.status){
                            case 'starred':
                                notifyOpts = {
                                    title: $scope.captions.message,
                                    message: $scope.captions.addFavMsg,
                                    icon: '<i class="fa fa-star" style="color:#FFD200"></i>',
                                    count: 1
                                }  
                            break;
                            case 'unstarred':
                                notifyOpts = {
                                    title: $scope.captions.message,
                                    message: $scope.captions.remFavMsg,
                                    icon: '<i class="fa fa-star-o"></i>',
                                    count: -1
                                }  
                            break;
                            case false:
                                return false;
                                notifyOpts = {
                                    title: $scope.captions.message,
                                    message: $scope.captions.addFavAllreadyMsg,
                                    icon: '<i class="fa fa-paper-plane"></i>',
                                    count: 0
                                }  
                            break;
                        }
                        
                        notify({
                            type: 'default',
                            title: notifyOpts.title,
                            message: notifyOpts.message,
                            position: {x: "right", y: "bottom"},
                            icon: notifyOpts.icon,
                            autoHide: true,
                            delay: 'auto',
                            overflowHide: true
                        });
                        
                        $(el.currentTarget).find('span').text( parseFloat($(el.currentTarget).find('span').text()) + notifyOpts.count );
                    });
                }

            };
        
        KeywordsService.find(keyword, 'EXACT_KEYWORD', callback);
        
        loadJqueryFn();
    });
    
    /*
        @AddFormController Controller
        (is declared on Add, Edit, Duplicate Infodes Page)
    */
    app.controller('AddFormController', function($scope, $http, $routeParams, CategoriesService, KeywordsService, InfoNodesService, _zhType){
        CategoriesService.list(function(data){
            $scope.categories = data.Entries; 
        });
        if($routeParams.infobitId){
            var callback = function(data){
                $scope.keyword = {keyword:$scope.infobit.keyword};
                $scope.post_category = $scope.infobit.category;
                $scope.post_text = $scope.infobit.content;

                if(_zhType == 'edit'){
                    $scope.page_title = $scope.captions.editEntry;
                    $scope.date = $scope.infobit.createdTime;
                    $scope.last_change = new Date();
                    $scope.post_user = $scope.infobit.owner;
                }else if(_zhType == 'duplicate'){
                    $scope.page_title = $scope.captions.newEntry;
                    $scope.date = new Date();
                }
                setTimeout(function(){$('textarea._4aS').trigger('autosize.resize')}, 10);
            }
            
            InfoNodesService.get($routeParams.infobitId, function(data){
                if(!data){ location.href = '#/'; return false; }
                $scope.infobit = data.Entries[0];
                callback(data);
            });
        }else{
            $scope.page_title = $scope.captions.newEntry;
            $scope.date = new Date();
            
            var callback = function(data){
                if(data && data.Entries){
                    $scope.keyword = data.Entries[0];
                }else{
                    $scope.keyword = {id:null, keyword: $routeParams.keyword}
                    if(_zhType == 'new'){
                        $('input[data-id="khd3kp"]').removeAttr('readonly').removeAttr('disabled');   
                    }
                }
            }
            KeywordsService.find($routeParams.keyword, 'EXACT_KEYWORD', callback)
        }
        
        $scope.submitData = function(){
            $('button:submit').attr('disabled','disabled');
            
            var data = {
                category: $scope.post_category,
                content: $scope.post_text,
            }
            if(!$scope.keyword.id || $scope.keyword.id == 0 || $scope.keyword.id == null){
                $scope.keyword.keyword = $('input[data-id="khd3kp"]').val();
                data.keywordText = $scope.keyword.keyword;
            }else{
                data.keyword = $scope.keyword.id;
            }
            
            switch(_zhType){
                case 'new':
                   InfoNodesService.create(data, function(data){
                        modal({type:'success', title: $scope.captions.success, text: $scope.captions.nodeSCreatedT+'.', buttonText: {ok:$scope.captions.ok,yes:$scope.captions.yes,cancel:$scope.captions.cancel}, autoclose: true, callback: function(){location.href='#/list/' + $scope.keyword.keyword;}
                        });
                        $('button:submit').removeAttr('disabled');
                    }); 
                break;
                case 'duplicate':
                    data.keyword = $scope.infobit.keyword;
                    delete data.keywordText;
                    KeywordsService.find(data.keyword, 'EXACT_KEYWORD', function(result){
                        if(result && result.Entries){
                            data.keyword = result.Entries[0].id;
                            InfoNodesService.create(data, function(data){
                                modal({type:'success', title: $scope.captions.success, text: $scope.captions.nodeSCreatedT+'.', buttonText: {ok:$scope.captions.ok,yes:$scope.captions.yes,cancel:$scope.captions.cancel}, autoclose: true, callback: function(){location.href='#/list/' + $scope.keyword.keyword;}
                                });
                                $('button:submit').removeAttr('disabled');
                            });
                        }
                    });
                break;
                case 'edit':
                    delete data.keywordText;
                    delete data.keyword;
                    InfoNodesService.update($scope.infobit.id, data, function(){
                        modal({type:'success', title: $scope.captions.success, text: $scope.captions.nodeSEditedT+'.', buttonText: {ok:$scope.captions.ok,yes:$scope.captions.yes,cancel:$scope.captions.cancel}, autoclose: true, callback: function(){location.href='#/list/' + $scope.keyword.keyword;}
                        });
                        $('button:submit').removeAttr('disabled');
                    });
                break;
            }
        }
        
        loadJqueryFn();
    });
    
    /*
        Application Services
        (custom ng Factories for keywords, infobits, categories, softlinks, users and others)
    */
    
    //Categories Service
    app.service('CategoriesService', function($http){
        this.list = function(callback){
           $http.get('/projectile/rest/api/json/0/keywordcategories').success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }); 
        }
        
        this.find = function(pattern, callback){
            $http.get('/projectile/rest/api/json/0/keywordcategories').success(function(r) {
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    var matches = r.Entries.filter(function(entry){
                        return (!isNaN(pattern) ? entry.id : entry.name) == pattern;
                    })[0];
                    callback(matches);   
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });
        }
        
        this.get = function(id, callback){
            $http.get('/projectile/rest/api/json/0/keywordcategories/' + id).success(function(r) {
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};   
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });
        }
    });
    
    //Keywords Service
    app.service('KeywordsService', function($http){
        this.list = function(callback){
           $http.get('/projectile/rest/api/json/0/keywords').success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }); 
        }
        
        this.find = function(d, searchTarget, callback){
            $http.get('/projectile/rest/api/json/0/keywords?searchMode=STRING&searchTarget='+ (!searchTarget ? 'FULLTEXT' : searchTarget) +'&searchText=' + d).success(function(r) {
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};   
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });
        }
        
        this.get = function(id, callback){
            $http.get('/projectile/rest/api/json/0/keywords/' + id).success(function(r) {
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });
        }
        
        this.update = function(id, data, callback){
            $http.put('/projectile/rest/api/json/0/keywords/' + id, data).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });   
        }
        
        this.visit = function(id, callback){
            $http.post('/projectile/rest/api/json/0/visits', {keyword: id}).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    console.log(r);
                    if(callback){callback(false);}else{return false;};
                }   
            }) 
        }
    });
    
    //InfoNodes Service
    app.service('InfoNodesService', function($http){
        this.list = function(id, callback){
            $http.get('/projectile/rest/api/json/0/infonodes?keyword='+ id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            })
        }
        
        this.get = function(id, callback, data){
            var _uri = '/projectile/rest/api/json/0/infonodes';
            if(data && Object.keys(data).length > 0){
                var i = 0;
                for(e in data){
                    var _t = (i == 0 ? '?' : '&' ),
                        _v = data[e];
                    _uri += _t + e + '=' + _v;
                    i++;
                }
            }else{
                _uri += '/' + id;
            }
            $http.get(_uri).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r,(data ? data : null));}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }) 
        }
        
        this.create = function(data, callback){
            $http.post('/projectile/rest/api/json/0/infonodes', data).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    console.log(r);
                    if(callback){callback(false);}else{return false;};
                }   
            })
        }
        
        this.update = function(id, data, callback){
            $http.put('/projectile/rest/api/json/0/infonodes/' + id, data).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;}
                }else{
                    console.log(r);
                    if(callback){callback(false);}else{return false;}
                }
            })
        }
        
        this.star = function(id, callback){
            //star / unstar action
            $http.post('/projectile/rest/api/json/0/stars', {infoNode: id}).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback({status:'starred'});}else{return true;};
                }else{
                    if(callback){callback({status:false});}else{return false;};
                }   
            })
        }
        
        this.delete = function(id, callback){
            $http.delete('/projectile/rest/api/json/0/infonodes/' + id).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    console.log(r);
                    if(callback){callback(false);}else{return false;};
                }   
            })   
        }
    });
    
    //SoftLinks Service
    app.service('SoftLinksService', function($http){
        this.list = function(id, callback){
            $http.get('/projectile/rest/api/json/0/softlinks?keyword=' + id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            })
        }
        
        this.get = function(id, callback){
            $http.get('/projectile/rest/api/json/0/softlinks/'+ id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }) 
        }
    });
    
    //Users Service
    app.service('UsersService', function($http){
        this.get = function(id, callback){
            $http.get('/projectile/rest/api/json/0/employees/'+ id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            })
        };
    });
    
    //Others Service
    app.service('OthersService', function($http, KeywordsService){
        this.keywordSearchAction = function(data, captions){
            var c = $('._5sB'),
                f = c.find('#searchForm'),
                r = [],
                h = "";
            
            if(!data || data.length < 1){ return false; }
            
            var $toggleLoader = function(){
                    if(f.find('._3sFloader').size() > 0){
                        f.find('._3sFloader').remove();
                    }else{
                        f.append('<span class="_3sFloader"><img src="images/icons/loader.gif" /></span>');   
                    }
                },
                $sarchData = function(data){
                    for(var i in data.Entries){
                        var key = data.Entries[i];
                        var o = {
                            id: key.id,
                            title: key.keyword,
                            url: '#/list/'+key.keyword
                        }
                        r.push(o);
                    } 
                },
                $dataToText = function(){
                    if(r.length > 0){
                        h += '<div class="span6 _5sBr _3cmB srdv1"><p class="muted">'+ captions.searchResultText +': <b>'+ data +'</b></p><hr><ul>';
                        for(var i=0; i< r.length; i++){
                            h += '<li>\
                                    <a href="'+ r[i].url +'" class="ns-underline">'+ r[i].title +'</a>\
                                  </li>';
                        }
                        h += '</ul></div>';
                        h += '<div class="span6 _5sBr _3cmB"><p class="muted">'+ captions.searchNoResults +'?</p><a href="#/add/keyword='+ data +'"><i class="fa fa-plus-circle"></i> '+ captions.addK +': <b>'+ data +'</b></a></div>';

                    }else{
                        h += '<div class="span6 _5sBr _3cmB"><p class="text-error">'+ captions.searchFailText +' <b>'+ data +'</b></p><a href="#/add/keyword='+ data +'"><i class="fa fa-plus-circle"></i> '+ captions.addK +': <b>'+ data +'</b></a></div>';       
                    }  
                },
                $appendText = function(){
                    c.find('._5sBr').remove();
                    c.append($(h).css({marginTop:'0px'}).hide().fadeIn({queue: true, duration: 150}).animate({marginTop: '10px'},{queue:false,duration:150}));   
                },
                $show = function(){
                   if(c.find('._5sBr').size() > 0){
                        c.find('._5sBr').stop(true,true).removeClass('animated').css({marginTop:'0px'}).fadeOut(100, function(){
                            $(this).remove();
                            $appendText();
                        });
                    }else{
                        $appendText();
                    } 
                };
            
            $toggleLoader();
            KeywordsService.find(data, 'FULLTEXT', function(data){
                $sarchData(data);
                $dataToText();
                $show();
                $toggleLoader();
            });
        }
    });
    
    /*
        Application Directives  
        (load jQuery plugins for data in ng-repeat)
    */
    app.directive('mRepeatDirective', function() {
        return function(scope, element, attrs) {
   	        if (scope.$last){
                setTimeout(function(){loadJqueryFn('repeat')},1);
   		    }
  		};
	});
    
    /*
        Application Filters
        (custom ng Filter)
    */
    app.filter('nl2br', function () {
        return function(str, is_xhtml) {
            var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        }
    }).filter('noHTML', function () {
        return function(text) {
            return htmlentities(text);
        }
    }).filter('ucfirst', function () {
        return function(string) {
            return (string ? string.charAt(0).toUpperCase() + string.slice(1) : '');
        }
    }).filter('bbcode', function () {
        return function(text) {
            text = htmlentities(text);
            return text
                .replace(/\[br\]/g, "<br>")
                .replace(/\[h4\](.*?)\[\/h4\]/g, "<h4>$1</h4>")
                .replace(/\[b\](.*?)\[\/b\]/g, "<b>$1</b>")
                .replace(/\[i\](.*?)\[\/i\]/g, "<em>$1</em>")
                .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>")
                .replace(/\[s\](.*?)\[\/s\]/g, "<s>$1</s>")
                .replace(/\[font=(.*?)\]([\s\S]*?)\[\/font\]/g, "<font face=\"$1\">$2</font>")
                .replace(/\[size=(.*?)\]([\s\S]*?)\[\/size\]/g, "<font size=\"$1\">$2</font>")
                .replace(/\[color=(.*?)\]([\s\S]*?)\[\/color\]/g, "<font color=\"$1\">$2</font>")
                .replace(/\[img\](.*?)\[\/img\]/g, "<a href=\"$1\" class=\"lightbox\" data-lightbox-gallery=\"{{'gallery'}}\" target=\"_blank\"><img src=\"$1\" /></a>")
                .replace(/\[code\]([\s\S]*?)\[\/code\]/g, "<kbd>$1</kbd>")
                .replace(/\[blockquote=(.*?)\]([\s\S]*?)\[\/blockquote\]/g, "<blockquote><p>$2</p><small>$1</small></blockquote>")
                .replace(/\[blockquote\]([\s\S]*?)\[\/blockquote\]/g, "<blockquote><p>$1</p></blockquote>")
                .replace(/\[p=(.*?)\]([\s\S]*?)\[\/p\]/g, "<p class=\"$1\">$2</p>")
                .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, "<a href=\"$1\" target=\"_blank\">$2</a>")
                .replace(/\[web\|(.*?)\]/g, "<a href=\"$1\" target=\"_blank\">$1</a>")
                .replace(/\[doc\|(.*?)\]/g, "<a href=\"/projectile/start#!/$1\" target=\"_parent\">Link to a Document</a>")
                .replace(/\[center\]([\s\S]*?)\[\/center\]/g, "<center>$1</center>")
                .replace(/\[right\]([\s\S]*?)\[\/right\]/g, "<div class=\"text-right\" style=\"display:inline;\">$1</div>")
                .replace(/\[hr\]/g, "<hr>")
                .replace(/\[(.*?)\]/g, "<a href=\"#/list/$1\" style=\"text-decoration:underline\">$1</a>");
            }
    });
    
    /*
        Application Functions
        (custom ng Functions)
    */
    function htmlentities(t){
        if(!t){return '';}
        return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    }
    
    function inIframe(){
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    
    function isoDateTime(){
        var d = new Date(),
            date = d.toISOString().slice(0,19);
        return date;
    }
    
    function getParameterByName(name, hash) {
        if(!name){ return; }
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec((!hash ? location.search : location.hash));
        return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    function loadJqueryFn(k){
        if(k == 'all'){
            return true;
        }
        if(k == 'repeat'){
            $('*[data-title]').tipsy({arrow:'center'});
            $('a.lightbox').iLightbox();
            
            var scrollToInfoNode = function(){
                var $hash_link = location.hash;
                if($hash_link.search(/\#\/list\//) > -1 && getParameterByName('infoNodeId', true)){
                    var $param = getParameterByName('infoNodeId', true),
                        $item = $('._5lBp > li[data-item-id^="'+$param+'"]');
                    if($item.size() > 0){
                        $item.css('opacity','1').css('background-color','#FFF8D0');
                        $("body").animate({scrollTop: $item.offset().top - 15}, "slow", function(){
                            $item.css('background-color','#fff');
                        });
                    }
                }
            }
            scrollToInfoNode();
            
            return true;
        }
        
        $('*[data-title]').tipsy({arrow:'center'});
        
        $('a.lightbox').iLightbox();
	
	    /* form */
		$('textarea._4aS').autosize().bbCode();
        
        $('textarea._4aS[maxlength]').on("keyup focus input propertychange", function (e) {
            var maxlength = $(this).attr('maxlength'),
                numberOfLineBreaks = ($(this).val().match(/\n/g)||[]).length,
                left = maxlength - $(this).val().length - numberOfLineBreaks,
                left = left < 0 ? 0 : left;
            if($(this).next('span.help-block').size() == 0){
                $(this).after('<span class="help-block pull-right">Characters left: '+ left +'</span>'); 
            }else{
                $(this).next('span.help-block').text('Characters left: ' + left);
            }
        });
    }
    //if(!inIframe()){window.location = 'http://google.com'}
})();