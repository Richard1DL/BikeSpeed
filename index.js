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

  fetch('https://script.google.com/macros/s/AKfycbwimiEIKWFsyiHuI1HPTdADBaXW9_UHexvGYiWWFO-XYedXeZ8Pma0VRnPQ6dGKHK8C/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Error en la respuesta del servidor');
    return res.json();
  })
  .then(json => {
    btn.value = 'Enviar';
    btn.disabled = false;
    if (json.success) {
      alert(`¡Registro enviado!\nFila: ${json.numeroFila}\nFecha: ${json.fecha}`);
      form.reset();
    } else {
      alert('Error en el registro: ' + (json.error || 'Desconocido'));
    }
  })
  .catch(err => {
    alert('Error de red: ' + err.message);
    btn.value = 'Enviar';
    btn.disabled = false;
    console.error(err);
  });
});
