//Specifications
//1. Prompt user to decide on angle measure (1. degrees, 2. radians)
//2. Prompt user to enter an angle, based on result of 1 (positive or negative, floating decimal)
//3. Prompt user to enter a function (1. sine, 2. cosine, 3. tangent, 4. cosecant, 5. secant, 6. cotangent
//4. Mirror input
//5. Calculate value of trig function based on 1, 2, 3
//6. Output reference angle (0 to 90), calculated value, and ask if user wants to enter more values or exit

//function prompts user for angle measure method (degrees or radians)

var prompt = require('prompt-sync')();
const promptAngleMethod = () => {
  while (true) {
    var chosenAngleMethod = prompt(
      'How do you want to measure the angle? Enter d for degrees and r for radians: '
    );
    if (chosenAngleMethod != 'd' && chosenAngleMethod != 'r') {
      console.log('Invalid entry.');
    } else {
      return chosenAngleMethod;
    }
  }
};

//function prompts user for angle measure (enter as a floating point value)
const promptAngleMeasure = dOrR => {
  while (true) {
    var chosenAngleMeasure = prompt(
      'Please enter a value for the angle measure, in ' + dOrR + ': '
    );
    var numberChosenAngleMeasure = parseFloat(chosenAngleMeasure);
    if (isNaN(numberChosenAngleMeasure)) {
      console.log('Invalid entry.');
    } else {
      return numberChosenAngleMeasure;
    }
  }
};

//function prompts user for one of the six trigonometric functions
const promptTrigFunction = () => {
  while (true) {
    console.log('Please choose a trigonometric function.');
    var chosenTrigFunction = prompt(
      'Enter 1 for sine, 2 for cosine, 3 for tangent, 4 for cosecant, 5 for secant, 6 for cotangent: '
    );
    var numberChosenTrigFunction = parseFloat(chosenTrigFunction);
    if (isNaN(numberChosenTrigFunction)) {
      console.log('Invalid entry.');
    } else {
      return numberChosenTrigFunction;
    }
  }
};

//set value of degreesOrRadians, depending on user input for angle measure method
const setDegreesOrRadians = x => {
  if (x === 'd') {
    return 'degrees';
  } else {
    return 'radians';
  }
};

//calculates the value of the chosen trig function at the chosen angle measure in radians
const calculateTrigValue = (i, a) => {
  let calculatedValue = 0;
  switch (i) {
    case 1:
      calculatedValue = Math.sin(a); //sine
      break;
    case 2:
      calculatedValue = Math.cos(a); //cosine
      break;
    case 3:
      calculatedValue = Math.tan(a); //tangent
      break;
    case 4:
      calculatedValue = 1 / Math.sin(a); //cosecant
      break;
    case 5:
      calculatedValue = 1 / Math.cos(a); //secant
      break;
    case 6:
      calculatedValue = 1 / Math.tan(a); //tangent
      break;
    default:
      console.log('Sorry, there was an error!');
      break;
  }
  return calculatedValue;
};

//ensures an angle in degrees is in the range of 0 to 360 degrees
const getAngleMod360 = y => {
  if (y >= 360) {
    y %= 360;
  }
  while (y < 0) {
    y += 360;
  }
  return y;
};

//finds reference angle, from 0 to 90 degrees
const getReferenceAngleMeasure = z => {
  if (z > 90 && z <= 180) {
    z = 180 - z;
  } else if (z > 180 && z <= 270) {
    z -= 180;
  } else if (z > 270 && z <= 360) {
    z = 360 - z;
  }
  return z;
};

//main starts here
function mainTrig() {
  var keepGoing = true;
  while (keepGoing) {
    var angleMethod = promptAngleMethod();
    var degreesOrRadians = setDegreesOrRadians(angleMethod);
    console.log('You chose to measure your angle in ' + degreesOrRadians + '.');

    var angleMeasure = promptAngleMeasure(degreesOrRadians);
    console.log(
      'You chose an angle of ' + angleMeasure + ' ' + degreesOrRadians + '.'
    );

    var trigFunctionIndex = promptTrigFunction();
    var trigFunctionArray = [
      'sine',
      'cosine',
      'tangent',
      'cosecant',
      'secant',
      'cotangent',
    ];
    var trigFunction = trigFunctionArray[trigFunctionIndex - 1];
    console.log('You chose the ' + trigFunction + ' function.');

    var trigFunctionArrayShort = ['sin', 'cos', 'tan', 'csc', 'sec', 'cot'];
    var trigFunctionShort = trigFunctionArrayShort[trigFunctionIndex - 1];
    console.log(
      'Calculating the value of ' +
        trigFunctionShort +
        '(' +
        angleMeasure +
        '), where the angle is measured in ' +
        degreesOrRadians +
        '...'
    );

    var radianAngleMeasure = angleMeasure;
    var degreeAngleMeasure = angleMeasure;
    if (angleMethod === 'd') {
      radianAngleMeasure = (angleMeasure * Math.PI) / 180; //convert angle to radians if given in degrees
    } else {
      degreeAngleMeasure = (angleMeasure * 180) / Math.PI; //convert angle to degrees if given in radians
    }

    var calculatedValue = calculateTrigValue(
      trigFunctionIndex,
      radianAngleMeasure
    );

    degreeAngleMeasure = getAngleMod360(degreeAngleMeasure);
    var degreeReferenceAngle90 = getReferenceAngleMeasure(degreeAngleMeasure);

    console.log(
      'The reference angle for ' +
        angleMeasure +
        ' ' +
        degreesOrRadians +
        ' is ' +
        degreeReferenceAngle90 +
        ' degrees.'
    );
    console.log(
      'The value of the ' +
        trigFunctionArray[trigFunctionIndex - 1] +
        ' of ' +
        angleMeasure +
        ' ' +
        degreesOrRadians +
        ' is: ' +
        calculatedValue +
        '.'
    );
    var continueValue = prompt(
      'Do you want to calculate more values? Enter y for yes, and any other key for no:'
    );
    if (continueValue != 'y') {
      keepGoing = false;
    }
  }
}
mainTrig();
