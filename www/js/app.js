// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])
.run(['$rootScope', '$ionicPlatform', '$cordovaPush', 
  function ($rootScope, $ionicPlatform, $cordovaPush) {
   
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
 
        var iosConfig = {
            'badge': true,
            'sound': true,
            'alert': true,
          };
 
        $cordovaPush.register(iosConfig).then(function(result) {
          // Success -- send deviceToken to server, and store for future use
          console.log('result: ' + result)
          $rootScope.deviceToken = result;
          //$http.post('http://server.co/', {user: 'Bob', tokenID: result.deviceToken})
        }, function(err) {
          alert('Registration error: ' + err)
        });
 
 
        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
          if (notification.alert) {
            navigator.notification.alert(notification.alert);
          }
 
          if (notification.sound) {
            var snd = new Media(event.sound);
            snd.play();
          }
 
          if (notification.badge) {
            $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
              // Success!
            }, function(err) {
              // An error occurred. Show a message to the user
            });
          }
        });
  });
}]);
