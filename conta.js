// window.onload = function() {
//     carregarDadosUsuario();
//     document.getElementById('btnSair').addEventListener('click', sairConta);
// };
// // Função para carregar dados do usuário
// async function carregarDadosUsuario() {
//     const nomeTitulo = document.getElementById("nomeTitulo");
//     const emailTitulo = document.getElementById("emailTitulo");
//     const fotoPerfil = document.getElementById("fotoPerfil");
//     const areaUsuario = document.getElementById("areaUsuario");

//     if (localStorage.getItem('logado') === 'true' && localStorage.getItem('usuario')) {
//         try {
//             const usuario = JSON.parse(localStorage.getItem('usuario'));
            
//             // Exibe os dados do usuário
//             nomeTitulo.innerText = usuario.nome || "Nome não definido";
//             emailTitulo.innerText = usuario.login || "Login não definido";
            
//             // Exibe a foto se existir
//             if (usuario.foto) {
//                 fotoPerfil.src = usuario.foto;
//                 fotoPerfil.style.display = 'block';
//             } else {
//                 fotoPerfil.style.display = 'none';
//             }
            
//             // Mostra a área logada
//             areaUsuario.style.display = 'block';
            
//         } catch (error) {
//             console.error("Erro ao carregar usuário:", error);
//             deslogarUsuario();
//         }
//     } else {
//         deslogarUsuario();
//     }
// }

// // Função para deslogar
// function sairConta() {
//     if (localStorage.getItem('logado') !== 'true') {
//         alert("Você já está deslogado!");
//     } else {
//         if (confirm("Tem certeza que deseja sair da conta?")) {
//             deslogarUsuario();
//             alert("Você foi deslogado com sucesso!");
//         }
//     }
// }

// // Função auxiliar para deslogar
// function deslogarUsuario() {
//     localStorage.setItem('logado', 'false');
//     localStorage.removeItem('usuario');
    
//     document.getElementById("nomeTitulo").innerText = "Você está deslogado!";
//     document.getElementById("emailTitulo").innerText = "Faça login para acessar seu perfil";
//     document.getElementById("fotoPerfil").style.display = 'none';
//     document.getElementById("areaUsuario").style.display = 'none';
// }

// // Atualizar ao carregar a página
    
// // Adicione este evento ao seu botão de sair

// function sairConta() {
//      if (localStorage.getItem('logado') == 'false') {
//         alert("Você já está deslogado!");
//     } else  {
//         alert("Sua conta foi removida com sucesso!");
//         localStorage.setItem('logado', 'false');
//     }   
// }


    // Função para carregar dados do usuário
    async function carregarDadosUsuario() {
        const usuarioLogado = localStorage.getItem('logado') === 'true';
        const usuarioData = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;

        // Elementos da sidebar
        const nomeUsuario = document.getElementById('nomeUsuario');
        const emailUsuario = document.getElementById('emailUsuario');
        const fotoPerfil = document.getElementById('fotoPerfil');
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

            // Foto do perfil
            if (usuarioData.foto) {
                fotoPerfil.src = usuarioData.foto;
                fotoPerfil.style.display = 'block';
                avatarPadrao.style.display = 'none';
            } else {
                fotoPerfil.style.display = 'none';
                avatarPadrao.style.display = 'block';
            }

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
            fotoPerfil.style.display = 'none';
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