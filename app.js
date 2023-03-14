// using the drake equation make a set of sliders that would interpoeret the
// output of changing the parameters. Pass 'N' into the grabby aliens equation

// given the amount of potential aliens to communicate with, we can then make a
// probabalistic argument of
// -time to contact
// -potential that we've been spotted
// likelyhood of falling into alien species domain

/* 

N = R* X Fp X ne X fl X fi X fc X L



N    : The number of civilizations in the Milky Way galaxy whose electromagnetic emissions are detectable.

R*   : The rate of formation of stars suitable for the development of intelligent life (number per year).
(0.5 per year - 2 per year)
fp   : The fraction of those stars with planetary systems.
(0.2 - 0,5)
ne   : The number of planets, per solar system, with an environment suitable for life.
(1 - 5)
fl    : The fraction of suitable planets on which life actually appears.
(0.01 - 1)
fi    : The fraction of life bearing planets on which intelligent life emerges.
(0.01 - 1)
fc    : The fraction of civilizations that develop a technology that produces detectable signs of their existence.
(0.1 - 0.2)
L    : The average length of time such civilizations produce such signs (years).
(1,000 - 1,000,000,000)

given the assumption the local group is the furthest extent by which life may travel 
(relative speed of light) and assume (wrongly) that the observable universe is the 
entire universe, give a regular distribtion across the local group 

local cluster / observable universe area = 0.00005375419
0.00005375419 * N = civs in local group

total "area" of local cluster / total alien civs in local cluster = average distance between 
civs.

assume speed of light expansion once achieved explosive space travel

main slider is age of nearest civ at average distance 

// we will assume local group to be adnromeda, milkyway, and triangulum

average distance between star systems within cluster (make a slider?)

chart.js
p5.js
three.js

*/

const andromedaStars = 10 ** 12; //1 trillion
const milkyWayStars = 2.5 * 10 ** 11; //250 billion
const triangulumStars = 4 * 10 ** 10; //40 billion
const localStars = andromedaStars + milkyWayStars + triangulumStars;
const localToObservable = 0.00005375419;
const milkyWayAge = 13.6 * 10 ** 9;

// drake equation
let N;
function drakeEquation() {
  let r = document.getElementById("r").value;
  document.getElementById("rVal").innerText = r;
  let fp = document.getElementById("fp").value;
  document.getElementById("fpVal").innerText = fp;
  let ne = document.getElementById("ne").value;
  document.getElementById("neVal").innerText = ne;
  let fl = document.getElementById("fl").value;
  document.getElementById("flVal").innerText = fl;
  let fi = document.getElementById("fi").value;
  document.getElementById("fiVal").innerText = fi;
  let fc = document.getElementById("fc").value;
  document.getElementById("fcVal").innerText = fc;
  let l = document.getElementById("l").value;
  document.getElementById("lVal").innerText = l;
  N = r * fp * ne * fl * fi * fc * l;
  return N;
}

drakeEquation();

function addButtons() {
  let forward = document.createElement("button");
  let backward = document.createElement("button");
  forward.type = "button";
  forward.innerText = "foward";
  forward.addEventListener("mousedown", timePlus);
  backward.type = "button";
  backward.innerText = "backward";
  backward.addEventListener("mousedown", timeMinus);
  let buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.innerHTML = "";
  buttonContainer.appendChild(backward);
  buttonContainer.appendChild(forward);
}

let yearElem = document.getElementById("year");
let age = 0;

// incement time forward 100 years
function timePlus() {
  for (let i = 0; i < civArr.length; i++) {
    civArr[i].rad++;
  }
  age = age + 100;
  yearElem.innerText = age;
  reMap(civArr);
}

// increment time backwards 100 years
function timeMinus() {
  for (let i = 0; i < civArr.length; i++) {
    civArr[i].rad--;
  }
  age = age - 100;
  yearElem.innerText = age;
  reMap(civArr);
}

function reMap() {
  for (let i = 0; i < civsInMilkyWay; i++) {
    let x = random(1057);
    let y = random(1057);
    circle(x, y, 1);
  }
}

// how man civs are wihtin our local group
let sliders = document.getElementById("drakeSliders");
sliders.addEventListener("mouseup", updateVals);

function updateVals() {
  N = drakeEquation();
  totalCivsLocalGroup = N * localToObservable;
  civsInMilkyWay = totalCivsLocalGroup * (milkyWayStars / localStars);
  document.getElementById("N").innerText = "N = " + Math.floor(N);
  document.getElementById("NinLocal").innerText =
    "N in local group = " + Math.floor(N * localToObservable);
  document.getElementById("NinMilkyWay").innerText =
    "N in MilkyWay = " +
    Math.floor(N * localToObservable * (milkyWayStars / localStars));
  // clear();
  setup();
}

// start by calculating aliens in milkyway

// based on given area, how many aliens in local group assuming drake equation only applies to
// observable universe
let totalCivsLocalGroup = drakeEquation() * localToObservable;

// based on amount of systems estimated within each galaxy, assume even distro across
// systems
let civsInMilkyWay = (milkyWayStars / localStars) * totalCivsLocalGroup;

let civArr = [];

function setup() {
  let canvas = createCanvas(1057, 1057);
  canvas.parent("columns");
  background(255);
  addButtons();
  // sol
  fill(0);
  circle(500, 800, 2);
  initialize();
}

// 40 = 40,000 light years

function initialize() {
  civArr = [];
  for (let i = 0; i < civsInMilkyWay; i++) {
    civArr.push({ x: random(1057), y: random(1057), rad: random(40) });
  }
  reMap(civArr);
  age = 0;
}

function reMap(civArr) {
  for (let i = 0; i < civArr.length; i++) {
    fill(140);
    circle(civArr[i].x, civArr[i].y, civArr[i].rad);
  }
}

updateVals();
