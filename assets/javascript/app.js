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
    let convertedTtime;
    let nextArrival;
    let minAway;

    //On click event to grab user input and send to the database
    $("#submit").on("click", function (event) {
        event.preventDefault();
        $('#trainname').empty();
        $('#destination').empty();
        $('#traintime').empty();
        $('#frequency').empty();
        
        //collect user input values and remove unecessary spaces
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
    //function to grab values from the database to display in the table
    database.ref().on('child_added', function(childSnapshot) {
        addTrain = childSnapshot.val().train;
        addDest = childSnapshot.val().destination;
        addTtime = childSnapshot.val().train_time;
        addFreq =  childSnapshot.val().frequency;

        //set variables for new rows and column values
        let rows = $('<tr>');
        let colTrain = $('<td>');
        let colDest = $('<td>');
        let colFreq = $('<td>');
        let colNext = $('<td>');
        let colMinto = $('<td>');

        //MOMENT.JS
        //calculate next arrival based on First train and frequency -- First train time plus frequency
        //calculate minutes away based on current time and frequency -- Current Time 
        let currentTime = moment();
        console.log(currentTime);
        convertedTtime = moment(addTtime, "hh:mm").subtract(1, "years");
        console.log(convertedTtime);
        let diffTime = moment().diff(moment(convertedTtime), "minutes");
        let tRemainder = diffTime % addFreq;
        minAway = addFreq - tRemainder;
        nextArrival = moment().add(minAway, "minutes");
        console.log(nextArrival);
        let nextArrivalFormatted = moment(nextArrival).format("hh:mm A");

        //add text to columns
        colTrain.text(addTrain);
        colDest.text(addDest);
        colFreq.text(addFreq);
        colNext.text(nextArrivalFormatted);
        colMinto.text(minAway);

        //append columns to the row
        rows.append(colTrain);
        rows.append(colDest);
        rows.append(colFreq);
        rows.append(colNext);
        rows.append(colMinto);

        //append row to the table body
        $('#tableBody').append(rows);

    })

});