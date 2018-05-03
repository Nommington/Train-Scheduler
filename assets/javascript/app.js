//$("document").ready(function(){

var config = {
    apiKey: "AIzaSyACjb9YAL9OFfznptYM2Dn8lJokdicq7t4",
    authDomain: "train-schedule-44f87.firebaseapp.com",
    databaseURL: "https://train-schedule-44f87.firebaseio.com",
    projectId: "train-schedule-44f87",
    storageBucket: "train-schedule-44f87.appspot.com",
    messagingSenderId: "1085097793499"
};
firebase.initializeApp(config);

console.log(firebase);

var database = firebase.database();

$("#newTrainBtn").on("click", function(event) {
    event.preventDefault();
  console.log("YASS!");
    var trainName = $("#trainName-input").val().trim();
    var trainDest = $("#trainDest-input").val().trim();
    var trainFreq = $("#trainFreq-input").val().trim();
    var nextArriv = moment($("#nextArriv-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    
  
    
    var newTrain = {
      name: trainName,
      dest: trainDest,
      freq: trainFreq,
      nextArriv: nextArriv
    };
    console.log(newTrain);
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.freq);
    console.log(newTrain.nextArriv);

    return false;

});

//});