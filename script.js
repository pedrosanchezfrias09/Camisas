// Carrusel de imágenes y videos
document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  const elementos = tarjeta.querySelectorAll('.clickable-image');
  const izq = tarjeta.querySelector('.flecha.izq');
  const der = tarjeta.querySelector('.flecha.der');

  let index = 0; // AQUI IMPORTANTE: EMPEZAMOS en 0, NO busques quien tiene activa
  elementos.forEach((el, idx) => {
    if (el.classList.contains('activa')) {
      index = idx; // Encontramos quién tiene activa
    }
  });

  izq.addEventListener('click', () => {
    elementos[index].classList.remove('activa');
    if (elementos[index].tagName === 'VIDEO') elementos[index].pause();
    index = (index - 1 + elementos.length) % elementos.length;
    elementos[index].classList.add('activa');
    if (elementos[index].tagName === 'VIDEO') elementos[index].play();
  });

  der.addEventListener('click', () => {
    elementos[index].classList.remove('activa');
    if (elementos[index].tagName === 'VIDEO') elementos[index].pause();
    index = (index + 1) % elementos.length;
    elementos[index].classList.add('activa');
    if (elementos[index].tagName === 'VIDEO') elementos[index].play();
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

// Mostrar el modal (para imágenes y videos)
document.querySelectorAll('.clickable-image').forEach(el => {
  el.addEventListener('click', function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    modal.classList.add("mostrar");

    if (this.tagName === 'IMG') {
      modalImg.src = this.src;
      modalImg.style.display = "block";
      modalImg.nextElementSibling?.remove?.(); // borra video si había
    } else if (this.tagName === 'VIDEO') {
      const nuevoVideo = document.createElement('video');
      nuevoVideo.src = this.querySelector('source').src;
      nuevoVideo.autoplay = true;
      nuevoVideo.loop = true;
      nuevoVideo.muted = true;
      nuevoVideo.controls = true;
      nuevoVideo.style.maxWidth = "90%";
      nuevoVideo.style.maxHeight = "90%";
      modalImg.style.display = "none";
      modalImg.parentElement.appendChild(nuevoVideo);
    }
  });
});

// Cerrar modal con botón de cerrar
document.querySelector(".close").addEventListener("click", function () {
  cerrarModal();
});

// Cerrar modal haciendo clic fuera de la imagen
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) {
    cerrarModal();
  }
});

// Cerrar modal con tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    cerrarModal();
  }
});

// Función para cerrar y limpiar el modal
function cerrarModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.classList.remove("mostrar");

  // Borrar cualquier video que hayamos creado
  const videos = modal.querySelectorAll('video');
  videos.forEach(video => video.remove());

  modalImg.style.display = "block"; // vuelve a mostrar imagen por si era video antes
  modalImg.src = "";
}
