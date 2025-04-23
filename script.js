// Carrusel de imágenes
document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    const imgs = tarjeta.querySelectorAll('img');
    const izq = tarjeta.querySelector('.flecha.izq');
    const der = tarjeta.querySelector('.flecha.der');
    let index = 0;
  
    izq.addEventListener('click', () => {
      imgs[index].classList.remove('activa');
      index = (index - 1 + imgs.length) % imgs.length;
      imgs[index].classList.add('activa');
    });
  
    der.addEventListener('click', () => {
      imgs[index].classList.remove('activa');
      index = (index + 1) % imgs.length;
      imgs[index].classList.add('activa');
    });
  });
  
  // Enviar mensaje a WhatsApp
  function enviarWhatsApp(boton) {
    const tarjeta = boton.closest('.tarjeta');
    const modelo = tarjeta.querySelector('.modelo').innerText.replace('Modelo: ', '');
    const talla = tarjeta.querySelector('.talla').value;
    const cantidad = tarjeta.querySelector('.cantidad').value;
    const color = tarjeta.querySelector('.color').value;
    const numeros = ['3335820075', '3318395891', '3334693557'];
    const numero = numeros[Math.floor(Math.random() * numeros.length)];
  
    const mensaje = `Hola, quiero comprar la camisa modelo *${modelo}* en talla *${talla}*, en color *${color}* y cantidad *${cantidad}*.`;
    const url = `https://wa.me/52${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
  