
function cadastrar() {
    console.log('ENVIANDO PERSONAGENS');

    aguardar();
    var formulario = new URLSearchParams(new FormData(form_parte1));
    fetch('/usuarios/cadastrar', {
        method: "POST",
        body: formulario
    }).then(function (response) {

        if (response.ok) {
            alert('Personagens enviados!');
            finalizar_aguardar();
            window.location.href = 'parte_final.html';
        } else {
            console.log('Erro no envio!');
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    finalbutton.disabled = true;
}

function finalizar_aguardar() {
    finalbutton.disabled = false;
}
