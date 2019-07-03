//Requerimiento #1. Color intermitente en el titulo.
//El título “Match Game” debe tener una animación que cambie de color después de determinado tiempo,
//posteriormente vuelva al color original, y permanezca cambiando entre dos colores indefinidamente.

function colorintermitente(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				colorintermitente('h1.main-titulo');
			},
			queue: true
		});
}

//Requerimiento #2:
//Se deben generar los dulces aleatoriamente en el tablero, llenándolo todo al principio del juego.
// Cada vez que se realice una combinación de 3 dulces o más en línea, y posteriormente desaparezcan,
//estos espacios se deben llenar con los dulces inmediatamente anteriores verticalmente a los espacios;
// creando nuevos dulces aleatorios para llenar en la parte de arriba del tablero.
// Esto debe mostrar un efecto en el que la gravedad hace que todos los dulces se desplacen hacia abajo
//y se llenen los nuevos desde la parte superior del tablero.

function randbetween(min, max) { //función aleatoria entre un minimo y maximo para los candies
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

// Capturar filas de dulces

function arraycandy(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var columnascaramelo = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7
	]);

	if (typeof index === 'number') {
		var filacaramelo = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return columnascaramelo;
	} else if (arrayType === 'rows' && index !== '') {
		return filacaramelo;
	}
}

//Vectores de filas

function filacaramelos(index) {
	var filacaramelo = arraycandy('rows', index);
	return filacaramelo;
}

//Vectores de colunmnas

function columnascaramelo(index) {
	var columnacaramelo = arraycandy('columns');
	return columnacaramelo[index];
}

//Requerimiento #3:
//Verificar si hay como mínimo tres dulces del mismo tipo en línea,
//en caso tal, deben desaparecer con un efecto animado.
// Esto debe sumar puntos en el puntaje general.

function validacioncolumna() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var columnacaramelo = columnascaramelo(j);
		var comparisonValue = columnacaramelo.eq(0);
		var gap = false;
		for (var i = 1; i < columnacaramelo.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = columnacaramelo.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = columnacaramelo.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, columnacaramelo);
			updatescore(candyCount);
		}
	}
}
function deleteColumnCandy(candyPosition, columnacaramelo) {
	for (var i = 0; i < candyPosition.length; i++) {
		columnacaramelo.eq(candyPosition[i]).addClass('delete');
	}
}

// Validación si hay dulces a elimnar en una fila

function validacionfila() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var filacaramelo = filacaramelos(j);
		var comparisonValue = filacaramelo[0];
		var gap = false;
		for (var i = 1; i < filacaramelo.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = filacaramelo[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = filacaramelo[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, filacaramelo);
			updatescore(candyCount);
		}
	}
}
function deleteHorizontal(candyPosition, filacaramelo) {
	for (var i = 0; i < candyPosition.length; i++) {
		filacaramelo[candyPosition[i]].addClass('delete');
	}
}

//Score del juego

function updatescore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

//Fill de caramelos

function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = randbetween(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	addCandyEvents();
	setValidations();
}

//Validaciòn de borrar caramelos

function setValidations() {
	validacioncolumna();
	validacionfila();
	// Dulces que borrar?
	if ($('img.delete').length !== 0) {
		deleteCandyAnimate();
	}
}


//Requerimiento #7.
//La interacción del usuario con el elemento dulce debe ser de drag & drop.

function addCandyEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: changecandy
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//Solido en el movimiento

function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

//Reemplazo dulces anteriores

function changecandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

//Chequeo score elementos en linea

function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

//Delete automatica de los elementos

function deleteCandyAnimate() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300 //0.3 segundos
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showerror);
			},
			queue: true
		});
}

//Fill de los espacios con elementos

function showerror(error) {
	console.log(error);
}

function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('Sin posibilidad de eliminar Candy...');
		}
	})
}

//Requerimientos #4:
//El juego debe tener un temporizador a dos minutos, que inicie con el juego y al cumplirse el tiempo,
// cambie mediante animaciones el aspecto de la página eliminando el tablero de juego,
// y mostrando en toda la página el puntaje y el número de movimientos.
// Puedes aplicar un plugin externo de código abierto para implementar el temporizador en el proyecto.

function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Game Over. Gracias por participar!'); //final
	$('div.score, div.moves, div.panel-score').width('100%');

}

//Start Game

function startgame() {

	colorintermitente('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

//Iniciar el juego

$(function() {
	startgame();
});
