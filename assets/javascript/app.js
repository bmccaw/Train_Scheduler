$(document).ready(function () {


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
    let nextArrival;
    let minAway;

    //On click event to grab user input and send to the database
    $("#submit").on("click", function (event) {
        event.preventDefault();
        $('#trainname').empty();
        $('#destination').empty();
        $('#traintime').empty();
        $('#frequency').empty();

        addTrain = $("#trainname").val().trim();
        addDest = $("#destination").val().trim();
        addTtime = $("#traintime").val().trim();
        addFreq = $("#frequency").val().trim();

        //push values to the the database in this format
        database.ref().push({
            train: addTrain,
            destination: addDest,
            train_time: addTtime,
            frequency: addFreq,
            dataAdded: firebase.database.ServerValue.TIMESTAMP

        });

        console.log('working');

    });

    database.ref().on('child_added', function(childSnapshot) {
        addTrain = childSnapshot.val().train;
        addDest = childSnapshot.val().destination;
        addTtime = childSnapshot.val().train_time;
        addFreq =  childSnapshot.val().frequency;

        let rows = $('<tr>');
        let colTrain = $('<td>');
        let colDest = $('<td>');
        let colFreq = $('<td>');
        let colNext = $('<td>');
        let colMinto = $('<td>');

        colTrain.text(addTrain);
        colDest.text(addDest);
        colFreq.text(addFreq);
        colNext.text(nextArrival);
        colMinto.text(minAway);

        rows.append(colTrain);
        rows.append(colDest);
        rows.append(colFreq);
        rows.append(colNext);
        rows.append(colMinto);

        $('#tableBody').append(rows);

    })

});