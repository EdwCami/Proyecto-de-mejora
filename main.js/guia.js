document.addEventListener('DOMContentLoaded', function () {
  const sectionFiles = {
    'crear-encuesta': '../Pages.html/crear-encuesta.html',
    'condiciones-logicas': '../Pages.html/personalizar-encuesta.html',
    'tipos-de-preguntas': '../Pages.html/tipos-de-preguntas.html',
    // Puedes agregar más secciones aquí si creas más archivos
  };

  function setupImageLightbox() {
    // Agregar el contenedor del modal si no existe
    if (!document.getElementById('img-lightbox-modal')) {
      const modal = document.createElement('div');
      modal.id = 'img-lightbox-modal';
      modal.className = 'img-lightbox-modal';
      modal.innerHTML = `
        <div class="close-area"></div>
        <img src="" alt="Imagen ampliada" />
      `;
      document.body.appendChild(modal);
    }
    const modal = document.getElementById('img-lightbox-modal');
    const modalImg = modal.querySelector('img');
    const closeArea = modal.querySelector('.close-area');

    // Delegar evento en imágenes de la sección cargada
    const section = document.querySelector('.personalizar-section');
    if (section) {
      section.querySelectorAll('img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function (e) {
          modalImg.src = this.src;
          modalImg.alt = this.alt || '';
          modal.classList.add('active');
        });
      });
    }
    // Cerrar modal al hacer click fuera de la imagen
    closeArea.onclick = function () {
      modal.classList.remove('active');
      modalImg.src = '';
    };
    // Cerrar modal con ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
        modalImg.src = '';
      }
    });
  }

  function setupImageLightboxGuia() {
    // Agregar el contenedor del modal si no existe
    if (!document.getElementById('img-lightbox-modal')) {
      const modal = document.createElement('div');
      modal.id = 'img-lightbox-modal';
      modal.className = 'img-lightbox-modal';
      modal.innerHTML = `
        <div class="close-area"></div>
        <img src="" alt="Imagen ampliada" />
      `;
      document.body.appendChild(modal);
    }
    const modal = document.getElementById('img-lightbox-modal');
    const modalImg = modal.querySelector('img');
    const closeArea = modal.querySelector('.close-area');

    // Delegar evento en imágenes de la sección cargada
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.querySelectorAll('img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function (e) {
          modalImg.src = this.src;
          modalImg.alt = this.alt || '';
          modal.classList.add('active');
        });
      });
    }
    // Cerrar modal al hacer click fuera de la imagen
    closeArea.onclick = function () {
      modal.classList.remove('active');
      modalImg.src = '';
    };
    // Cerrar modal con ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
        modalImg.src = '';
      }
    });
  }

  function loadSection(section) {
    const file = sectionFiles[section];
    if (!file) return;
    fetch(file)
      .then(res => res.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        // Lightbox para cualquier sección cargada
        setupImageLightboxGuia();
      });
  }

  // Cargar la sección inicial
  loadSection('crear-encuesta');

  // Asignar eventos a los botones del menú lateral
  document.querySelectorAll('aside button').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Quitar la clase activa de todos los botones
      document.querySelectorAll('aside button').forEach(b => b.classList.remove('sidebar-btn-active'));
      // Agregar la clase activa al botón seleccionado
      this.classList.add('sidebar-btn-active');
      if (this.textContent.includes('Crear encuesta')) {
        loadSection('crear-encuesta');
      } else if (this.textContent.includes('Personalizar encuesta')) {
        loadSection('condiciones-logicas');
      } else if (this.textContent.includes('Tipos de preguntas')) {
        loadSection('tipos-de-preguntas');
      } // Puedes agregar más condiciones para otras secciones
    });
  });
  // Marcar el primer botón como activo al cargar la página
  const firstBtn = document.querySelector('aside button');
  if (firstBtn) firstBtn.classList.add('sidebar-btn-active');
});
