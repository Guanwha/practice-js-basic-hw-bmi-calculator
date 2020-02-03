

//=== variables ===
let hasResult = false;


//=== functions ===
let calcBMI = (tall, weight) => {
  let meter = tall / 100;
  return weight / (meter * meter);
}



//=== main code ===
let elFieldTall = document.querySelector('#tall');
let elFieldWeight = document.querySelector('#weight');
let elBMI = document.querySelector('#bmi');
let elBtnCalc = document.querySelector('.btn-calc');
let elShowResult = document.querySelector('.show-result');
let elBtnRecalc = document.querySelector('.btn-recalc');

// listener
let calc = () => {
  let bmi = calcBMI(elFieldTall.value, elFieldWeight.value);
  bmi = Math.round(bmi * 100) / 100;
  console.log(`BMI: ${bmi}`);

  // update ui
  if (bmi) {
    // show/hide ui
    elBtnCalc.setAttribute('class', 'btn-calc flex-rcc user-select-none hide');
    elShowResult.setAttribute('class', 'show-result flex-rlc')
    elBMI.textContent = bmi;
    hasResult = true;
  }
}
elBtnCalc.addEventListener('click', calc);
elBtnRecalc.addEventListener('click', calc);
