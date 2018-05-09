
// Initializing Firebase
var config = {
    apiKey: "AIzaSyAXByXMviZmNgchzCys6O012mZSI7HXZhM",
    authDomain: "test-8e213.firebaseapp.com",
    databaseURL: "https://test-8e213.firebaseio.com",
    projectId: "test-8e213",
    storageBucket: "test-8e213.appspot.com",
    messagingSenderId: "445934896202"
};

firebase.initializeApp(config);

var database = firebase.database();
    
    
$('#submit').on('click', function(event) {
    event.preventDefault();
      
    // grabbing form input
    var nameInput = $("#name-input").val().trim();
    var destInput = $("#destination-input").val().trim();
    var ftimeInput = $("#ftime-input").val().trim();
    var freqInput = $("#frequency-input").val().trim();

    // local objects created to hold train data
    var newTrain = {
        trainName: nameInput,
        trainDest: destInput,
        trainFtime: ftimeInput,
        trainFreq: freqInput
    };

    // new train info pushed to database
    database.ref().push(newTrain);

    console.log(newTrain.trainName);
    console.log(newTrain.trainDest);
    console.log(newTrain.fTime);
    console.log(newTrain.trainFreq);
    

    alert("New trains successfully added");

    // clearing form boxes like a good programmer
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#ftime-input").val("");
    $("#frequency-input").val("");

});
    

// Firebase event for adding new train to database in a new row
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //Store all in variables
    var nameInput = childSnapshot.val().trainName;
    var destInput = childSnapshot.val().trainDest;
    var ftimeInput = childSnapshot.val().trainFtime; //
    var freqInput = childSnapshot.val().trainFreq; //

    console.log(nameInput);
    console.log(destInput);
    console.log(ftimeInput);
    console.log(freqInput);

    // first time pushed back a year
    var ftimeConverted = moment(ftimeInput, "HH:mm").subtract(1, "years"); 

    // Difference between current & first time
    var diffTime = moment().diff(moment(ftimeConverted), "minutes");

    // time apart (remainder)
    var tRemainder = diffTime % freqInput;

    // Minutes until next train
    var tMinutesTillTrain = freqInput - tRemainder;

    /* Next train */
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Adding row to table
    $('#train-table > tbody').append("<tr><td>" + nameInput + "</td><td>" + destInput + "</td><td>" + freqInput + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>")

});