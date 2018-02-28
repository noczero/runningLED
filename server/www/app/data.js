function update(){
	const socket = io.connect();

	socket.on('socketData', (data)=>{
		console.log(data);

		document.getElementById("receiveData").innerHTML = "Current LED ON " + data.datahasil;
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

