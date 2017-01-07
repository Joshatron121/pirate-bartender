$(function(){
	var masterDrinkList = [];
	var masterPantry = [];
	var answered = 0;
	var drink = '';

	var initialize = function(){
		masterPantry = [];
		answered = 0;
		drink = '';
		masterDrinkList[0].addQuestion();
	}

	var DrinkType = function(question, ingredients) {
		this.question = question;
		this.ingredients = ingredients;
		this.addQuestion = function(){
			$('.question').text(question);
		};
		this.addPantry = function(){
			PantryItem.call(this, this.ingredients)
		};
		masterDrinkList.push(this)
	};

	var PantryItem = function(){
		this.buildDrink = function(num){
			var ingredient = this.ingredients[Math.floor(Math.random()*(this.ingredients.length) - 0)];
			console.log(num, masterPantry.length)
			if (drink === '') {
				drink += ingredient;
			} else if (num == masterPantry.length - 1) {
				drink += ', and a ' + ingredient;
			} else if (num < masterPantry.length) {
				drink += ', ' + ingredient;
			}
			console.log(drink)
		}
		masterPantry.push(this)
	};

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

	initialize();
	
	$('.submit').click(function(event){
		event.preventDefault();
		if ($('.submit').text() == 'Submit'){
			if (answered < masterDrinkList.length - 1) {
				var response = $('input[name="yesorno"]:checked').val();
				if (response === 'yes') {
					masterDrinkList[answered].addPantry();
				};
				answered++;
				masterDrinkList[answered].addQuestion();
			} else {
				for(var i = 0; i < masterPantry.length; i++) {
					masterPantry[i].buildDrink(i);
				}
				$('.answers').hide();
				$('.submit').text('Another!');
				$('.question').text('Here\'s your drink. I got you a ' + drink + '!')
			}
		} else {
			initialize();
			$('.answers').show();
			$('.submit').text('Submit');
		}
	})
})