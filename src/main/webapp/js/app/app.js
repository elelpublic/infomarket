/*
 * -------------------------------
 * Infomarket App | AngularJS 
 * -------------------------------
*/
(function(){
    /*
        Application Initialization
    */
    var app = angular.module('infomarket', ['ngRoute', 'ngSanitize']);
    var Root = inIframe() ? '/projectile/apps/infomarket/' : '/infomarket/',
    	restBase = inIframe() ? '/projectile/restapps/infomarket/' : '/infomarket/rest/',
        getLinkURI = '/projectile/start#!/app/infomarket',
        bsm = window.top ? window.top.bsm : window.bsm,
        clientId = bsm ? bsm.clientId : '0',
        flyerVersion = '1.2.7';
    
    window.Root = Root;
    window.flyerVersion = flyerVersion;

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
        .when('/add/', {
            templateUrl: Root + 'templates/add_page.html', 
            controller:  'AddFormController',
            resolve: {_zhType: function(){return "new";}}
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
    app.controller('MainController', function ($scope, $http, $routeParams, CaptionsService) {
        var captions = {
            newEntry: ["InfoMarket|New entry",""],
            livePreview: ["Tooltip|Preview",""],
            keyword: ["InfoMarket|KeyWord",""],
            keywords: ["InfoMarket|KeyWords",""],
            infoNode: ["InfoMarket|InfoNode",""],
            infoNodes: ["InfoMarket|InfoNodes",""],
            softLink: ["Document|Softlink",""],
            softLinks: ["Document|Softlinks",""],
            category: ["InfoMarket|Category",""],
            categories: ["InfoMarket|Categories",""],
            textLabel: ["Document|Body",""],
            files: ["Tooltip|Files",""],
            submit: ["Tooltip|Save",""],
            message: ["System|Hint",""],
            addFav: ["InfoMarket|Add a star for useful information",""],
            addFavMsg: ["InfoMarket|Infonode was successfully rated",""],
            addFavAllreadyMsg: ["InfoMarket|You cannot assign this star now",""],
            star_unstar: ["InfoMarket|Rate",""],
            getInfobitLink: ["Tooltip|Show external url",""],
            editEntry: ["InfoMarket|Edit info node",""],
            confirmation: ["Tooltip|Confirm",""],
            removeConfirmationText: ["${Phrases:Really delete $0 ?}:::${InfoMarket:InfoNode}",""],
            ok: ["Document|OK",""],
            yes: ["Document|Yes",""],
            no: ["Tooltip|No",""],
            cancel: ["Document|Cancel",""],
            keywordNameTitle: ["InfoMarket|New keyword",""],
            keywordNameText: ["${Phrases:Please enter $0}:::${InfoMarket:a new keyword}",""],
            add: ["Tooltip|Add",""],
            addD: ["${Phrases:Add%20$0}:::${InfoMarket:InfoNode}",""],
            addK: ["${Phrases:Add%20$0}:::${InfoMarket:KeyWord}",""],
            edit: ["Tooltip|Edit",""],
            refresh: ["System|reload",""],
            duplicate: ["Tooltip|Duplicate",""],
            remove: ["Document|Remove",""],
            user: ["InfoMarket|User",""],
            date: ["Document|Date",""],
			created: ["Document|CreatedDate", ""],
            last_change: ["InfoMarket|Last modified",""],
            favEntries: ["InfoMarket|Favourite key words",""],
            recentEntries: ["InfoMarket|Latest key words",""],
            lastNews: ["InfoMarket|News board",""],
            smallStatisticLabel: ["InfoMarket|Total Statistics:",""],
            statistic: ["Tooltip|Statistics",""],
            showRandomText: ["Tooltip|Show random key word",""],
            users: ["Document|Users",""],
            search: ["InfoMarket|Find",""],
            searchPlaceholder: ["InfoMarket|Enter a keyword to search",""],
            sortByDate: ["InfoMarket|Sort by date",""],
            sortByStars: ["InfoMarket|Sort by stars",""],
            sort: ["Tooltip|Sort",""],
            sortInfoNodes: ["InfoMarket|Sort InfoNodes",""],
            searchResultText: ["InfoMarket|Search result",""],
            searchNoResults: ["InfoMarket|Did not find what you were looking for",""],
            searchFailText: ["InfoMarket|No results found for",""],
            success: ["Document|Success",""],
            error: ["System|Error",""],
            nodeSCreatedT: ["${Phrases:$0 was created}:::${InfoMarket:InfoNode}",""],
            nodeSEditedT: ["${Phrases:$0 was saved}:::${InfoMarket:InfoNode}",""],
            leghtLimitLeft: ["System|characters left",""],
            backToTop: ["Tooltip|scroll to start",""],
            files: ["Flyer|Files",""]
        };
        
        $scope.captions = {};
        CaptionsService.get(captions, function(data){
            var i = 0;
            for(key in captions){
                captions[key] = data.Entries[i].translation.replace(/:\s*$/, ""); //removes last :
                i++;
            }
            $scope.captions = captions;
        });
        
        loadJqueryFn('all');
    });
    
    /*
        @FirstPage Controller
        (is declared on First Page)
    */
    app.controller('FirstPageController', function($scope, $http, $routeParams, CategoriesService, KeywordsService, InfoNodesService, StatisticService, OthersService){
        CategoriesService.list(function(data){
            $scope.categories = data.Entries;
        });
        
        KeywordsService.list(function(data){
            $scope.keywords = data;
        });
        
        InfoNodesService.get(null, function(data){
            var lastKeywords = [];
            if(!data.Entries){ return false }
            data.Entries.reverse();
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
        
        StatisticService.get('general',function(data){
            $scope.smallStatistic = [data.Entries[0].keywords, data.Entries[0].infonodes, data.Entries[0].softlinks];
        });
        
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
            if(!$scope.sUsers){
                StatisticService.get('users',function(data){
                    $scope.sUsers = data;
                });
            }
            
            if(!$scope.sCategories){
                StatisticService.get('categories',function(data){
                    $scope.sCategories = data;
                });
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
    app.controller('ListController', function($scope, $http, $routeParams, CategoriesService, KeywordsService, InfoNodesService, SoftLinksService, OthersService){
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
                    /* html render */
                    for(var key in $scope.infobits){
                        var val = $scope.infobits[key];
                        InfoNodesService.htmlRead(val.id, {key: key}, function(data, params){
                            $scope.infobits[params.key].content = data;
                        });
                        OthersService.flyerFolderGet(val.id, {key: key}, function(data, params){
                            if(!data || !data.Entries){return false}
                            $scope.infobits[params.key].flyerFolderId = data.Entries[0].id;
                            OthersService.flyerFolderFilesGet( data.Entries[0].id, function( data ) {
                            	if( data && data.Entries ) {
                            		$scope.infobits[params.key].files = data.Entries;
                            	}
                            } );
                        });
                    }
                });
                
                KeywordsService.visit($scope.keyword.id);
                
                SoftLinksService.list($scope.keyword.id, function(data){
                    $scope.softLinksList = data.Entries;
                });
                
                $scope.getLinkURI = getLinkURI;
                
                $scope.keywordEdit = function(){
                    modal({
                        type: 'prompt',
                        title: $scope.captions.keywordNameTitle,
                        text:  $scope.captions.keywordNameText+':',
                        buttonText: {ok:$scope.captions.ok,yes:$scope.captions.yes,cancel:$scope.captions.cancel},
                        callback: function(e){
                            if(e){
                                KeywordsService.update($scope.keyword.id, {keyword: e}, function(r){
                                    if( r.StatusCode && r.StatusCode.CodeNumber == 0 ){
                                        location.href = '#/list/' + e;
                                    } else {
                                        modal({type:'error',title:$scope.captions.error, text:r.Message});
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
                                InfoNodesService.delete(id, function( r ) {
                                    if( !r.StatusCode || r.StatusCode.CodeNumber != 0 ) {
                                        modal({title: $scope.captions.error, type:'error', text: r.Message});   
                                    }
                                });
                                
                                $(el.currentTarget).closest('.item').slideUp(250, function(){
                                    $(this).remove();
                                });
                            }
                        }
                    });
                }
                
                $scope.toggleExterURLShow = function(el){
                    el.stopPropagation(); el.preventDefault();
                    var b = '._3tFuT-box',
                        el = el.currentTarget,
                        parent = $(el).closest('li'),
                        href = window.location.origin + $(el).attr('href'),
                        boxInP = parent.find(b),
                        rem = function(){ $(b).fadeOut("fast", function(){$(b).remove()}) },
                        box = $('<div class="_3tFuT-box"><input type="text" readonly value="" /><a class="_3tFuT-closeBtn"><i class="fa fa-times"></i></a></div>');
                    
                    if(boxInP.size() > 0){
                        rem();
                        return;
                    }
                    
                    $(b).remove();
                    box.on('click','._3tFuT-closeBtn', function(){
                        rem();
                    });
                    parent.append(box.fadeIn("fast"));
                    box.find('input').val(href).focus().select().scrollLeft(0).on('click', function(){
                        $(this).focus().select().scrollLeft(0);
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
                            position: {x: "right", y: "top"},
                            icon: notifyOpts.icon,
                            autoHide: true,
                            theme: 'dark-theme',
                            delay: 'auto',
                            overflowHide: true
                        });
                        
                        $(el.currentTarget).find('span').text( parseFloat($(el.currentTarget).find('span').text()) + notifyOpts.count );
                    });
                }
                
                $scope.getFiles = function(id, scope){
                    if(!$scope.infobits || typeof id == "undefined"){ return false }else{
                        for(var key in $scope.infobits){
                            if (key === 'length' || !$scope.infobits.hasOwnProperty(key)) continue;
                            if(id == $scope.infobits[key].id){
                                id = key;
                                break;
                            }
                        }
                    }
                    if(!$scope.infobits[id] || !$scope.infobits[id].files){return false}
                    var files = $scope.infobits[id].files;
                    if(!files || !files.length){ return false }
                    if(scope && scope == 'count'){
                        return files.length;
                    }
                    
                    var data = "", fileTypes = [
                        {ext: ['xlk','xls','xlsb','xlsm','xlsx'], class: 'file-excel'},
                        {ext: ['doc','docx','dot','dotx','dotm'], class: 'file-word'},
                        {ext: ['ppt','pptx','pps','ppsx','pot'], class: 'file-powerpoint'},
                        {ext: ['pdf'], class:'file-pdf'},
                        {ext: ['jpg','jpeg','png','gif','bmp','ico','psd','tga'], class:'file-image'},
                        {ext: ['zip','rar','tar','gz','7z','jar'], class:'file-archive'},
                        {ext: ['txt','json','xml','log','cfg','diff','ini'], class:'file-text'},
                        {ext: ['html','css','js','php','java','bat','sh','inf','cmd','vbs','jsp','csv'], class:'file-code'}
                    ];
                    for(var i = 0; i<files.length; i++){
                        var file = files[i],
                            ext = file.file.split(".").pop().toLowerCase(),
                            name = file.file,
                            id = file.id.split("-").slice(1).join('-'),
                            url = restBase + 'api/binary/' + clientId + '/filerevisions/' + file.folder + '-CURRENT-' + id,
                            cls = fileTypes.filter(function(v) {
                                    return v.ext.indexOf(ext) > -1;
                            })[0];
                        cls = (cls ? cls : {class: 'file'});
                        data += '<li><a href="'+url+'" class="ns-underline" target="_blank"><i class="fa fa-'+cls.class+'-o"></i>'+name+'</a></li>';
                    }
                    return data;
                }

            };
        
        KeywordsService.find(keyword, 'EXACT_KEYWORD', callback);
        
        loadJqueryFn();
    });
    
    /*
        @AddFormController Controller
        (is declared on Add, Edit, Duplicate Infodes Page)
    */
    app.controller('AddFormController', function($scope, $http, $routeParams, CategoriesService, KeywordsService, InfoNodesService, OthersService, _zhType){
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
                    $scope.page_title_icon = 'fa-pencil-square-o';
                    $scope.date = $scope.infobit.createdTime;
                    $scope.last_change = new Date();
                    $scope.post_user = $scope.infobit.owner;
                    OthersService.flyerFolderGet($routeParams.infobitId, {}, function(data){
                    	// no reply
                        if( !data ) { return false }
                        // no folder -> create new one
                        if( !data.Entries && data.StatusCode && data.StatusCode.CodeNumber == 0 ) {
                            OthersService.flyerFolderCreate( $routeParams.infobitId, function( data ) {
                                if( data.StatusCode && data.StatusCode.CodeNumber == 0 ) {
                                	$scope.isPersistent = true;
                                    $scope.flyerFolderId = data.Entries[0].id;
                                }
                            } );
                        }
                        if( data.Entries ) {
                            $scope.isPersistent = true;
                            $scope.flyerFolderId = data.Entries[0].id;
                        }
                    });
                }else if(_zhType == 'duplicate'){
                    $scope.page_title = $scope.captions.newEntry;
                    $scope.page_title_icon = 'fa-files-o';
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
            $scope.page_title_icon = 'fa-plus-circle';
            $scope.date = new Date();
            
            var callback = function(data){
                if(data && data.Entries){
                    $scope.keyword = data.Entries[0];
                }else{
                    $scope.keyword = {id:null, keyword: $routeParams.keyword}
                    if(_zhType == 'new'){
                        setTimeout(function(){
                            $('input[data-id="khd3kp"]').attr('placeholder', $scope.captions.keywordNameTitle).removeAttr('readonly').removeAttr('disabled').select();
                        }, 10);
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
                        notify({type:'alert', position: {x: "right", y: "top"}, title: $scope.captions.message, message: $scope.captions.nodeSCreatedT+'.', autoHide: true, theme: "dark-theme", closeBtn: false});
                        //location.href='#/list/' + $scope.keyword.keyword;
                        location.href = '#/edit/' + data.Entries[0].id;
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
                                notify({type:'alert', position: {x: "right", y: "top"}, title: $scope.captions.message, message: $scope.captions.nodeSCreatedT+'.', autoHide: true, theme: "dark-theme", closeBtn: false});
                                //location.href='#/list/' + $scope.keyword.keyword;
                                location.href = '#/edit/' + data.Entries[0].id;
                                $('button:submit').removeAttr('disabled');
                            });
                        }
                    });
                break;
                case 'edit':
                    delete data.keywordText;
                    delete data.keyword;
                    InfoNodesService.update($scope.infobit.id, data, function( r ){
                        if( r.StatusCode && r.StatusCode.CodeNumber == 0 ) {
                            notify({type:'alert', position: {x: "right", y: "top"}, title: $scope.captions.message, message: $scope.captions.nodeSEditedT+'.', autoHide: true, theme: "dark-theme", closeBtn: false});
                            location.href='#/list/' + $scope.keyword.keyword;
                        }
                        else {
                            modal({title: $scope.captions.error, type:'error', text: r.Message});
                        }
                        $('button:submit').removeAttr('disabled');
                    });
                break;
            }
        }
        
        //CTRL+S to save
        $(window).bind('keydown', function(event) {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':
                    event.preventDefault();
                    $('button:submit').trigger("click")
                break;
                }
            }
        });
        
        loadJqueryFn();
    });
    
    /*
        Application Services
        (custom ng Factories for keywords, infobits, categories, softlinks, users and others)
    */
    
    //Categories Service
    app.service('CategoriesService', function($http, AjaxService){
        this.list = function(callback){
           AjaxService.send('get', 'api/json/' + clientId + '/keywordcategories').success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }); 
        }
        
        this.find = function(pattern, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/keywordcategories').success(function(r) {
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
            AjaxService.send('get', 'api/json/' + clientId + '/keywordcategories/' + id).success(function(r) {
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};   
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });
        }
    });
    
    //Keywords Service
    app.service('KeywordsService', function($http, AjaxService){
        this.list = function(callback){
            AjaxService.send('get', 'api/json/' + clientId + '/keywords').success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }); 
        }
        
        this.find = function(d, searchTarget, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/keywords?searchMode=STRING&searchTarget='+ (!searchTarget ? 'FULLTEXT' : searchTarget) +'&searchText=' + encodeURIComponent(d)).success(function(r) {
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};   
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });
        }
        
        this.get = function(id, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/keywords/' + id).success(function(r) {
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            });
        }
        
        this.update = function(id, data, callback){
            AjaxService.send('put',  'api/json/' + clientId + '/keywords/' + id, data).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(r);}else{return r;};
                }
            });   
        }
        
        this.visit = function(id, callback){
            AjaxService.send('post', 'api/json/' + clientId + '/visits', {keyword: id}).success(function(r){
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
    app.service('InfoNodesService', function($http, AjaxService){
        this.list = function(id, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/infonodes?keyword='+ id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            })
        }
        
        this.get = function(id, callback, data){
            var _uri = 'api/json/' + clientId + '/infonodes';
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
            AjaxService.send('get', _uri).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r,(data ? data : null));}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }) 
        }
        
        this.create = function(data, callback){
            AjaxService.send('post', 'api/json/' + clientId + '/infonodes', data).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    console.log(r);
                    if(callback){callback(false);}else{return false;};
                }   
            })
        }
        
        this.update = function(id, data, callback){
            AjaxService.send('put',  'api/json/' + clientId + '/infonodes/' + id, data).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;}
                }else{
                    console.log(r);
                    if(callback){callback(r);}else{return r;}
                }
            })
        }
        
        this.star = function(id, callback){
            //star / unstar action
            AjaxService.send('post', 'api/json/' + clientId + '/stars', {infoNode: id}).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback({status:'starred'});}else{return true;};
                }else{
                    if(callback){callback({status:false});}else{return false;};
                }   
            })
        }
        
        this.delete = function(id, callback){
            AjaxService.send('delete', 'api/json/' + clientId + '/infonodes/' + id).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    console.log(r);
                    if(callback){callback(r);}else{return r;};
                }   
            })   
        }
        
        this.htmlRead = function(id, params, callback){
            AjaxService.send('get', 'api/html/' + clientId + '/infonodes/' + id).success(function(r){
                if(callback){callback(r, params);}else{return true;}
            })  
        }
    });
    
    //SoftLinks Service
    app.service('SoftLinksService', function($http, AjaxService){
        this.list = function(id, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/softlinks?keyword=' + id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            })
        }
        
        this.get = function(id, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/softlinks/'+ id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            }) 
        }
    });
    
    //Users Service
    app.service('UsersService', function($http, AjaxService){
        this.get = function(id, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/employees/'+ id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            })
        };
    });
    
    //Captions Service
    app.service('CaptionsService', function($http, AjaxService){
        this.get = function(captions, callback){
            var data = "",
                first = true;
            for(key in captions){
                var value = captions[key],
                    param = (first ? '?' : '&');
                data += param + 'id=' + value[0];
                first = false;
            }
            AjaxService.send('get', 'api/json/' + clientId + '/captions' + data).success(function(data){
                callback(data);
            });  
        }
    });
    
    //Statistic Service
    app.service('StatisticService', function($http, AjaxService){
        this.get = function(type, callback){
            switch(type){
                case 'general':
                    AjaxService.send('get', 'api/json/' + clientId + '/infomarketstatisticss/10').success(function(data){
                        callback(data);
                    });
                break;
                case 'categories':
                    AjaxService.send('get', 'api/json/' + clientId + '/topentries?topList=CATEGORY').success(function(data){
                        callback(data);
                    });
                break;
                case 'users':
                    AjaxService.send('get', 'api/json/' + clientId + '/topentries?topList=AUTHOR').success(function(data){
                        callback(data);
                    });
                break;
            }
        }
    });
    
    //Others Service
    app.service('OthersService', function($http, KeywordsService, AjaxService){
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
                        h += '<div class="span6 _5sBr _3cmB"><p class="muted">'+ captions.searchNoResults +'?</p><a href="#/add/keyword='+ data +'"><i class="fa fa-plus-square"></i> '+ captions.addK +': <b>'+ data +'</b></a></div>';

                    }else{
                        h += '<div class="span6 _5sBr _3cmB"><p class="text-error">'+ captions.searchFailText +': <b>'+ data +'</b></p><a href="#/add/keyword='+ data +'"><i class="fa fa-plus-square"></i> '+ captions.addK +': <b>'+ data +'</b></a></div>';       
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
        };
        this.flyerFolderGet = function(id, params, callback){
            AjaxService.send('get', 'api/json/' + clientId + '/folders?name=^.|InfoMarket|InfoNode|1|' + id).success(function(r){
                if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                    if(callback){callback(r, params);}else{return true;};
                }else{
                    if(callback){callback(false);}else{return false;};
                }
            })   
        };
        this.flyerFolderCreate = function( id, callback ) {
            AjaxService.send('post', 'api/json/' + clientId + '/folders', {link: '^.|InfoMarket|InfoNode|1|' + id}).success(function(r){
               if(r.StatusCode && r.StatusCode.CodeNumber == 0){
                   if(callback){callback(r);}else{return true;};
              }else{
                  if(callback){callback(r);}else{return r;};
              }   
            })
        };
        this.flyerFolderFilesGet = function( id, callback ) {
            AjaxService.send( 'get', 'api/json/' + clientId + '/filehistories?folder=' + id ).success( function( r ) {
        		if( r.StatusCode && r.StatusCode.CodeNumber == 0 ) {
        			if( callback ) { callback( r ); } else { return true; };
        		}
        		else {
        			if( callback ) { callback( r ); } else { return false; };
        		}
        	} );
        }
    });
    
    //Ajax Service
    app.service('AjaxService', function($http){
        this.send = function(_method, _uri, _data){
            return $http[_method](
                _uri ? restBase + _uri : null,
                _data ? _data : { params: null },
                { params: null }
            ).error(function(a,b){
                if(b == 401){
                    window.location = Root + '404.html?statusCode=' + b;
                }
            });
        };
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
                .replace(/\[web\|(.*?)\]/g, "<a href=\"$1\" target=\"_blank\">$1</a>")
                .replace(/\[doc\|(.*?)\]/g, "<a href=\"/projectile/start#!/$1\" target=\"_parent\">Link to a Document</a>")
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
    
    function backToTopFn(){
        $(window).scroll(function(){;
            if($(window).scrollTop() > Math.floor($(window).height() / 2.5) && $(window).height() > 100){
                $('.scrollUpDownBtn').fadeIn(250);  
            }else{
                $('.scrollUpDownBtn').stop(true).fadeOut(250);   
            }
        });
        $('.scrollUpDownBtn').on('click', function(e){
            e.preventDefault();
            $("body").stop(true).animate({scrollTop: 0}, 'fast');
        });
    }
    
    function scrollToInfoNode(){
        var $hash_link = location.hash;
        if($hash_link.search(/\#\/list\//) > -1 && getParameterByName('infonodeId', true)){
            var $param = getParameterByName('infonodeId', true),
                $item = $('._5lBp > li[data-item-id^="'+$param+'"]');
            if($item.size() > 0){
                $item.css('opacity','1').css('background-color','#FFF8D0');
                $("body").animate({scrollTop: $item.offset().top - 15}, "slow", function(){
                    $item.css('background-color','#fff');
                });
            }
        }
    }
    
    function loadJqueryFn(k){
        if(k == 'all'){
            return true;
        }
        if(k == 'repeat'){
            $('*[data-title]').tipsy();
            $('a.lightbox').iLightbox();
            
            
            /* infonode files toglleShow */
            $(".item").on('click', '._4lBp-attc', function (e) {
                e.preventDefault();
                $(this).closest('.item').find('._5lBp-attaches').slideToggle("fast");
                return true;
            });
            
            scrollToInfoNode();
            
            return true;
        }
        
        /* enable tipsy */
        $('*[data-title]').tipsy();
        
        /* enable lightbox */
        $('a.lightbox').iLightbox();
	
	    /* enable textarea autosize & kAutoComplete & BBCodes */
	    $('textarea._4aS').autosize().kAutoComplete({url: restBase + 'api/json/' + clientId + '/keywords'}).bbCode();
        
        /* enable characters length counter */
        $('textarea._4aS[maxlength]').on("keyup focus input propertychange", function (e) {
            var maxlength = $(this).attr('maxlength'),
                numberOfLineBreaks = ($(this).val().match(/\n/g)||[]).length,
                left = maxlength - $(this).val().length - numberOfLineBreaks,
                left = left < 0 ? 0 : left;
            
            $(this).next('span.help-block').find('i').text(left);
            $(this).next('span.help-block').slideDown(250)
        });
        
        /* enable backToTop Button */
        backToTopFn();
        
        //remove tipsy {Bug}
        $(".tipsy").remove();
    }
    //if(!inIframe()){window.location = 'http://google.com'}
})();