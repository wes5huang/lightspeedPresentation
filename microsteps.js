// From https://github.com/rethna2/microsteps
// modified to cover 'spacebar' (32) and 'down arrow' (40) keyups

(function () {
	impress().init();
	var counter, microsteps;

	document.getElementById("impress").addEventListener("impress:stepenter", checkMicrosteps);
	document.getElementById("impress").addEventListener("impress:stepleave", removeShowClass);

	function checkMicrosteps() {
		counter = 0;

		var list = document.getElementsByClassName("present")[0].querySelectorAll(".microstep");

		microsteps = [].slice.call(list);
		microsteps.sort(function (a, b) {
			return Number(a.getAttribute("data-order")) - Number(b.getAttribute("data-order"));
		});
	}

	function removeShowClass() {
		counter = 0;

		microsteps.forEach(function (elem) {
			elem.classList.remove("show");
		});
	}

	document.addEventListener("keyup", function (event) {
		var keyCode = event.keyCode;

		if (keyCode !== 32 && keyCode !== 39 && keyCode !== 40) {
			removeShowClass();

		} else if (counter < microsteps.length) {
			event.stopImmediatePropagation();
			microsteps[counter++].classList.add("show");
		}
	}, true);
})();
