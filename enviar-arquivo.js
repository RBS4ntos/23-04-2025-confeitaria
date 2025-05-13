document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        const res = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        alert(data.message || 'Imagem enviada!');
    } catch (err) {
        alert('Erro ao enviar imagem.');
        console.error(err);
    }
});