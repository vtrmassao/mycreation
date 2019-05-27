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
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                play1.src = resposta.pers_play1;
                play2.src = resposta.pers_play2;
                play1_div.style.width = Number(resposta.pers_vida1)+"px";
                play2_div.style.width = Number(resposta.pers_vida2)+"px";
                pl1.innerHTML=resposta.nome1_jog;
                pl2.innerHTML=resposta.nome2_jog;
                btn_play1.innerHTML=`${resposta.nome1_jog} utilize a tecla Q`
                btn_play2.innerHTML=`${resposta.nome2_jog} utilize a tecla P`
                // play1_div.style.width = life2 + "px";
                // play2_div.style.width = life1 + "px";
            });
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
