'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG) {
          
          $urlRouterProvider
              .otherwise('access/signin');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/nav/header.js']);
                    }]
                  }
              })
              .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/dashboard.js']);
                    }]
                  }
              })
              .state('app.product', {
                abstract: true,
                url: '/product',
                template: '<div ui-view></div>'
              })
              .state('app.product.list', {
                url: '/list',
                templateUrl: 'tpl/product/product-table.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/product/product_list.js');
                              }
                          );
                      }]
                }
              })
              .state('app.product.add', {
                url: '/new',
                templateUrl: 'tpl/product/product-add.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/product/product_add.js'])
                    }
                  ]
                }
              })
              .state('app.product.edit', {
                url: '/edit/:id',
                templateUrl: 'tpl/product/product-edit.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/product/product_edit.js'])
                    }
                  ]
                }
              })
              .state('app.product.detail', {
                url: '/detail/:id',
                templateUrl: 'tpl/product/product-detail.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/product/product_detail.js'])
                    }
                  ]
                }
              })
              .state('app.product.request', {
                url: '/request/add',
                templateUrl: 'tpl/product/product-request.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/product/product_request.js'])
                    }
                  ]
                }
              })
              .state('app.product.request_detail', {
                url: '/request/detail/:id',
                templateUrl: 'tpl/product/product-request-detail.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/product/product_request_detail.js'])
                    }
                  ]
                }
              })
              .state('app.profile', {
                abstract: true,
                url: '/profile',
                template: '<div ui-view></div>'
              })
              .state('app.profile.detail',{
                url: '/admin/:id',
                templateUrl: 'tpl/user/profile.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/user/profile_detail.js'])
                    }
                  ]
                }
              })
              .state('app.user', {
                abstract: true,
                url: '/user',
                template: '<div ui-view></div>'
              })
              .state('app.user.list', {
                url: '/list',
                templateUrl: 'tpl/user/user-list.html',
                // use resolve to load other dependences
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/user/user_list.js'])
                    }
                  ]
                }
              })
              .state('app.user.detail', {
                url: '/detail/:id',
                templateUrl: 'tpl/user/user-detail.html',
                // use resolve to load other dependences
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/user/user_detail.js'])
                    }
                  ]
                }
              })
              .state('app.trx', {
                abstract: true,
                url: '/transaction',
                template: '<div ui-view></div>'
              })
              .state('app.trx.inventory', { //trx list
                url: '/list',
                templateUrl: 'tpl/trx/trx-list.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/trx/trx_list.js'])
                    }
                  ]
                }
              })
              .state('app.trx.supplies', {
                url: '/supplies',
                templateUrl: 'tpl/trx/trx-supplies.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/trx/trx_list.js'])
                    }
                  ]
                }
              })
              .state('app.trx.detail', {
                url: '/detail/:id',
                templateUrl: 'tpl/trx/trx-detail.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/trx/trx_detail.js'])
                    }
                  ]
                }
              })
              .state('app.trx.detail_supply', {
                url: '/supplies/detail/:id',
                templateUrl: 'tpl/trx/trx-detail-supply.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/trx/trx_detail_supply.js'])
                    }
                  ]
                }
              })
              .state('app.trx.edit', {
                url: '/detail/edit/:id',
                templateUrl: 'tpl/trx/trx-detail-edit.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/trx/edit_detail.js'])
                    }
                  ]
                }
              })
              .state('app.trx.edit_date', {
                url: '/detail/return_date/edit/:id',
                templateUrl: 'tpl/trx/trx-detail-edit-date.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/trx/edit_date.js');
                              }
                          );
                      }]
                }
              })
              .state('app.trx.pending_request', {
                url: '/filter/pending',
                templateUrl: 'tpl/trx/trx-filter-request.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                      return $ocLazyLoad.load(['js/controllers/trx/filter_request.js'])
                    }
                  ]
                }
              })
              .state('app.report', {
                  abstract: true,
                  url: '/report',
                  template: '<div ui-view></div>'
              })
              .state('app.report.product', {
                  url: '/product',
                  templateUrl: 'tpl/report/report-product.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_product.js'])
                      }
                    ]
                  }
              })
              .state('app.report.product_divisi1', {
                url: '/product/filter/development',
                templateUrl: 'tpl/report/report-product-development.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_product.js'])
                      }
                    ]
                  }
              })
              .state('app.report.product_divisi2', {
                url: '/product/filter/communication',
                templateUrl: 'tpl/report/report-product-communication.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_product.js'])
                      }
                    ]
                  }
              })
              .state('app.report.product_divisi3', {
                url: '/product/filter/support',
                templateUrl: 'tpl/report/report-product-support.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_product.js'])
                      }
                    ]
                  }
              })
              .state('app.report.product_divisi4', {
                url: '/product/filter/infrastructure',
                templateUrl: 'tpl/report/report-product-infrastructure.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_product.js'])
                      }
                    ]
                  }
              })
              .state('app.report.product_category1', {
                url: '/product/filter/supplies',
                templateUrl: 'tpl/report/report-product-supplies.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_product.js'])
                      }
                    ]
                  }
              })
              .state('app.report.product_category2', {
                url: '/product/filter/inventory',
                templateUrl: 'tpl/report/report-product-inventory.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_product.js'])
                      }
                    ]
                  }
              })
              .state('app.report.user', {
                url: '/user',
                templateUrl: 'tpl/report/report-user.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_user.js'])
                      }
                    ]
                  }
              })
              .state('app.report.user_divisi1', {
                url: '/user/filter/development',
                templateUrl: 'tpl/report/report-user-development.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_user.js'])
                      }
                    ]
                  }
              })
              .state('app.report.user_divisi2', {
                url: '/user/filter/communication',
                templateUrl: 'tpl/report/report-user-communication.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_user.js'])
                      }
                    ]
                  }
              })
              .state('app.report.user_divisi3', {
                url: '/user/filter/support',
                templateUrl: 'tpl/report/report-user-support.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_user.js'])
                      }
                    ]
                  }
              })
              .state('app.report.user_divisi4', {
                url: '/user/filter/infrastructure',
                templateUrl: 'tpl/report/report-user-infrastructure.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_user.js'])
                      }
                    ]
                  }
              })
              .state('app.report.transaction', {
                url: '/transaction',
                templateUrl: 'tpl/report/report-trx.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_trx.js'])
                      }
                    ]
                  }
              })
              .state('app.report.transaction_divisi1', {
                url: '/transaction/filter/development',
                templateUrl: 'tpl/report/report-trx-development.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_trx.js'])
                      }
                    ]
                  }
              })
              .state('app.report.transaction_divisi2', {
                url: '/transaction/filter/communication',
                templateUrl: 'tpl/report/report-trx-communication.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_trx.js'])
                      }
                    ]
                  }
              })
              .state('app.report.transaction_divisi3', {
                url: '/transaction/filter/support',
                templateUrl: 'tpl/report/report-trx-support.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_trx.js'])
                      }
                    ]
                  }
              })
              .state('app.report.transaction_divisi4', {
                url: '/transaction/filter/support',
                templateUrl: 'tpl/report/report-trx-support.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/report/report_trx.js'])
                      }
                    ]
                  }
              })
              .state('app.iseng', {
                url: '/iseng/:id',
                templateUrl: 'tpl/blocks/iseng.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/nav/iseng.js'])
                      }
                    ]
                  }
              })
              .state('app.latihan',{
                url: '/latihan',
                templateUrl: 'tpl/blocks/latihan.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/nav/latihan.js'])
                      }
                    ]
                  }
              })
              .state('app.ngetest', {
                url: '/ngetest',
                templateUrl: 'tpl/blocks/ngetest.html',
                resolve: {
                  deps: ['$ocLazyLoad',
                      function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/controllers/nav/ngetest.js'])
                      }
                    ]
                }
              })
              .state('app.docs', {
                  url: '/docs',
                  templateUrl: 'tpl/docs.html'
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js'] );
                      }]
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signup.js'] );
                      }]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })
      }
    ]
  );
