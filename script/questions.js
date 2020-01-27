var tempo;
var tempotot;
var nrdomande;
var random;

var timer;

var domandeProposte = new Array();
var risposteDate = new Array();
var risposteCorrette = new Array();
var domande;
var numDomandaCorrente;

function init() {
	tempo = getParameterByName('tempo');
	nrdomande = getParameterByName('nrdomande');
    random = getParameterByName('random');
	mescola = getParameterByName('mescola');

    if (tempo == undefined || nrdomande == undefined || random == undefined || mescola == undefined) {
        location.href = 'index.html';
    }
    else if ((!((random == "false") || (random == "true"))) || (!((mescola == "false") || (mescola == "true")))) {
        location.href = 'index.html';
    }
    else {
        loadJSON(function (response) {
            domande = JSON.parse(response);
            if (nrdomande > domande.length) {
                location.href = 'index.html';
            }
            else {
                if (nrdomande.toString() == "tutte") {
                    nrdomande = domande.length;
                }
                if (random == "true") {
                    domandeProposte = generateRandomNumbers(nrdomande);
                }
                else {
                    for (i = 0; i < nrdomande; i++) {
                        domandeProposte.push(i);
                    }
                }
                for (i = 0; i < domandeProposte.length; i++) {
                    risposteCorrette.push(domande[domandeProposte[i]].correct);
                }
                if (tempo != "inf") {
                    tempotot = tempo * 60 * 60 * 1000;
                    tempo = tempo * 60 * 60 * 1000;
                    timer = setInterval(function () {
                        tempo -= 1000;
                        var percentuale = (tempotot - tempo) * 100 / tempotot * 100;
                        if (percentuale >= 100) {
                            consegna();
                        }
                        str = "";
                        str += '<div class="progress" style="margin-bottom: 20px">'
                        str += '<div class="progress-bar" role="progressbar" style="width:' + percentuale + '%;" aria-valuenow="' + percentuale + '" aria-valuemin="0" aria-valuemax="100"></div>'
                        str += '</div>'
                        $(barraTempo).html(str);
                    }, 1000);
                }
                else {
                    str = "";
                    str += '<div class="progress" style="margin-bottom: 20px">'
                    str += '<div class="progress-bar" role="progressbar" style="width:100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>'
                    str += '</div>'
                    $(barraTempo).html(str);
                }
                caricaDomanda(0);
            }
        });
    }
}

