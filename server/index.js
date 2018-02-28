const SerialPort = require('serialport'); //import package
const portNumber =  process.argv[2] || '/dev/ttyACM0'; // ambil argument ke 2 di command
console.log("Argument 2 :  " + portNumber); // nampilin port Number
const myPort = new SerialPort(portNumber, {
	baudRate : 57600
}); // buat object serial port

//parser biar ga nampilin buffer
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
	delimiter : '\r\n'
});

myPort.pipe(parser); // using parser 

// event yang dipanggil ketika serial port kebuka. pake 'open'
myPort.on('open', ()=> {
	console.log("Arduino Connected on" + portNumber);

	let timeOut = 3000; // 3detik
	setTimeout(()=> {
		// kirim command 1 ke arduino
		myPort.write('1', (err)=> {
			if(err)
				console.log(err); // munculin error
			else 
				console.log("success write 1"); // kalo ga error kasih notif
		});
	},timeOut);
});
// // event yang munculin data dari arduino. pake 'data'
// parser.on('data', (data)=> {
// 	//let hasilParsing = parsingRAWData(data, ",");
// 	//console.log(hasilParsing);
// 	//console.log(data);
// });



// EXPREES DAN SOCKET IO
const express = require('express'); // import package express
const app = express(); 
const server = require('http').createServer(app);
const io = require('socket.io').listen(server); // import package socket.io
const path = require('path'); // import package path (sudah default ada)

app.use(express.static(path.join(__dirname,'www'))); // untuk nempation file web kita di folder www
const portListen = 1234;
server.listen(portListen);

// buat socket event
let jumlahClient = 0;
io.on('connection' , (socket)=> {
	jumlahClient++;
	console.log('New Client Connected...\n'  + 'Total :' + jumlahClient);

	parser.on('data', (data)=>{
		//panggil si parsing
		// let hasilParsing = parsingRAWData(data, ",");
		// if(hasilParsing[0] == "OK"){
		// 	socket.emit('socketData',{datahasil : hasilParsing});
		// 	//console.log("Send to client");
		// }
		socket.emit('socketData',{datahasil :data});
	});	

	socket.on('disconnect' , ()=> {
		jumlahClient--;
		console.log('Client disconnected \n' + 'Total :' + jumlahClient);
	});

	socket.on('slowLED', (data)=> {
		myPort.write('4', (err)=> {
			if(err)
				console.log(err); // munculin error
			else 
				console.log("success write 4, slow LED"); // kalo ga error kasih notif
		});
	});

	socket.on('mediumLED', (data)=> {
		myPort.write('3', (err)=> {
			if(err)
				console.log(err); // munculin error
			else 
				console.log("success write 3, medium LED"); // kalo ga error kasih notif
		});
	});

	socket.on('fastLED', (data)=> {
		myPort.write('2', (err)=> {
			if(err)
				console.log(err); // munculin error
			else 
				console.log("success write 2, fast LED"); // kalo ga error kasih notif
		});
	});

	socket.on('turnOff', (data)=> {
		myPort.write('0', (err)=> {
			if(err)
				console.log(err); // munculin error
			else 
				console.log("success write 2, fast LED"); // kalo ga error kasih notif
		});
	});

	socket.on('turnOn', (data)=> {
		myPort.write('1', (err)=> {
			if(err)
				console.log(err); // munculin error
			else 
				console.log("success write 2, fast LED"); // kalo ga error kasih notif
		});
	});
});

// FUNCTION UNTUK PARSING
// argument 1 : data yang diparsing ex: 123 434 5334
// argument 2 : pemisah
// return array data [0] =123 [1] =434 [2] =5334
function parsingRAWData(data,delimiter){
	let result;
	result = data.toString().replace(/(\r\n|\n|\r)/gm,"").split(delimiter);

	return result;
}
