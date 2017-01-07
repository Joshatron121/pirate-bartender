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
		$('.answers').html('<li class="yes">Yarr</li><li class="no">No, that be for the dogs o\' the sea!</li>')
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
			if (drink === '') {
				drink += ingredient;
			} else if (num == masterPantry.length - 1) {
				drink += ', and a ' + ingredient;
			} else if (num < masterPantry.length) {
				drink += ', ' + ingredient;
			}
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
	
	$('.answers').on('click', 'li', function(event){
		event.preventDefault();
		if ($(this).text() == 'Arr! Ye have fantastic taste! Another!' || $(this).text() == 'Oh, good point! Let\'s try again!'){
			initialize();
		} else {
			if (answered < masterDrinkList.length) {
				if ($(this).text() == 'Yarr') {
					masterDrinkList[answered].addPantry();
				};
				masterDrinkList[answered].addQuestion();
				answered++;
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