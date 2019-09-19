const root = document.querySelector("#root");
const div  = document.createElement("div");	
let arr = [];
let row = 120;
let coll = 290; 

createRandomArrey();
createDisplay();
tick();

function tick() {
	revise();
	requestAnimationFrame(tick);
}

function createRandomArrey() {
	for( let i = 0; i < row; i++ ) {
		arr[i] = [];
		for( let j = 0; j < coll; j++ ) {
			arr[i][j] = Math.floor(Math.random()*2);
		}
	}
}

function createDisplay() {
	for( let i = 0; i < row; i++ ) {
		let middle = document.createElement("div");
		root.appendChild(middle);
		for( let j = 0; j < coll; j++ ) {
			let clone = div.cloneNode();
			clone.setAttribute("Id", "_" + i + "_" + j);

			if(arr[i][j]) {
				clone.style.background = "lime";
			} else {
				clone.style.background = "black"
			}
			middle.appendChild(clone);
		}
	}
}

function checkRow(id) {
	switch(id) {
		case -1:
			return row-1;
		case row:
			return 0;
		default:
			return id;		
	}	
}

function checkColl(id) {
	switch(id) {
		case -1:
			return coll-1;
		case coll:
			return 0;
		default:
			return id;		
	}	
}

function revise() {
	let newArr = arr;
	for(let i = 0; i < row; i++ ) {
		for(let j = 0; j < coll; j++ ) {
			let alives = 0;
				alives += arr[checkRow(i-1)][checkColl(j-1)];
				alives += arr[checkRow(i-1)][checkColl(j)];
				alives += arr[checkRow(i-1)][checkColl(j+1)];
				alives += arr[checkRow(i)][checkColl(j-1)];
				alives += arr[checkRow(i)][checkColl(j+1)];
				alives += arr[checkRow(i+1)][checkColl(j-1)];
				alives += arr[checkRow(i+1)][checkColl(j)];
				alives += arr[checkRow(i+1)][checkColl(j+1)];
				
			if(!arr[i][j]) {
				switch(alives) {
					case 3:
						newArr[i][j] = 1;
						break;
					default:
						newArr[i][j] = 0;	
				}
			} else {
				switch(alives) {
					case 2 || 3:
						newArr[i][j] = 1;
						break;
					default:
						newArr[i][j] = 0;		
				}
			}
			
			let bg = document.getElementById("_" + i + "_" + j);
			if(newArr[i][j]) {
				bg.style.background = "lime";
			} else {
				bg.style.background = "black";
			}	
		}
	}
	arr = newArr;
}

