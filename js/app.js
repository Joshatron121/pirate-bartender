$(function(){
	var masterDrinkList = [];
	var masterPantry = [];
	var answered = 0;
	var drink = '';
	var PantryItem = function(ingredients){
		ingredients = ingredients
		this.buildDrink = function(){
			if (drink === '') {
				drink += this.ingredients[Math.floor(Math.random()*(this.ingredients.length) - 0)];
			} else {
			}
			console.log(drink)
		}
	};

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

	masterDrinkList[0].addQuestion();

	$('.submit').click(function(event){
		event.preventDefault();
		if(answered <= masterDrinkList.length){
			var response = $('input[name="yesorno"]:checked').val();
			if(response === 'yes') {
				masterPantry.push(masterDrinkList[answered].addPantry()
				}
			};
			answered++;
			
			masterDrinkList[answered].addQuestion();
		} else {
			$('.answers').hide();
			$('.question').text('Here\'s your drink! I got you a')
		}
	})
})

// $(function(){
// 	var questions = {
// 		strong: {
// 			question: 'Do ye like yer drinks strong?',
// 			ingredients: ['glug of rum', 'slug of whisky', 'splash of gin']
// 		},
// 		salty: {
// 			question: 'Do ye like it with a salty tang?',
// 			ingredients: ['olive on a stick', 'salt-dusted rim', 'rasher of bacon']
// 		},2
// 		bitter: {
// 			question: 'Are ye a lubber who likes it bitter?',
// 			ingredients: ['shake of bitters', 'splash of tonic', 'twist of lemon peel']
// 		},
// 		sweet: {
// 			question: 'Would ye like a bit of sweetness with yer poison?',
// 			ingredients: ['sugar cube', 'spoonful of honey', 'splash of cola']
// 		},
// 		fruity: {
// 			question: 'Are ye one for a fruity finish?',
// 			ingredients: ['slice of orange', 'dash of cassis', 'cherry on top']
// 		}
// 	}


// })