function mescolaRisposte(ordine, n, num) {
    var str = "";
    switch (ordine) {
        case 0:
            str += '<div class="form-check">'
            if (risposteDate[num] == "optionA") {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionA" checked="checked">'
            }
            else {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionA">'
            }
            str += '<label class="form-check-label" for="optionA"> '
            str += domande[n].optionA;
            str += '</label>'
            str += '</div>'
            break;
        case 1:
            str += '<div class="form-check">'
            if (risposteDate[num] == "optionB") {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionB" checked="checked">'
            }
            else {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionB">'
            }
            str += '<label class="form-check-label" for="optionB">'
            str += domande[n].optionB;
            str += '</label>'
            str += '</div>'
            break;
        case 2:
            str += '<div class="form-check">'
            if (risposteDate[num] == "optionC") {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionC" checked="checked">'
            }
            else {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionC">'
            }
            str += '<label class="form-check-label" for="optionC">'
            str += domande[n].optionC;
            str += '</label>'
            str += '</div>'
            break;
        case 3:
            str += '<div class="form-check">'
            if (risposteDate[num] == "optionD") {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" id="optionD" onclick="handleClick(this)" checked="checked">'
            }
            else {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionD">'
            }
            str += '<label class="form-check-label" for="optionD">'
            str += domande[n].optionD;
            str += '</label>'
            str += '</div>'
            break;
        case 4:
            str += '<div class="form-check">'
            if (risposteDate[num] == "optionE") {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionE" checked="checked">'
            }
            else {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionE">'
            }
            str += '<label class="form-check-label" for="optionE">'
            str += domande[n].optionE;
            str += '</label>'
            str += '</div>'
            break;
        case 5:
            str += '<div class="form-check">'
            if (risposteDate[num] == "optionF") {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" id="optionF" onclick="handleClick(this)" checked="checked">'
            }
            else {
                str += '<input class="form-check-input" type="radio" name="exampleRadios" onclick="handleClick(this)" id="optionF">'
            }
            str += '<label class="form-check-label" for="optionF">'
            str += domande[n].optionF;
            str += '</label>'
            str += '</div>'
            break;
    }
    return str;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function caricaDomanda(num) {
	var numerodomanda = num + 1;
	numDomandaCorrente = num;
	var n = domandeProposte[num];
    
    randomOrder = [0, 1, 2];
    if (domande[n].optionD != "") {
        randomOrder.push(3);
    }
    if (domande[n].optionE != "") {
        randomOrder.push(4);
    }
    if (domande[n].optionF != "") {
        randomOrder.push(5);
    }
    if (mescola == "true") {
        shuffleArray(randomOrder);
    }
    
    str = "";
    for (i = 0; i < randomOrder.length; i++) {
        str += mescolaRisposte(randomOrder[i], n, num);
    }
	$(varieopzioni).html(str);
	str2 = numerodomanda + ". " + domande[n].question;
    $(domanda).html(str2);
    generaFooter(num);
}

function generaFooter(n) {
    
    str = "";
    str +=    '<nav aria-label="Page navigation">'
    str +=        '<ul class="pagination justify-content-center">'
    str +=            '<li class="page-item" onclick="caricaDomanda(0)">'
    str +=                '<p class="page-link" aria-label="First">'
    str +=                    '<span aria-hidden="true">&laquo;</span>'
    str +=                '</p>'
    str +=             '</li>'
    if (n - 1 != -1) {
        str +=         '<li class="page-item" onclick="caricaDomanda(' + (n - 1) + ')">'
    }
    else {
        str +=          '<li class="page-item disabled">'
    }
    str +=               ' <p class="page-link" aria-label="Previous">'
    str +=                   '<span aria-hidden="true" ><</span>'
	str +=				'</p>'
    str += '</li>'
    if (n < 3) {
        if ((n + 1) == 1) {
            str += '<li class="page-item active" onclick="caricaDomanda(0)"><p class="page-link">1</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="caricaDomanda(0)"><p class="page-link">1</p></li>'
        }
        if ((n + 1) == 2) {
            str += '<li class="page-item active" onclick="caricaDomanda(1)"><p class="page-link">2</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="caricaDomanda(1)"><p class="page-link">2</p></li>'
        }
        if ((n + 1) == 3) {
            str += '<li class="page-item active" onclick="caricaDomanda(2)"><p class="page-link">3</p></li>'
        } else {
            str += '<li class="page-item" onclick="caricaDomanda(2)"><p class="page-link">3</p></li>'
        }
        str += '<li class="page-item" onclick="caricaDomanda(3)"><p class="page-link">4</p></li>'
        str += '<li class="page-item" onclick="caricaDomanda(4)"><p class="page-link">5</p></li>'
    }
    else if (n > parseInt(nrdomande) - 4) {
        str += '<li class="page-item" onclick="caricaDomanda(' + (nrdomande - 5) + ')"><p class="page-link">' + (nrdomande - 4) + '</p></li>'
        str += '<li class="page-item" onclick="caricaDomanda(' + (nrdomande - 4) + ')"><p class="page-link">' + (nrdomande - 3) + '</p></li>'
        if ((n + 1) == parseInt(nrdomande) - 2) {
            str += '<li class="page-item active" onclick="caricaDomanda(' + (nrdomande - 3) + ')"><p class="page-link">' + (nrdomande - 2) + '</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="caricaDomanda(' + (nrdomande - 3) + ')"><p class="page-link">' + (nrdomande - 2) + '</p></li>'
        }
        if ((n + 1) == parseInt(nrdomande) - 1) {
            str += '<li class="page-item active" onclick="caricaDomanda(' + (nrdomande - 2) + ')"><p class="page-link">' + (nrdomande - 1) + '</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="caricaDomanda(' + (nrdomande - 2) + ')"><p class="page-link">' + (nrdomande - 1) + '</p></li>'
        }
        if ((n + 1) == parseInt(nrdomande)) {
            str += '<li class="page-item active" onclick="caricaDomanda(' + (nrdomande - 1) + ')"><p class="page-link">' + (nrdomande) + '</p></li>'
        } else {
            str += '<li class="page-item" onclick="caricaDomanda(' + (nrdomande - 1) + ')"><p class="page-link">' + (nrdomande) + '</p></li>'
        }
    }
    else {
        str += '<li class="page-item" onclick="caricaDomanda(' + (n-2) + ')"><p class="page-link">' + (n-1) + '</p></li>'
        str += '<li class="page-item" onclick="caricaDomanda(' + (n-1) + ')"><p class="page-link">' + (n) + '</p></li>'
        str += '<li class="page-item active" onclick="caricaDomanda(' + (n) + ')"><p class="page-link">' + (n+1) + '</p></li>'
        str += '<li class="page-item" onclick="caricaDomanda(' + (n+1) + ')"><p class="page-link">' + (n+2) + '</p></li>'
        str += '<li class="page-item" onclick="caricaDomanda(' + (n+2) + ')"><p class="page-link">' + (n+3) + '</p></li>'
    }

   
    if ((n + 1) != parseInt(nrdomande)) {
        str += '<li class="page-item" onclick="caricaDomanda(' + (n + 1) + ')">'
    }
    else {
        str += '<li class="page-item disabled">'
    }
    str +=                      '<p class="page-link" aria-label="Next">'
    str +=                          '<span aria-hidden="true">></span>'
    str +=                      '</p>'
    str +=                '</li>'
    str +=                '<li class="page-item" onclick="caricaDomanda(' + (nrdomande - 1) + ')">'
    str +=                      '<p class="page-link" aria-label="Last">'
    str +=                          '<span aria-hidden="true" >&raquo;</span>'
    str +=                    '</p>'
    str +=                '</li>'
	str +=		'</ul>'
    str +=	'</nav>'
    $(footer).html(str);
}

function handleClick(option) {
    risposteDate[numDomandaCorrente] = option.id.toString();
}





function generateRandomNumbers(n) {
	var arr = []
    while (arr.length < n) {
        var r = Math.floor(Math.random() * (domande.length));
		if (arr.indexOf(r) === -1) arr.push(r);
    }
	return arr;
}
	

function consegnaClick() {
    domandeRisposte = 0;
    for (i = 0; i < risposteDate.length; i++) {
        if (risposteDate[i] != undefined) {
            domandeRisposte++;
        }
    }
    conferma = window.confirm("Sei sicuro di voler consegnare??\nHai risposto a " + domandeRisposte + " domande su " + domandeProposte.length);
    if (conferma == true) {
        consegna();
    }
}

	

function consegna() {
    clearInterval(timer);
    numeroRisposteCorrette = 0;
    for (i = 0; i < domandeProposte.length; i++)
    {
        if (risposteCorrette[i] == risposteDate[i]) {
            numeroRisposteCorrette++;
        }
    }
    let voto30 = roundTo((numeroRisposteCorrette / domandeProposte.length * 30), 2)

    str = "";
    if (voto30 >= 18) {
        str += '<button type="button" class="btn btn-success btn-lg btn-block">Sei stato promosso \u{1F389}\u{1F389}\u{1F389}</button>'
    }
    else {
        str += '<button type="button" class="btn btn-danger btn-lg btn-block">Sei stato bocciato \u{1F625}</button><br>'
    }
    
    str += "\u{25B6} <b>Risposte corrette:</b> " + numeroRisposteCorrette + "/" + domandeProposte.length + "<br>";
    str += "\u{25B6} <b>Percentuale risposte corrette:</b> " + roundTo((numeroRisposteCorrette / domandeProposte.length * 100), 2) + "%<br>";
    str += "\u{25B6} <b>Voto in 30esimi:</b> " + voto30 + "<br>";
    if (tempo != "inf") {
        str += "\u{25B6} <b>Tempo utilizzato:</b> " + msToTime((tempotot - tempo)) + "<br>";
        str += "\u{25B6} <b>Percentuale tempo utilizzato:</b> " + roundTo(((tempotot - tempo) / tempotot * 100), 2) + "%<br>";
    }
    else {
        str += "\u{25B6} <b>Tempo utilizzato:</b> / <br>";
        str += "\u{25B6} <b>Percentuale tempo utilizzato:</b> / <br>";
    }
    str += "<h5 style='margin-top:10px'>Risposte:</h5>"
    str += "<div class='row' style='margin-left:0px;margin-top:-5px'>"
    for (i = 0; i < domandeProposte.length; i++) {
        if (risposteCorrette[i] == risposteDate[i]) {
            //str += "<b style='color:lightgreen;'>" + (i + 1) + '&nbsp;&nbsp;&nbsp;</b>';
            str += '<button type="button"  class="btn btn-success btn-sm" disabled style="background-color:green;border-radius: 0 0 0 0">' + (i + 1) + '</button>' + ''
        }
        else {
            //str += "<b style='color:red;'>" + (i + 1) + '&nbsp;&nbsp;&nbsp;</b>';
            str += '<button type="button"  class="btn btn-danger btn-sm" disabled style="background-color:red;border-radius: 0 0 0 0">' + (i + 1) + '</button>' + ''
        }
    }
    str += "</div>&nbsp;"

    $('#result').html(str);

    $('#modalRisultati').modal({
        keyboard: false,
        backdrop: false
    })
    $('#modalRisultati').modal('show')
    $('#btnConsegna').attr("onclick", "$('#modalRisultati').modal('show')");
    $('#btnConsegna').attr("class", "btn btn-primary");
    $('#btnConsegna').html("Risultati");
    showResult(0);
}

function showResult(num) {
    var numerodomanda = num + 1;
    var n = domandeProposte[num];

    if (risposteDate[num] == risposteCorrette[num]) {
        console.log("ciao");
        $('#jumbotronRisposte').attr("style", "background-color:rgba(144,238,144,.8) !important");
    }
    else {
        $('#jumbotronRisposte').attr("style", "background-color:rgba(240,128,128,.8) !important");
    }

    var str = "";
    str += '<div class="form-check">'
    if (risposteDate[num] == "optionA") {
        str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionA" checked="checked">'
    }
    else {
        str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionA">'
    }
    str += '<label class="form-check-label" for="optionA">'
    if (risposteCorrette[num] == "optionA") {
        str += '<b>' + domande[n].optionA + '</b>';
    }
    else {
        str += domande[n].optionA;
    }
    str += '</label>'
    str += '</div>'
    str += '<div class="form-check">'
    if (risposteDate[num] == "optionB") {
        str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionB" checked="checked">'
    }
    else {
        str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionB">'
    }
    str += '<label class="form-check-label" for="optionB">'
    if (risposteCorrette[num] == "optionB") {
        str += '<b>' + domande[n].optionB + '</b>';
    }
    else {
        str += domande[n].optionB;
    }
    str += '</label>'
    str += '</div>'
    str += '<div class="form-check">'
    if (risposteDate[num] == "optionC") {
        str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionC" checked="checked">'
    }
    else {
        str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionC">'
    }
    str += '<label class="form-check-label" for="optionC">'
    if (risposteCorrette[num] == "optionC") {
        str += '<b>' + domande[n].optionC + '</b>';
    }
    else {
        str += domande[n].optionC;
    }
    str += '</label>'
    str += '</div>'
    if (domande[n].optionD != "") {
        str += '<div class="form-check">'
        if (risposteDate[num] == "optionD") {
            str += '<input class="form-check-input" disabled type="radio" name="exampleRadios" id="optionD"  checked="checked">'
        }
        else {
            str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionD">'
        }
        str += '<label class="form-check-label" for="optionD">'
        if (risposteCorrette[num] == "optionD") {
            str += '<b>' + domande[n].optionD + '</b>';
        }
        else {
            str += domande[n].optionD;
        }
        str += '</label>'
        str += '</div>'
    }
    if (domande[n].optionE != "") {
        str += '<div class="form-check">'
        if (risposteDate[num] == "optionE") {
            str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionE" checked="checked">'
        }
        else {
            str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionE">'
        }
        str += '<label class="form-check-label" for="optionE">'
        if (risposteCorrette[num] == "optionE") {
            str += '<b>' + domande[n].optionE + '</b>';
        }
        else {
            str += domande[n].optionE;
        }
        str += '</label>'
        str += '</div>'
    }
    if (domande[n].optionF != "") {
        str += '<div class="form-check">'
        if (risposteDate[num] == "optionF") {
            str += '<input class="form-check-input" disabled type="radio" name="exampleRadios" id="optionF"  checked="checked">'
        }
        else {
            str += '<input class="form-check-input" disabled type="radio" name="exampleRadios"  id="optionF">'
        }
        str += '<label class="form-check-label" for="optionF">'
        if (risposteCorrette[num] == "optionF") {
            str += '<b>' + domande[n].optionF + '</b>';
        }
        else {
            str += domande[n].optionF;
        }
        str += '</label>'
        str += '</div>'
    }
    $(varieopzioni).html(str);
    str2 = "<b>" + numerodomanda + ". " + domande[n].question + "</b>";
    $(domanda).html(str2);
    generaFooterResult(num);
}

function generaFooterResult(n) {

    str = "";
    str += '<nav aria-label="Page navigation">'
    str += '<ul class="pagination justify-content-center">'
    str += '<li class="page-item" onclick="showResult(0)">'
    str += '<p class="page-link" aria-label="First">'
    str += '<span aria-hidden="true">&laquo;</span>'
    str += '</p>'
    str += '</li>'
    if (n - 1 != -1) {
        str += '<li class="page-item" onclick="showResult(' + (n - 1) + ')">'
    }
    else {
        str += '<li class="page-item disabled">'
    }
    str += ' <p class="page-link" aria-label="Previous">'
    str += '<span aria-hidden="true" ><</span>'
    str += '</p>'
    str += '</li>'
    if (n < 3) {
        if ((n + 1) == 1) {
            str += '<li class="page-item active" onclick="showResult(0)"><p class="page-link">1</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="showResult(0)"><p class="page-link">1</p></li>'
        }
        if ((n + 1) == 2) {
            str += '<li class="page-item active" onclick="showResult(1)"><p class="page-link">2</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="showResult(1)"><p class="page-link">2</p></li>'
        }
        if ((n + 1) == 3) {
            str += '<li class="page-item active" onclick="showResult(2)"><p class="page-link">3</p></li>'
        } else {
            str += '<li class="page-item" onclick="showResult(2)"><p class="page-link">3</p></li>'
        }
        str += '<li class="page-item" onclick="showResult(3)"><p class="page-link">4</p></li>'
        str += '<li class="page-item" onclick="showResult(4)"><p class="page-link">5</p></li>'
    }
    else if (n > parseInt(nrdomande) - 4) {
        str += '<li class="page-item" onclick="showResult(' + (nrdomande - 5) + ')"><p class="page-link">' + (nrdomande - 4) + '</p></li>'
        str += '<li class="page-item" onclick="showResult(' + (nrdomande - 4) + ')"><p class="page-link">' + (nrdomande - 3) + '</p></li>'
        if ((n + 1) == parseInt(nrdomande) - 2) {
            str += '<li class="page-item active" onclick="showResult(' + (nrdomande - 3) + ')"><p class="page-link">' + (nrdomande - 2) + '</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="showResult(' + (nrdomande - 3) + ')"><p class="page-link">' + (nrdomande - 2) + '</p></li>'
        }
        if ((n + 1) == parseInt(nrdomande) - 1) {
            str += '<li class="page-item active" onclick="showResult(' + (nrdomande - 2) + ')"><p class="page-link">' + (nrdomande - 1) + '</p></li>'
        }
        else {
            str += '<li class="page-item" onclick="showResult(' + (nrdomande - 2) + ')"><p class="page-link">' + (nrdomande - 1) + '</p></li>'
        }
        if ((n + 1) == parseInt(nrdomande)) {
            str += '<li class="page-item active" onclick="showResult(' + (nrdomande - 1) + ')"><p class="page-link">' + (nrdomande) + '</p></li>'
        } else {
            str += '<li class="page-item" onclick="showResult(' + (nrdomande - 1) + ')"><p class="page-link">' + (nrdomande) + '</p></li>'
        }
    }
    else {
        str += '<li class="page-item" onclick="showResult(' + (n - 2) + ')"><p class="page-link">' + (n - 1) + '</p></li>'
        str += '<li class="page-item" onclick="showResult(' + (n - 1) + ')"><p class="page-link">' + (n) + '</p></li>'
        str += '<li class="page-item active" onclick="showResult(' + (n) + ')"><p class="page-link">' + (n + 1) + '</p></li>'
        str += '<li class="page-item" onclick="showResult(' + (n + 1) + ')"><p class="page-link">' + (n + 2) + '</p></li>'
        str += '<li class="page-item" onclick="showResult(' + (n + 2) + ')"><p class="page-link">' + (n + 3) + '</p></li>'
    }


    if ((n + 1) != parseInt(nrdomande)) {
        str += '<li class="page-item" onclick="showResult(' + (n + 1) + ')">'
    }
    else {
        str += '<li class="page-item disabled">'
    }
    str += '<p class="page-link" aria-label="Next">'
    str += '<span aria-hidden="true">></span>'
    str += '</p>'
    str += '</li>'
    str += '<li class="page-item" onclick="showResult(' + (nrdomande - 1) + ')">'
    str += '<p class="page-link" aria-label="Last">'
    str += '<span aria-hidden="true" >&raquo;</span>'
    str += '</p>'
    str += '</li>'
    str += '</ul>'
    str += '</nav>'
    $(footer).html(str);
}

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
    xobj.open('GET', 'script/questions.json', true); // Replace 'my_data' with the path to your file
    xobj.setRequestHeader("Access-Control-Allow-Origin", "*")
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}


function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function msToTime(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}

function roundTo(value, decimalpositions) {
    var i = value * Math.pow(10, decimalpositions);
    i = Math.round(i);
    return i / Math.pow(10, decimalpositions);
}


window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();
  // Chrome requires returnValue to be set
    e.returnValue = 'Leaving this page will reset the wizard';
});
