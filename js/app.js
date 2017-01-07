$(function(){
	// These variables are initialized at the beginning, all but masterDrinkList will be reinialized below, since that doesn't change.
	var masterDrinkList = [];
	var masterPantry = [];
	var answered = 0;
	var drink = '';

	// Reinitializes the above variables to ensure that they are blank for starting a new drink.
	var initialize = function(){
		masterPantry = [];
		answered = 0;
		drink = '';
		masterDrinkList[0].addQuestion();
		$('.answers').html('<li class="yes">Yarr</li><li class="no">No, that be for the dogs o\' the sea!</li>')
	}

	// This is the Constructor Function which creates each drinktype (salty, strong, etc.) It will eventually build a PantryItem if this is chosen as something they like by the user.
	var DrinkType = function(question, ingredients) {
		this.question = question;
		this.ingredients = ingredients;
		// Used to build the quesetion that the bartender is asking.
		this.addQuestion = function(){
			$('.question').text(question);
		};
		// Will be used to add this type of drink into the pantry later.
		this.addPantry = function(){
			PantryItem.call(this, this.ingredients)
		};
		// Pushes the DrinkType to the masterDrinkList in order to easily access and track the drinks
		masterDrinkList.push(this)
	};

	// Inherits much of it's functionality from the DrinkType and adds in the ability to add an ingredient to the drink
	var PantryItem = function(){
		this.buildDrink = function(num){
			var ingredient = this.ingredients[Math.floor(Math.random()*(this.ingredients.length) - 0)];
			if (drink === '') {
				drink += ingredient;
			} else if (num == masterPantry.length - 1) {
				drink += ', and a ' + ingredient;
			} else if (num < masterPantry.length) {
				drink += ', ' + ingredient;
			}
		}
		// Pushes this PantryItem to the masterPantry array for easy tracking and control
		masterPantry.push(this)
	};
	// Builds the DrinkTypes
	var strong = new DrinkType('Do ye like yer drinks strong?', 
		['glug of rum', 'slug of whisky', 'splash of gin'])
	var salty = new DrinkType('Do ye like it with a salty tang?', 
		['olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
	var bitter = new DrinkType('Are ye a lubber who likes it bitter?',
		['shake of bitters', 'splash of tonic', 'twist of lemon peel']);
	var sweet = new DrinkType('Would ye like a bit of sweetness with yer poison',
		['sugar cube', 'spoonful of honey', 'splash of cola']);
	var fruity = new DrinkType('Are ye one for a fruity finish?',
		['slice of orange', 'dash of cassis', 'cherry on top']);

	// Calls the initiliaize function to make sure everything is correct to start
	initialize();
	
	// On someone clicking one of the LI options
	$('.answers').on('click', 'li', function(event){
		event.preventDefault();
		// check to see what type of message is showing
		if ($(this).text() == 'Arr! Ye have fantastic taste! Another!' || $(this).text() == 'Oh, jolly point! Let\'s give a go\' again!'){
			// If it's a restart option, rerun the initialize function
			initialize();
		} else {
			// if this is chosen as a valid option
			if ($(this).text() == 'Yarr') {
				// add it to the pantry
				masterDrinkList[answered].addPantry();
			};
			// build the next question
			answered++;
			if(answered <= masterDrinkList.length - 1){
				masterDrinkList[answered].addQuestion();
			} else {
				for(var i = 0; i < masterPantry.length; i++) {
					masterPantry[i].buildDrink(i);
				}
				if(drink == '') {
					$('.question').text('Ye have to choose somethin\' or I ain\'t make ye any grog!');
					$('.answers').html('<li class="done">Oh, jolly point! Let\'s give a go\' again!</li>');
				} else {
					$('.answers').html('<li class="done">Arr! Ye have fantastic taste! Another!</li>');
					$('.question').text('Here\'s ye drink. I got ye a ' + drink + '!')
				}
			}
		}
	})
})