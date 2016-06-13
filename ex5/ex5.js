function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
  return ASQ().then(function(done) {
    fakeAjax(file, done);
  })
}

var f1 = getFile("file1")
var f2 = getFile("file2")
var f3 = getFile("file3")

f1
.then(function(done, msg) {
  output(msg);
  done();
})
.seq(function() {
  return f2;
})
.then(function(done, msg) {
  output(msg);
  done();
})
.seq(function() {
  return f3;
})
.then(function(done, msg) {
  output(msg);
})
