

//=== variables ===



//=== functions ===
let calcBMI = (tall, weight) => {
  let meter = tall / 100;
  return weight / (meter * meter);
}



//=== main code ===
let elFieldTall = document.querySelector('#tall');
let elFieldWeight = document.querySelector('#weight');
let elBMI = document.querySelector('#bmi');
let elBtnRecalc = document.querySelector('#btn-recalc');

// listener
elBtnRecalc.addEventListener('click', () => {
  let bmi = calcBMI(elFieldTall.value, elFieldWeight.value);
  bmi = Math.round(bmi * 100) / 100;
  console.log(`BMI: ${bmi}`);
  elBMI.textContent = bmi;
});
