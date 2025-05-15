    // Função para carregar dados do usuário
    async function carregarDadosUsuario() {
        const usuarioLogado = localStorage.getItem('logado') === 'true';
        const usuarioData = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;

        console.log('Dados do usuário:', usuarioData);


        // Elementos da sidebar
        const nomeUsuario = document.getElementById('nomeUsuario');
        const emailUsuario = document.getElementById('emailUsuario');
        const avatarPadrao = document.getElementById('avatarPadrao');
        const logoutItem = document.getElementById('logoutItem');
        const loginItem = document.getElementById('loginItem');

        // Elementos da área de conteúdo
        const nomeCompleto = document.getElementById('nomeCompleto');
        const loginEmail = document.getElementById('loginEmail');
        const dataCadastro = document.getElementById('dataCadastro');

        if (usuarioLogado && usuarioData) {
            // Usuário logado - mostrar dados
            nomeUsuario.textContent = usuarioData.nome || 'Nome não definido';
            emailUsuario.textContent = usuarioData.login || 'Login não definido';
            nomeCompleto.textContent = usuarioData.nome || 'Nome não definido';
            loginEmail.textContent = usuarioData.login || 'Login não definido';
            dataCadastro.textContent = new Date().toLocaleDateString(); // Adapte para pegar do banco se necessário

            // Mostrar botão Sair
            logoutItem.style.display = 'block';
            loginItem.style.display = 'none';
        } else {
            // Usuário não logado
            nomeUsuario.textContent = 'Visitante';
            emailUsuario.textContent = 'Não logado';
            nomeCompleto.textContent = 'Faça login para ver seus dados';
            loginEmail.textContent = 'Faça login para ver seus dados';
            dataCadastro.textContent = 'Faça login para ver seus dados';

            // Mostrar ícone padrão
            avatarPadrao.style.display = 'block';

            // Mostrar botão Logar
            logoutItem.style.display = 'none';
            loginItem.style.display = 'block';
        }
    }

    // Função para deslogar
    function sairConta() {
        if (confirm('Tem certeza que deseja sair da sua conta?')) {
            localStorage.setItem('logado', 'false');
            localStorage.removeItem('usuario');
            carregarDadosUsuario();
            alert('Você foi deslogado com sucesso!');
        }
    }

    // Carregar dados quando a página for carregada
    window.onload = function() {
        carregarDadosUsuario();
    };