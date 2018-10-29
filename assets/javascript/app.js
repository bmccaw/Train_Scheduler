$(document).ready(function() {


//Connect to Firebase
var config = {
    apiKey: "AIzaSyAFc2wIna9YCdRZbW8Hu3rUdnSUMbI89Pk",
    authDomain: "train-scheduler-6cf39.firebaseapp.com",
    databaseURL: "https://train-scheduler-6cf39.firebaseio.com",
    projectId: "train-scheduler-6cf39",
    storageBucket: "train-scheduler-6cf39.appspot.com",
    messagingSenderId: "798291269778"
  };
  firebase.initializeApp(config);

//establish global variables
let database = firebase.database();
let addTrain;
let addDest;
let addTtime;
let addFreq;

//On click event to grab user input and send to the database
$("#submit").on("click", function(event){
        event.preventDefault();
    
          addTrain = $("#trainname").val().trim();
          addDest = $("#destination").val().trim();
          addTtime = $("#traintime").val().trim();
          addFreq = $("#frequency").val().trim();
    
          database.ref().push({
              train: addTrain,
              destination: addDest,
              train_time: addTtime,
              frequency: addFreq,
              dataAdded: firebase.database.ServerValue.TIMESTAMP
    
          });
    
    })

});