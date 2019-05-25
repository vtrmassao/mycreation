// verificarAutenticacao();

function verificarAutenticacao() {
    if (sessionStorage.usuario_bandtec != undefined) {
        window.location.href = 'joguin.html';
    }
}

function logar() {
    console.log('EFETUANDO LOGIN...');
    
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch('/usuarios/login', {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {

            response.json().then(function (resposta) {

                sessionStorage.usuario_bandtec = resposta.nome;
               
                verificarAutenticacao();

            });
        } else {

            console.log('Erro de login!');
            alert('Login ou senha inválido.')
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
