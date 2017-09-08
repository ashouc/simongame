$(document).ready(setupGame);

var count = 0;
var index = 0;
var idIndex = 0;
var pattern = [];
var patIds = [];
var playInput;
var strict = false;
var power = false;
var start = false;
var gameEnded = false;
var player = false; // Turns to true when it's the player's turn


function setupGame(){
	setupPad('#color1');
	setupPad('#color2');
	setupPad('#color3');
	setupPad('#color4');
	playerInput('#color1');
	playerInput('#color2');
	playerInput('#color3');
	playerInput('#color4');
	startButton();
	restartButton();
	strictButton();
	togglePower();
	setupSoundPlayer();
}

function startButton(){
	$('#start').on('click', function(event){
    if(strict) {
      strict = false;
			$('#count').css('background-color','rgba(43,47,54,1)');
			return restartGame();
    }
		if(power && !start){
			start = true;
			return computerInput();
		}
		if(power && start){
			$('#restart').removeClass('restart').addClass('hidden').html('Restart?');
			return restartGame();
		}
	});
}

function restartButton(){
	$('#restart').on('click',function(event){
		if(gameEnded === true && event.target.innerHTML === 'Restart?') {
			$('#restart').removeClass('restart').addClass('hidden');
			restartGame();
		}
	});
}

function strictButton(){
	$('#strict').on('click', function(event){
		if(power && !strict){
			strict = true;
			$('#count').css('background-color','rgba(242,206,98,1)');
			return restartGame();
		}
		if(power && strict){
			strict = false;
			$('#count').css('background-color','rgba(43,47,54,1)');
			return restartGame();
		}
	});
}

function togglePower(){
	$('#power').on('click', function(event) {
		if(!power) {
			count = 0;
			$('#count p').html(count);
			power = true;
			return;
		}
		if(power) {
			if(strict){
				$('#count').css('background-color','rgba(43,47,54,1)');
			}
			$('#count p').html(' ');
			count = 0;
			index = 0;
			idIndex = 0;
			pattern = [];
			patIds = [];
			playInput;
			strict = false;
			power = false;
			start = false;
			player = false;
			return;
		}
	});
}

function setupSoundPlayer(){
	$('#color1').on('click', function(event) {
		if(power && player){
			var audio1 = $('#audio1')[0];
			audio1.play();
			playInput = '#color1';
		}
	});
	$('#color2').on('click', function(event) {
		if(power && player) {
			var audio2 = $('#audio2')[0];
			audio2.play();
			playInput = '#color2';
		}
	});
	$('#color3').on('click', function(event) {
		if(power && player) {
			var audio3 = $('#audio3')[0];
			audio3.play();
			playInput = '#color3';
		}
	});
	$('#color4').on('click', function(event) {
		if(power && player) {
			var audio4 = $('#audio4')[0];
			audio4.play();
			playInput = '#color4';
		}
	});
}

function setupPad(id){
	$(id)
	.on('mousedown',function() {
		if(power && player) {
			$(this).addClass('highlight');
		}
	})
	.on('mouseup',function() {
		if(power && player) {
			$(this).removeClass('highlight');
		}
	});
}

function computerAudio(){
	if(patIds[idIndex] === '#color1') {
		var audio1 = $('#audio1')[0];
		setTimeout(function(){
			audio1.play();
			computerColoring('#color1', audio1.duration);
			idIndex++;
			return computerAudio();
		},1000);
	} else if(patIds[idIndex] === '#color2') {
		var audio2 = $('#audio2')[0];
		setTimeout(function(){
			audio2.play();
			computerColoring('#color2', audio2.duration);
			idIndex++;
		return computerAudio();
		},1000);
	} else if(patIds[idIndex] === '#color3') {
		var audio3 = $('#audio3')[0];
		setTimeout(function(){
			audio3.play();
			computerColoring('#color3', audio3.duration);
			idIndex++;
			return computerAudio();
		},1000);
	} else if(patIds[idIndex] === '#color4') {
		var audio4 = $('#audio4')[0];
		setTimeout(function(){
			audio4.play();
			computerColoring('#color4', audio4.duration);
			idIndex++;
			return computerAudio();
		},1000);
	} else if (!patIds[idIndex]){
		idIndex = 0;
    player = true;
	}
}

function computerColoring(id,time){
	if(id === '#color1') {
		$(id).addClass('highlight');
		setTimeout(function(){
			$(id).removeClass('highlight');
		},time * 1000);
		console.log('color1');
		return;
	}
	if(id === '#color2') {
		$(id).addClass('highlight');
		setTimeout(function(){
			$(id).removeClass('highlight');
		},time * 1000);
		console.log('color2');
		return;
	}
	if(id === '#color3') {
		$(id).addClass('highlight');
		setTimeout(function(){
			$(id).removeClass('highlight');
		},time * 1000);
		console.log('color3');
		return;
	}
	if(id === '#color4') {
		$(id).addClass('highlight');
		setTimeout(function(){
			$(id).removeClass('highlight');
		},time * 1000);
		console.log('color4');
		return;
	}
}

function playerInput(id){
	$(id).on('click', function(event){
		if(player){
			index++;
			playInput = id;
			isPatternMatched(index);
		}
		return;
	});
}

function playerTurn(){ //Toggles the player to true or false
	if(!player) {
		player = true;
		return;
	}
	if(player) {
		player = false;
		index = 0;
		return;
	}
}

function isPatternMatched(){ // Compare with computer pattern (patWords)
	if(playInput === patIds[index-1] && index < count) {
		return;
	}
	if (playInput === patIds[index-1] && index === count && index === 20) {
		return setTimeout(function(){
			playerTurn();
			endOfGame();
		},1000);
	}
	if(playInput !== patIds[index-1] && !strict && player) {
		return error();
	}
	if(playInput === patIds[index-1] && index === count) {
    return setTimeout(function(){
      playerTurn();
  		computerInput();
    },0)

	}
	if(playInput !== patIds[index-1] && strict) {
		return error();
	}
}

function computerInput(){
  player = false;
	extendRandomPattern();
	patIds = pattern.map(function(val) {
		return numberToId(val);
	});
	computerAudio();
}

function restartGame(){
	count = 0;
	index = 0;
	idIndex = 0;
	pattern = [];
	patIds = [];
	playInput;
	player = false;
	gameEnded = false;

	computerInput();
}

function error(){
	player = false;
	setTimeout(function(){
		$('#count p').html('<i class="fa fa-ban fa-3x"></i>')
		$('.fa.fa-ban').css('display','inline-block');
		idIndex = 0;
		index = 0;
	}, 1000);
	setTimeout(function(){
		$('.fa.fa-ban').css('display','none');
		$('#count p').html(count);
		if(!strict) {
			computerAudio();
		}
		if(strict) {
			return restartGame();
		}
	},2000);
}

function endOfGame(){
	gameEnded = true;
	$('#restart').removeClass('hidden').addClass('restart').html('Restart?');

}

function extendRandomPattern(){
	count++;
	$('#count p').html(count);
	pattern.push(getRandomNum(1,4));
	return;
}

function numberToId(num) {
	switch(true) {
		case num === 1:
		return '#color1';
		break;
		case num === 2:
		return '#color2';
		break;
		case num === 3:
		return '#color3';
		break;
		case num === 4:
		return '#color4';
		break;

		default:
		return false;
	}
}

// Get random position
function getRandomNum(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
