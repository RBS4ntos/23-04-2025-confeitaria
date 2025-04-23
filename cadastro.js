document.getElementById('frmCadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('txtNome').value;
    const login = document.getElementById('txtLogin').value;
    const senha = document.getElementById('txtSenha').value;
    const notificacao = document.getElementById('notificacao');
    const tipo = 'cadastro';

    const response = await fetch('/api/mysql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, login, senha, tipo })
    });

    const result = await response.json();
    console.log(result.message);
    notificacao.innerText = result.message;
});
