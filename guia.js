document.addEventListener('DOMContentLoaded', function () {
  const sections = [
    { btn: 'crear-encuesta', section: 'crear-encuesta' },
    { btn: 'condiciones-logicas', section: 'condiciones-logicas' },
    { btn: 'anadir-loops', section: 'anadir-loops' }
  ];

  // Oculta todas las secciones excepto la primera
  sections.forEach((s, i) => {
    const el = document.getElementById(s.section);
    if (el) el.style.display = i === 0 ? 'block' : 'none';
  });

  // Asigna eventos a los botones
  sections.forEach((s, i) => {
    const btns = document.querySelectorAll(`button[onclick*='${s.section}']`);
    btns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        // Oculta todas
        sections.forEach((other, j) => {
          const el = document.getElementById(other.section);
          if (el) el.style.display = 'none';
        });
        // Muestra la seleccionada
        const el = document.getElementById(s.section);
        if (el) el.style.display = 'block';
      });
    });
  });
});
