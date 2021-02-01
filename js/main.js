const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea');
const setting = document.querySelector('.setting');
const sample = document.querySelectorAll('.sample');
const carGame = document.querySelector('.carGame');
const input = document.querySelector('input');
const faArrowDown = document.querySelector('i');
startScreen.addEventListener('click', start);
document.addEventListener('keydown', start2);

var varColor = 'red';

const carSound = new Audio;
carSound.src = 'music/car_srip_22.wav';


const endSound1 = new Audio;
endSound1.src = 'music/end1.wav';

const endSound2 = new Audio;
endSound2.src = 'music/end2.wav';

const endSound3 = new Audio;
endSound3.src = 'music/end3.wav';

const moveSound = new Audio;
moveSound.src = 'music/down.mp3';


var color = ['#007bff','green','yellow','pink','aqua','orange','purple','violet','#6610f2','#6610f2','#6f42c1','#e83e8c','#dc3545','#fd7e14','#ffc107','#28a745','#20c997','#17a2b8','#21458e'/*,'#','#','#','#','#','#','#'*/];
var num = [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,4100]
var carNum = 3;
var n = 0;


function custom() {
	pause()
	varColor = input.value;
}

function playClor(){
	let car = document.querySelector('.car');
	varColor = input.value;
	car.style.backgroundColor = varColor;
	varColor = input.value;
}

setting.addEventListener('mouseover', () => {

	faArrowDown.className = '';
	sample[0].style.backgroundColor = 'red';
	sample[1].style.backgroundColor = 'green';
	sample[2].style.backgroundColor = 'yellow';
	sample[3].style.backgroundColor = 'violet';
	sample[4].style.backgroundColor = 'blue';

	sample.forEach(function(item,index) {
		sample[index].classList.remove('hide');
	});

});


setting.addEventListener('mouseout', () => {

	faArrowDown.className = 'fas fa-arrow-down';
	sample.forEach((item,index) => {
		sample[index].classList.add('hide');
	});

});
let player = {
	speed:5,
	score:0,
	start: false
}


let keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowLeft: false,
	ArrowRight: false,
}
document.addEventListener('keyup',keyPress)
document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)
function keyDown(e) {
	 e.preventDefault();
	 // alert(e.key)
	 keys[e.key] = true;
	// console.log(e.key)
	// console.log(keys)
}
function keyUp(e) {
	 e.preventDefault();
	  keys[e.key] = false;
// 	console.log(e.key)
// 	console.log(keys)
}
function keyPress(e) {
	 e.preventDefault();
	 if (e.key == 'p') {
	 	pause();
	 }
// 	console.log(e.key)
// 	console.log(keys)
}
function pause() {
	let car = document.querySelector('.car');

	car.style.backgroundColor = varColor;
	if(player.start == true){
		player.start = false;
		soundPause();
	}
	else {
		player.start = true;
		soundPlay();
	}
}
function isCollide (a,b) {
	let aRect = a.getBoundingClientRect();
	let bRect = b.getBoundingClientRect();

	return !((aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right))
}
function moveLines() {
	let lines = document.querySelectorAll('.lines');
	lines.forEach(function(item) {

		if (item.y >= 700 ) {
			item.y -= 750;
		}

		item.y += player.speed;
		item.style.top = item.y + 'px';
	});
}


function soundPlay() {
	carSound.play();
	carSound.loop = true;
}

function soundPause() {
	carSound.pause();
}


function soundStop() {
	carSound.load();
	carSound.loop = false;
}


function endGame() {
	let ps = Math.floor(player.score)*10;
	let enemy = document.querySelector('.enemy');
	player.start = false;
	startScreen.classList.remove('hide');
	startScreen.innerHTML = 'Game Over! <br> Your final score is '+ps+' <br>  Press here to restart the game.<br> Click \'P\' pause the game. '
	if (ps<=300 && player.start == false) {
		endSound1.play();
	}
	else if (ps<=500 && player.start == false){
		endSound2.play();
	}
	else {
		endSound3.play();
			
	}
}

function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
	let car = document.querySelector('.car');
	enemy.forEach(function(item) {

		if (isCollide(car, item)) {
			startScreen.removeEventListener('click', start);
			startScreen.addEventListener('mousedown', restart);
			document.removeEventListener('keydown',start2);
			document.addEventListener('keydown',restart2);
			soundStop();
			endGame();
		}


		if (item.y >= 750) {
			item.y = -300;
			item.style.left = Math.random()*350 + 'px'
		}
		item.y += player.speed;
		item.style.top = item.y + 'px'
	});
}

