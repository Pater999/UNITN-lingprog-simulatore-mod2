function avviaSimulazione() {

	var ndomande = $(inputnumerodomande).children("option:selected").val();
	var tempo = $(inputtempo).children("option:selected").val();
	var random = document.getElementById("checkboxrandom").checked;
	var string = "nrdomande=" + ndomande + "&tempo=" + tempo + "&random=" + random;
	location.href = 'questions.html?' + string;
}
