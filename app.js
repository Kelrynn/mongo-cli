var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

function editDoc(name, collection){
	//repeat until done.
	var obj = [];
	console.log("Are you adding properties?");
	var choice = prompt("y/n      ");
	if (choice == 'y'){
		console.log("How many?");
		let num = prompt();
		for (let i = 0; i < num; i++) {
			let set = { $set: {}};
			let key = prompt("key: ");
			let value = prompt("value: ");
			set.$set[key] = value;
			console.log(set);
			collection.update({"name": name},set);
			collection.find({"name": name}).toArray(function(err, doc){
     			console.log(doc);
   			 });		
		}
	}
	else {
		console.log("How many?");
		let num = prompt();
		for (let i = 0; i < num; i++) {
			let set = {};
			let key = prompt("key: ");
			let value = prompt("value: ");
			set[key] = value;
			console.log(set);
			collection.update({"name": name},set);
			collection.find({"name": name}).toArray(function(err, doc){
     			console.log(doc);
   			 });		
		}
	}
}

function commands(db) {
  console.log("Type 'all' and press enter to display all restaurants' names.");
  console.log("Type \<name\> to view a specific restaurant.");
  console.log("Enter 'new' to create a new restaurant.");
  console.log("Enter 'edit' to edit a restaurant.");
  console.log("Enter 'del' to remove a restaurant.");
  var allChoice = prompt();
  if(allChoice == "all"){
    db.find().toArray(function(err, doc){
      console.log(doc);
    });
    console.log();
  } 
  else if (allChoice == 'new'){
  	var name = prompt("Enter a name:");
  	var street = prompt("Enter a street:");
  	var zip = prompt("Enter a zipcode:");
  	var yelp = prompt("Enter a yelp:");
  	db.insert({"name": name,"address": {"street" : street,"zipcode" : Number(zip)},"yelp": yelp});
  	console.log("Added new restaurant:");
  	db.find({name: name}).toArray(function(err, doc){
      console.log(doc);
    });
    console.log();

  }
  else if (allChoice == "edit"){
  	var doc = prompt("Enter name of document you wish to update: ");
  	editDoc(doc, db);

  }
  else if (allChoice == 'del'){
  	console.log("Enter name of restaurant you wish to delete.");
  	var docu = prompt();
  	db.remove({name: docu});
  	console.log("Document removed.\n");

  }
  else {
    db.find({name: allChoice}).toArray(function(err, doc){
      console.log(doc);
    });
  }
}

mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  commands();
});



