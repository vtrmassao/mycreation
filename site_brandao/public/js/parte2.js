var som1 = new Audio();
var som2 = new Audio();
var som3 = new Audio();
som1.src = 'https://www.soundjay.com/phone/sounds/cell-phone-flip-1.mp3';
som2.src = 'pers/final.mp3';
som3.src = 'pers/selection.wav';

function entrar() {

    console.log('Trazendo personagens...');

    aguardar();
    fetch('/usuarios/entrar', {
        method: "POST"
    }).then(function (response, person1, person2) {
        if (response.ok) {
            play1.src = res.consulta.recordset[0].pers_play1;
            play2.src = res.consulta.recordset[0].pers_play2;
            if (count >= 0) {
                count--;
                if (Number(count) == 0) {
                    count = "PREPAREM-SE";
                }
                else if (count < 10) {
                    count = "0" + count;
                }
                contagem.innerHTML = count;
                setTimeout('start(); som1.play();', 1000);
            }
            else {
                contagem.style.display = "none";
                alert('Comecem!');
                butt.style.display = 'none';
                final.style.display = 'inline'
                som2.play();
            }
        } else {
            console.log('Erro !');
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    btn_entrar.disabled = true;
}

function finalizar_aguardar() {
    btn_entrar.disabled = false;
}
