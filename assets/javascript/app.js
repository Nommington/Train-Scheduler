$("document").ready(function(){

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
    var trainName = $("#trainName-input").val().trim();
    var trainDest = $("#trainDest-input").val().trim();
    var trainFreq = $("#trainFreq-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    
  
    
    var newTrain = {
      name: trainName,
      dest: trainDest,
      freq: trainFreq,
      first: firstTrain
    };
    console.log(newTrain);
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.freq);
    console.log(newTrain.first);

    $("#trainName-input").val("");
    $("#trainDest-input").val("");
    $("#trainFreq-input").val("");
    $("#firstTrain-input").val("");

    return false;

});

database.ref().on("child_added", function(snapshot){
  //console.log(snapshot);
  var name = snapshot.val().name;
  var dest = snapshot.val().dest;
  var freq = snapshot.val().freq;
  var first = snapshot.val().first;

  console.log(name);
  console.log(dest);
  console.log(freq);
  console.log(first);

  var minutesLeft = (freq - (moment().diff(moment.unix(first),"minutes")%freq));
  var arrivTime = moment().add(minutesLeft,"m").format("hh:mm A");
  console.log("min til next train " +minutesLeft);
  console.log("next train at " +arrivTime);

  $("tbody").append("<tr><td>"+name+"</td><td>"+dest+"</td><td>every "+freq+" min</td><td>"+arrivTime+"</td><td>"+minutesLeft+" min</td></tr>");
});

});