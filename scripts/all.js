

//=== variables ===
let hasResult = false;
const bmiSettings = [
  {
    maxBMI: 18.5,
    color: '#31BAF9',
    text: '過輕'
  },
  {
    maxBMI: 24,
    color: '#86D73E',
    text: '理想'
  },
  {
    maxBMI: 27,
    color: '#FF982D',
    text: '過重'
  },
  {
    maxBMI: 1000,
    color: '#FF1200',
    text: '肥胖'
  },
];
let record = null;
let history = JSON.parse(localStorage.getItem('history'));



//=== functions ===
let calcBMI = (tall, weight) => {
  let meter = tall / 100;
  return weight / (meter * meter);
}
// save a record into history
let saveToHistory = () => {
  if (record == null) return;

  let idx;
  if(history == null) {
    history = { maxIdx: 0, data: {} };
    idx = 0;
  }
  else {
    idx = history.maxIdx + 1;   // record index in history
  }
  history.maxIdx = idx;
  history.data[idx] = {
    'bmiLevel': record.bmiLevel,
    'bmi': record.bmi,
    'weight': record.weight,
    'height': record.height,
    'date': new Date().toLocaleString() };

  // save to localStorage
  localStorage.setItem('history', JSON.stringify(history));
};
let genRecordItem = (record) => {
  let flagTypeStr = '';
  switch(record.bmiLevel) {
    case 0: flagTypeStr = 'flag-too-light'; break;
    case 1: flagTypeStr = 'flag-ideal'; break;
    case 2: flagTypeStr = 'flag-too-heavy'; break;
    case 3: flagTypeStr = 'flag-obesity'; break;
  }
  let html = `
  <li class="item flex-rsbc" data-idx="0">
    <div class="flag ${flagTypeStr}"></div>
    <div class="data">${bmiSettings[record.bmiLevel].text}</div>
    <div class="data flex-rcc">
      <div class="small">BMI</div>
      <span>${record.bmi}</span>
    </div>
    <div class="data flex-rcc">
      <div class="small">weight</div>
      <span>${record.weight}kg</span>
    </div>
    <div class="data flex-rcc">
      <div class="small">height</div>
      <span>${record.height}</span>
    </div>
    <div class="data">
      <div class="small">${record.date}</div>
    </div>
  </li>
  `;
  return html;
};
let genAllRecordItems = () => {
  if (!history) return;

  let innerHTML = '';
  let n = history.maxIdx + 1;
  for (let i=0; i<n; i++) {
    if (history.data[i]) {
      innerHTML += genRecordItem(history.data[i]);
    }
  }

  elHistoryList.innerHTML = innerHTML;
}


//=== main code ===
let elFieldTall = document.querySelector('#tall');
let elFieldWeight = document.querySelector('#weight');
let elBMI = document.querySelector('#bmi');
let elBtnCalc = document.querySelector('.btn-calc');
let elShowResult = document.querySelector('.show-result');
let elResultCircle = document.querySelector('.result-circle');
let elResultText = document.querySelector('.result-text');
let elBtnRecalc = document.querySelector('.btn-recalc');
let elBtnSave = document.querySelector('.btn-save');
let elHistoryList = document.querySelector('.history-list');

// listener
let calc = () => {
  let bmi = calcBMI(elFieldTall.value, elFieldWeight.value);
  bmi = Math.round(bmi * 100) / 100;

  // update ui
  if (bmi) {
    // show/hide ui
    elBtnCalc.setAttribute('class', 'btn-calc flex-rcc user-select-none hide');
    elShowResult.setAttribute('class', 'show-result flex-rlc');

    // analysis BMI level
    let bmiLevel = 0;
    if (bmi < bmiSettings[0].maxBMI) {
      bmiLevel = 0;   // 過輕
    }
    else if (bmi < bmiSettings[1].maxBMI) {
      bmiLevel = 1;   // 理想
    }
    else if (bmi < bmiSettings[2].maxBMI) {
      bmiLevel = 2;   // 過重
    }
    else {
      bmiLevel = 3;   // 肥胖
    }
    elShowResult.setAttribute('style', `color: ${bmiSettings[bmiLevel].color}`);
    elResultCircle.setAttribute('style', `border: 6px solid ${bmiSettings[bmiLevel].color}; box-shadow: 0 1px 6px 3px ${bmiSettings[bmiLevel].color} inset;`);
    elBMI.textContent = bmi;
    elResultText.textContent = bmiSettings[bmiLevel].text;
    elBtnRecalc.setAttribute('style', `background-color: ${bmiSettings[bmiLevel].color}`);
    elBtnSave.setAttribute('style', `background-color: ${bmiSettings[bmiLevel].color}`);

    // update record
    record = {};
    record['bmiLevel'] = bmiLevel;
    record['bmi'] = bmi;
    record['weight'] = elFieldWeight.value;
    record['height'] = elFieldTall.value;

    hasResult = true;
  }
}
elBtnCalc.addEventListener('click', calc);
elBtnRecalc.addEventListener('click', calc);
elBtnSave.addEventListener('click', saveToHistory);

// default process
genAllRecordItems();
