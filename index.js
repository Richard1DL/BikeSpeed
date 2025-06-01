const form = document.getElementById('form');
const btn = document.getElementById('button');

form.addEventListener('submit', () => {
  btn.value = 'Enviando...';
  btn.disabled = true;
});
