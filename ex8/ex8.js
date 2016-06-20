$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list"),
		active = true;

	var clicks = ASQ.react.of();
	var msgs = ASQ.react.of();

	$btn.click(function(evt){
	  clicks.push(evt);
	});

	function deactivate() {
	  active = false;
	  setTimeout(function() {
            active = true;
	  }, 500)
	}

	msgs
	.val(function(msg) {
          $list.append("<div>"+msg+"</div>");
	})

	clicks
	.val(function(evt) {
	  if (active) {
            msgs.push("clicked!");
	    deactivate();
	  }
	})

});
