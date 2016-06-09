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
	var cachedResponse;
	fakeAjax(file, function(response) {
	  cachedResponse = response;
	});
	return function(cb) {
	  if (cachedResponse != null) {
            cb(cachedResponse);
	    return
	  }
	  var interval = setInterval(function() {
            if (cachedResponse != null) {
              cb(cachedResponse);
	      clearInterval(interval);
	      return
	    };
	  }, 100);
	}
}

var file1 = getFile("file1")
var file2 = getFile("file2")
var file3 = getFile("file3")

file1(function(file1Text) {
  output(file1Text);
  file2(function(file2Text) {
    output(file2Text);
    file3(function(file3Text) {
      output(file3Text);
      output("Complete.");
    })
  })
})
