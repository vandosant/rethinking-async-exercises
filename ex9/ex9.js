$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list");
	var chan = ASQ.csp.chan();
        var msgs = ASQ.csp.chan();
        var queued = false;

	$btn.click(function(e) {
	  if (!queued) {
	    var pr = ASQ.csp.putAsync(chan, e)
	    queued = true;
	    pr.then(function() {
              queued = false;
	    })
	  }
	});

        ASQ().runner(
          ASQ.csp.go(function *process1() {
	    while (true) {
	      yield ASQ.csp.take(ASQ.csp.timeout(1000));
              yield ASQ.csp.take(chan);
	      ASQ.csp.put(msgs, "clicked!");
	    }
	  }),
	  ASQ.csp.go(function *process2() {
            while (true) {
              var msg = yield ASQ.csp.take(msgs);
	      $list.append('<div>'+msg+'</div>');
	    }
	  })
	)
	// TODO: setup sampling go-routine and
	// channel, populate $list
});
