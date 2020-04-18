var groups = 2;

$(document).ready(function() {
    $(".show").hide();

	var members = [];

	function add(feedback) {
		var name = $("#name").val();

		if(name == "") {
			if(feedback) alert("Bitte gib einen Namen ein.");
		} else if(name.length > 32) {
			if(feedback) alert("Bitte gib einen kürzeren Namen ein.");
		} else if(name.search(/^[\w.,äÄöÖüÜß-\s]+$/g) < 0) {
			if(feedback) alert("Bitte gib nur Buchstaben, Zahlen und Satzzeichen ein.");
		} else if(members.includes(name)) {
			if(feedback) alert("Du hast diese Person bereits hinzugefügt.");
		} else {
			members[members.length] = name;
			console.log("Adding '" + name + "'");
			console.log(members);
			$("#name").val("");

			$("#box").append('<p class="member hide">- ' + name + '</p>');
			$(".member").show(250);
            $("#anz").text("Anzahl: " + members.length);

            $("#hadded").text("Hinzugefügte Personen:");

		}

		$("#name").focus();
	}

	$("#name").on('search', function () {
		add(true);
	});

	$("#add").click(function() {
		add(true);
	});

	$("#clear").click(function() {
		location.reload();
	});

	function getRndInteger(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) ) + min;
	}

	$("#create").click(function() {

		var name = $("#name").val();
		if(name != undefined && name != null && name != "") {
		    add(false);
		}

		if(members.length > 1) {

			var randomized = [];
			for(var i = 0; i < members.length; i++) {
				var r = getRndInteger(0, members.length - 1);
				while(randomized[r] != undefined) {
					r = getRndInteger(0, members.length - 1);
				}
				randomized[r] = members[i];
			}

			members = randomized;

			for(var i = 0; i < groups; i++) {
				$("#box").append('<h2 class="group" id="group' + i + '">Gruppe ' + (i + 1) + ':</h2>');
			}

			var count = 0;
			for(var i = 0; i < members.length; i++) {
				console.log("Gruppe " + (count + 1) + ": " + members[i]);
				$('<p class="groupmember">- ' + members[i] + '</p>').insertAfter("#group" + count);
				if(count == (groups - 1)) {
					count = 0;
				} else {
					count++;
				}
			}

            $(".hide").hide();
            $(".show").show();

		} else {
			alert("Bitte füge mehr Personen der Gruppe hinzu.");
		}

	});

	$("#back").click(function() {
	    $(".group").remove();
	    $(".groupmember").remove();
        $(".hide").show();
        $(".show").hide();
	});
});

window.onload = function () {
    document.querySelector("#slider").addEventListener ("input", function () {
        groups = this.value;
       $("#groupcount").text("Gruppen: " + groups);
    });
}
