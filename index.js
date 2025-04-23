window.onload = function () {
    const loginModalEl = document.getElementById('welcomeModal');
    const loginModal = new bootstrap.Modal(loginModalEl);

    const cadastroModalEl = document.getElementById('cadastroModal');
    const cadastroModal = new bootstrap.Modal(cadastroModalEl);
    
    if (localStorage.getItem('logado') !== 'true') {
        loginModal.show();
    }

    document.getElementById('abrirCadastro').addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.hide();
        setTimeout(() => cadastroModal.show(), 500); // Espera para transição ficar suave
    });

    document.getElementById('voltarLogin').addEventListener('click', (e) => {
        e.preventDefault();
        cadastroModal.hide();
        setTimeout(() => loginModal.show(), 500); // Espera para transição ficar suave
    });

    document.getElementById('frmLogin').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('txtNome').value;
        const login = document.getElementById('txtLogin').value;
        const senha = document.getElementById('txtSenha').value;
        const notificacao = document.getElementById('notificacao');
        const tipo = 'login';

        try {
            const response = await fetch('/api/mysql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, login, senha, tipo })
            });

            const result = await response.json();
            console.log(result.message);
            notificacao.innerText = result.message;

            // Se o login for bem-sucedido (você pode ajustar a condição de sucesso como quiser)
            if (result.success || result.message.toLowerCase().includes("sucesso")) {
                localStorage.setItem('logado', 'true');
                bootstrap.Modal.getInstance(loginModalEl).hide();
            }

        } catch (error) {
            console.error('Erro ao enviar login:', error);
            notificacao.innerText = 'Erro na conexão com o servidor.';
        }
    });

    document.getElementById('frmCadastro').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('cadNome').value;
        const login = document.getElementById('cadLogin').value;
        const senha = document.getElementById('cadSenha').value;
        const confirma = document.getElementById('cadConfirmaSenha').value;
        const notificacaoCadastro = document.getElementById('notificacaoCadastro');
        const tipo = 'cadastro';
    

        if (senha !== confirma) {
            notificacaoCadastro.innerText = 'As senhas não coincidem.';
            return;
        } else{

            const response = await fetch('/api/mysql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, login, senha, tipo })
            });
        
            const result = await response.json();
            console.log(result.message);
            notificacaoCadastro.innerText = result.message;

            if (result.success || result.message.toLowerCase().includes("sucesso")) {
                notificacaoCadastro.innerText = result.message;
            }
        }
    });


    
};

function abrirMenu() {
    document.getElementById("sidebar").style.width = "250px";
  }

  function fecharMenu() {
    document.getElementById("sidebar").style.width = "0";
  }
