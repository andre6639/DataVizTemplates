import {chart} from './chart.js';

const form = document.getElementById("sorg");
const myChart = chart();

function layout() {
	const interval = setInterval(() => {
    form.value = form.radio.value = form.radio.value === "grouped" ? "stacked" : "grouped";
    form.dispatchEvent(new CustomEvent("input"));
  }, 2000);
	form.onchange = () => form.dispatchEvent(new CustomEvent("input")); // Safari
	form.oninput = event => {
    if (event.isTrusted) clearInterval(interval), form.onchange = null;
    form.value = form.radio.value;
    myChart.update(form.value);
  };
  form.value = form.radio.value;
}

layout();

console.log(d3.version);