var Client = require("ibmiotf");
var q  = require("q");
var bluemix  = require("./bluemix");

var appClientConfig={};
var service = bluemix.getService('iotf-service');

  if(service.credentials){
    appClientConfig = {
      'org' : service.credentials.org,
      'id' : 'smart-water',
      'auth-key' : service.credentials.apiKey,
      'auth-token' : service.credentials.apiToken
    };
  }



var appClient = new Client.IotfApplication(appClientConfig);

var clientiot = {


  connect: function() {
    console.log("[iot] connect to watson iot");
    appClient.connect();

    //setting the log level to 'trace'
    appClient.on("connect", function () {
      console.log("[iot] conected to IOT");
      appClient.subscribeToDeviceStatus();
      appClient.subscribeToDeviceEvents();



  });
    appClient.on("error", function (err) {
      console.log("[iot] Error : "+err);
    });

    // appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
    //     console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
    //     console.log();
    //
    // });

    // appClient.on("deviceStatus", function (deviceType, deviceId, payload, topic) {
    //     console.log("Device status from :: "+deviceType+" : "+deviceId+" with payload : "+payload);
    //       console.log();
    // });

  },
  disconnect: function(){
    appClient.disconnect();
  },

  getDeviceLocation: function(){
    var deferred = q.defer();
    appClient.getDeviceLocation('Android', '57b1900c1b50').then (function onSuccess (response) {
      console.log("Success getDeviceLocation");
      deferred.resolve({"status": 200, "body": response});
    }, function onError (error) {
      console.log("Fail get Device Location");
      deferred.reject({"status": 500, "body": {}, "error": error});
    });
    return deferred.promise;
  },

  getAllHistoricalEvents : function(){
    var deferred = q.defer();
    appClient.getAllHistoricalEvents().then (function onSuccess (response) {
      console.log("Success getAllHistoricalEvents");
      deferred.resolve({"status": 200, "body": response});
    }, function onError (error) {

      console.log("Fail getAllHistoricalEvents");
      deferred.reject({"status": 500, "body": {}, "error": error});
    });
    return deferred.promise;
  },

  getAllDevicesTypes: function () {
    var deferred = q.defer();
    appClient.getAllDeviceTypes().then (function onSuccess (response) {
      console.log("Success getAllDeviceTypes");
      deferred.resolve({"status": 200, "body": response});
    }, function onError (error) {

      console.log("Fail getAllDeviceTypes");
      deferred.reject({"status": 500, "body": {}, "error": error});
    });
    return deferred.promise;
  },

  getDeviceInfo: function() {
    var deferred = q.defer();
    appClient.getDevice('Android', '57b1900c1b50').then (function onSuccess (response) {
      console.log("Success getDeviceInfo");
      deferred.resolve({"status": 200, "body": response});
    }, function onError (error) {
      console.log("Fail getDeviceInfo");
      deferred.reject({"status": 500, "body": {}, "error": error});
    });
    return deferred.promise;
  },

  getDeviceDiagnosticLog: function () {
    var deferred = q.defer();
    appClient.getAllDiagnosticLogs('Android', '57b1900c1b50').then (function onSuccess (response) {
      console.log("Success getAllDiagnosticLogs");
      deferred.resolve({"status": 200, "body": response});
    }, function onError (error) {

      console.log("Fail getDeviceDiagnosticLog");
      deferred.reject({"status": 500, "body": {}, "error": error});
    });
return deferred.promise;
  },
  getDeviceConnectionLogs:function () {
    var deferred = q.defer();
    appClient.getDeviceConnectionLogs('Android', '57b1900c1b50').then (function onSuccess (response) {
          console.log("Success getDeviceConnectionLogs");
          deferred.resolve({"status": 200, "body": response});
      }, function onError (error) {

              console.log("Fail getDeviceConnectionLogs");
              deferred.reject({"status": 500, "body": {}, "error": error});
      });
      return deferred.promise;
  },

  getDataTraffic: function () {
    var deferred = q.defer();
    var startTime = '2014-01-01';
    var endTime =  '2016-11-01';

    appClient.getDataUsage(startTime, endTime).then (function onSuccess (response) {
              console.log("Success getDataUsage");
              deferred.resolve({"status": 200, "body": response});
      }, function onError (error) {

              console.log("Fail getDataUsage");
              deferred.reject({"status": 500, "body": {}, "error": error});
      });
  return deferred.promise;
},

getAllDevicesbyType: function (type) {
  var deferred = q.defer();
  appClient.listAllDevicesOfType(type).then (function onSuccess (response) {
        console.log("Success list All Devices");
        deferred.resolve({"status": 200, "body": response});
    }, function onError (error) {
            console.log("Fail list All Devices");
            deferred.reject({"status": 500, "body": {}, "error": error});
    });
return deferred.promise;
}



};

module.exports = exports = clientiot;
