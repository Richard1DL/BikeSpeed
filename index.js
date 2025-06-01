const form = document.getElementById('form');
const btn = document.getElementById('button');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  btn.value = 'Enviando...';
  btn.disabled = true;

  const data = {
    title: form.title.value,
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  fetch('https://script.google.com/macros/s/your-script-id/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    btn.value = 'Enviar';
    btn.disabled = false;
    if(json.success) {
      alert(`¡Registro enviado!\nFila: ${json.numeroFila}\nFecha: ${json.fecha}`);
      form.reset();
    } else {
      alert('Error en el registro.');
    }
  })
  .catch(err => {
    alert('Error de red');
    btn.value = 'Enviar';
    btn.disabled = false;
    console.error(err);
  });
});
