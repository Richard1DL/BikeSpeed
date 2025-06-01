const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  btn.value = 'Enviando...';

  const form = this;

  const data = {
    title: form.title.value,       // RUT
    name: form.name.value,       // Nombre
    email: form.email.value,     // Correo
    message: form.message.value    // Teléfono
  };

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwimiEIKWFsyiHuI1HPTdADBaXW9_UHexvGYiWWFO-XYedXeZ8Pma0VRnPQ6dGKHK8C/exec';

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    btn.value = 'Enviar';
    if (json.success) {
      alert(`¡Registro enviado!\nNúmero de fila asignada: ${json.numeroFila}\nFecha asignada: ${json.fecha}`);
      form.reset();
    } else {
      alert('Hubo un problema al registrar tus datos.');
    }
  })
  .catch(err => {
    console.error(err);
    alert('Error de red al enviar formulario.');
    btn.value = 'Enviar';
  });
});
