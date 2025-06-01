const form = document.getElementById('form');
const btn = document.getElementById('button');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // evitar envío tradicional
  btn.value = 'Enviando...';
  btn.disabled = true;

  const data = {
    title: form.title.value,
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwimiEIKWFsyiHuI1HPTdADBaXW9_UHexvGYiWWFO-XYedXeZ8Pma0VRnPQ6dGKHK8C/exec';

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(json => {
    btn.value = 'Enviar';
    btn.disabled = false;
    if(json.success){
      alert(`¡Registro enviado!\nNúmero de fila asignada: ${json.numeroFila}\nFecha asignada: ${json.fecha}`);
      form.reset();
    } else {
      alert('Hubo un problema al registrar tus datos.');
    }
  })
  .catch(error => {
    console.error(error);
    alert('Error de red al enviar formulario.');
    btn.value = 'Enviar';
    btn.disabled = false;
  });
});