function startGame() {
	let car = document.querySelector('.car');
	let road = gameArea.getBoundingClientRect();
	if (player.start) {
		 moveLines();
		 moveEnemy();
		 // console.log(player.score)
		if (keys.ArrowUp && player.y > (road.top + 70) ) { player.y -= player.speed;moveSound.play() }
		if (keys.ArrowDown && player.y < (road.bottom - 70)){player.y += player.speed;moveSound.play()}
		if (keys.ArrowRight && player.x < (road.width - 60)){player.x += player.speed;moveSound.play()}
		if (keys.ArrowLeft && player.x > 0) {player.x -= player.speed;moveSound.play()}

		car.style.backgroundColor = varColor;
		car.style.top = player.y + 'px';
		car.style.left = player.x + 'px';
	} 
	window.requestAnimationFrame(startGame)
	if (player.start) {
		player.score += 0.05;
	}
	let ps = Math.floor(player.score)*10;
	

	const hii = localStorage.getItem('best')

	score.innerText = 'Score ' + ps + '\nBest ' + highScore(ps);
	level(ps)
}
function start () {
	carGame.requestFullscreen();
	startScreen.classList.add('hide')
	 gameArea.innerHTML = ""
	 player.start = true;
	 player.score = 0;
	 soundPlay();
	  window.requestAnimationFrame(startGame)

	 for (let i = 0; i < 10; i++) {
	 	let roadline = document.createElement('div')
	 	roadline.setAttribute('class','lines')
	 	roadline.y = (i*300);
	 	roadline.style.top = roadline.y + 'px';
	 	gameArea.appendChild(roadline);
	 }

	 let car = document.createElement('div');
	 car.setAttribute('class','car');
	 gameArea.appendChild(car);
	 player.x = car.offsetLeft;
	 player.y = car.offsetTop;


	 for (let x = 0; x < carNum; x++) {
	 	let enemyCar = document.createElement('div')
	 	enemyCar.setAttribute('class','enemy')
	 	enemyCar.y = -((x +1) * 350) ;
	 	enemyCar.style.top = enemyCar.y + 'px';
	 	enemyCar.style.backgroundColor = randColor()
	 	enemyCar.style.transform = 'rotate(180deg)'
	 	enemyCar.style.left = Math.random()*350 + 'px';
	 	gameArea.appendChild(enemyCar);
	 }
}

function start2 (e) {
	e.preventDefault();
	document.removeEventListener('keydown',start2);
	carGame.requestFullscreen();
	if (e.key == 'Enter') {
		 startScreen.classList.add('hide')
		 gameArea.innerHTML = ""
		 player.start = true;
		 player.score = 0;
		 soundPlay();
		  window.requestAnimationFrame(startGame)

		 for (let i = 0; i < 10; i++) {
		 	let roadline = document.createElement('div')
		 	roadline.setAttribute('class','lines')
		 	roadline.y = (i*300);
		 	roadline.style.top = roadline.y + 'px';
		 	gameArea.appendChild(roadline);
		 }

		 let car = document.createElement('div');
		 car.setAttribute('class','car')
		 gameArea.appendChild(car);
		 player.x = car.offsetLeft;
		 player.y = car.offsetTop;

		 for (let x = 0; x < carNum; x++) {
		 	let enemyCar = document.createElement('div')
		 	enemyCar.setAttribute('class','enemy')
		 	enemyCar.y = -((x +1) * 350) ;
		 	enemyCar.style.top = enemyCar.y + 'px';
		 	enemyCar.style.backgroundColor = randColor()
		 	enemyCar.style.transform = 'rotate(180deg)'
		 	enemyCar.style.left = Math.random()*350 + 'px';
		 	gameArea.appendChild(enemyCar);
		 }
	}
}

function restart() {
	carGame.requestFullscreen();
	 let enemy = document.querySelectorAll('.enemy');
	 startScreen.classList.add('hide')
	 player.speed = 5
	 n = 0;
	 player.start = true;
	 player.score = 0;
	 soundPlay();
	 enemy.forEach(function(item,ind) {

	 	 gameArea.removeChild(item)
	 });
	 for (let x = 0; x < carNum; x++) {
	 	let enemyCar = document.createElement('div')
	 	enemyCar.setAttribute('class','enemy')
	 	enemyCar.y = -((x +1) * 350) ;
	 	enemyCar.style.top = enemyCar.y + 'px';
	 	enemyCar.style.backgroundColor =  randColor();
	 	enemyCar.style.transform = 'rotate(180deg)'
	 	enemyCar.style.left = Math.random()*350 + 'px';
	 	gameArea.appendChild(enemyCar);
	 }
}

function restart2 (e) {
	carGame.requestFullscreen();
	document.removeEventListener('keydown',restart2);
	e.preventDefault();
	if (e.key == 'Enter') {
		 let enemy = document.querySelectorAll('.enemy');
		 startScreen.classList.add('hide')
		 player.speed = 5
		 n = 0;
		 player.start = true;
		 player.score = 0;
		 soundPlay();
		 enemy.forEach(function(item,ind) {

		 	 gameArea.removeChild(item)
		 });
		 for (let x = 0; x < carNum; x++) {
		 	let enemyCar = document.createElement('div')
		 	enemyCar.setAttribute('class','enemy')
		 	enemyCar.y = -((x +1) * 350) ;
		 	enemyCar.style.top = enemyCar.y + 'px';
		 	enemyCar.style.backgroundColor =  randColor();
		 	enemyCar.style.transform = 'rotate(180deg)'
		 	enemyCar.style.left = Math.random()*350 + 'px';
		 	gameArea.appendChild(enemyCar);
		 }
	}
}

function highScore(ps) {
	let best = localStorage.getItem('best')
	localStorage.setItem('best',Math.max(ps,best))
	return best;
}

function level(score) {
	if (score == num[n]){
		player.speed  = n+5;
		n++
		console.log(player.speed)
	}
}
function randColor() {
	// function c() {
	// 	let hex = Math.floor(Math.random()*256).toString(16)
	// 	return ('0' + String(hex)).substr(-2);
	// }
	// return '#' + c()+c()+c();
	let c = Math.floor(Math.random()* (color.length) )
	// alert(color[c])
	return color[c];
}