var iRobot = {
	// Store settings
	// -------------------------------------------------------
	config : {
		X : 0,
		Y : 0,
		F : 0,
		compass : 'North',
		gridSize : 100
	},
	init : function() {
		// Setup DOM elements
		// -------------------------------------------------------
		var $robot 		= $('.js-robot'),
			$reportArea = $('.js-reporting');

		// Place Robot button
		// -------------------------------------------------------
		$('.js-controls').on('click', '.js-place', function() {
			iRobot.updateLocation();
			iRobot.placeRobot($robot);
			iRobot.updateRotation($robot);
			iRobot.convertCardinalPoints();
		});

		// Rotation buttons, left and right
		// -------------------------------------------------------
		$('.js-controls').on('click', '.js-rotate', function() {
			var $el = $(this),
				data = $el.data();
			iRobot.rotateRobot($robot, data);
			iRobot.convertCardinalPoints();
		});

		// Movement button
		// -------------------------------------------------------
		$('.js-controls').on('click', '.js-move', function() {
			iRobot.moveRobot($robot);
		});

		// Reporting X,Y and direction
		// -------------------------------------------------------
		$('.js-controls').on('click', '.js-report', function() {
			iRobot.report($reportArea);
		});

	},
	moveRobot : function($robot) {
		// Set the X. Y co-ords
		// -------------------------------------------------------
		switch(iRobot.config.F) {
			case 0 :
			case 360 :
			case -360 :
			iRobot.config.Y += 1;
			break;

			case 90 :
			case -270 :
			iRobot.config.X += 1;
			break;

			case 180 :
			case -180 :
			iRobot.config.Y -= 1;
			break;

			case 270 :
			case -90 :
			iRobot.config.X -= 1;
			break;
		}

		// Prevent iRobot from falling off the edge
		// -------------------------------------------------------
		if (iRobot.config.X === 5) {
			iRobot.config.X = 4;
		}
		if (iRobot.config.Y === 5) {
			iRobot.config.Y = 4;
		}
		if (iRobot.config.X === -1) {
			iRobot.config.X = 0;
		}
		if (iRobot.config.Y === -1) {
			iRobot.config.Y = 0;
		}

		iRobot.placeRobot($robot);
	},
	updateLocation : function() {
		// Get the interface form values
		// -------------------------------------------------------
		iRobot.config.F = parseInt($('#compass').val());
		iRobot.config.X = parseInt($('#locationX').val());
		iRobot.config.Y = parseInt($('#locationY').val());
	},
	updateRotation : function($robot) {
		$robot.css('transform', 'rotate('+iRobot.config.F+'deg)')
	},
	placeRobot : function($robot) {
		// Set the pixel location of iRobot
		// -------------------------------------------------------
		var gridSize = iRobot.config.gridSize,
			placeX = iRobot.config.X * gridSize + 'px',
			placeY = (iRobot.config.Y - 4) * -gridSize + 'px';

		$robot.addClass('placed');
		$('.js-movement-controls').removeClass('js-hidden');

		$robot.css('left', placeX);
		$robot.css('top', placeY);
	},
	rotateRobot : function ($robot, data) {
		if(data.rotateDirection === "left") {
			iRobot.config.F -= 90;
		}
		if(data.rotateDirection === "right") {
			iRobot.config.F += 90;
		}

		// Prevent iRobot from spinning around!
		// -------------------------------------------------------
		if(iRobot.config.F === -450) {
			iRobot.config.F = 270;
		}
		if (iRobot.config.F === 450) {
			iRobot.config.F = 90;
		}

		$robot.css('transform', 'rotate('+iRobot.config.F+'deg)');
	},
	convertCardinalPoints :  function() {
		// Set the Compass points based on degrees rotation
		// -------------------------------------------------------
		switch(iRobot.config.F) {
			case 0 :
			case 360 :
			case -360 :
			iRobot.config.compass = 'North';
			break;

			case 90 :
			case -270 :
			iRobot.config.compass = 'East';
			break;

			case 180 :
			case -180 :
			iRobot.config.compass = 'South';
			break;

			case 270 :
			case -90 :
			iRobot.config.compass = 'West';
			break;
		}
	},
	report : function($reportArea) {
		var string = iRobot.config.X +', '+ iRobot.config.Y +', '+ iRobot.config.compass;
		$reportArea.html(string);
	}
}

// Set iRobot app in motion
// -------------------------------------------------------
$(document).ready(iRobot.init());