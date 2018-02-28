function update(){
	const socket = io.connect();

	socket.on('socketData', (data)=>{
		console.log(data);

		// document.getElementById("receiveData").innerHTML = "Current LED ON " + data.datahasil;
		$("#receiveData").text("Current pin LED ON " + data.datahasil); 
	});

}

function slowLED(){
		const socket = io.connect();
		socket.emit('slowLED', true);
		$("#status").text("Slow");
		console.log("slow LED");
}

function mediumLED(){
	const socket = io.connect();
	socket.emit('mediumLED', true);
	$("#status").text("Medium");
	console.log("medium LED");
}

function fastLED(){
	const socket = io.connect();
	socket.emit('fastLED', true);
	$("#status").text("Fast");
	console.log("fast LED");
}

function startLED(){
	const socket = io.connect();
	socket.emit('turnOn', true);
	$("#onoroff").text("Turn On LED");
	console.log("On LED");
}

function stopLED(){
	const socket = io.connect();
	socket.emit('turnOff', true);
	$("#onoroff").text("Turn Off LED");
	console.log("Off LED");
}
