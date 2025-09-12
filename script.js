// ====== GESTIÓN DE IDIOMAS MEJORADA ======
function changeLanguage() {
  const selector = document.getElementById('languageSelector');
  const selectedLang = selector.value;
  
  console.log('Cambiando idioma a:', selectedLang);
  
  // Ocultar todos los contenidos de idiomas
  const allLangContent = document.querySelectorAll('.lang-content');
  allLangContent.forEach(content => {
    content.classList.remove('active');
  });
  
  // Mostrar contenido del idioma seleccionado
  const selectedContent = document.querySelectorAll('.lang-' + selectedLang);
  selectedContent.forEach(content => {
    content.classList.add('active');
  });
  
  // Cambiar el atributo lang del HTML
  document.documentElement.lang = selectedLang;
  
  // Actualizar la bandera del selector
  const languageSelector = document.querySelector('.language-selector');
  languageSelector.setAttribute('data-current', selectedLang);
  
  // Guardar preferencia en localStorage
  localStorage.setItem('preferredLanguage', selectedLang);
  
  console.log('Elementos activos:', document.querySelectorAll('.lang-content.active').length);
}

// ====== CARGA INICIAL DE LA PÁGINA MEJORADA ======
function initializePage() {
  console.log('Inicializando página...');
  
  // Crear elemento decorativo para el selector
  const languageSelector = document.querySelector('.language-selector');
  if (languageSelector && !languageSelector.querySelector('.code-decoration')) {
    const codeDecoration = document.createElement('span');
    codeDecoration.className = 'code-decoration';
    codeDecoration.textContent = '<>';
    codeDecoration.style.cssText = `
      position: absolute;
      top: -6px;
      right: -6px;
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.6);
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      opacity: 0.5;
      transition: all 0.3s ease;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      z-index: 5;
      pointer-events: none;
    `;
    languageSelector.appendChild(codeDecoration);
  }
  
  // Cargar idioma preferido
  const savedLang = localStorage.getItem('preferredLanguage') || 'es';
  const selector = document.getElementById('languageSelector');
  
  if (selector) {
    selector.value = savedLang;
  }
  
  if (languageSelector) {
    languageSelector.setAttribute('data-current', savedLang);
  }
  
  // Ocultar todo el contenido primero
  const allLangContent = document.querySelectorAll('.lang-content');
  allLangContent.forEach(content => {
    content.classList.remove('active');
  });
  
  // Mostrar solo el idioma seleccionado
  setTimeout(() => {
    const selectedContent = document.querySelectorAll('.lang-' + savedLang);
    selectedContent.forEach(content => {
      content.classList.add('active');
    });
    
    console.log('Idioma inicial:', savedLang);
    console.log('Elementos mostrados:', selectedContent.length);
  }, 100);
  
  // Establecer el idioma del documento
  document.documentElement.lang = savedLang;
}

// ====== SMOOTH SCROLLING PARA NAVEGACIÓN ======
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ====== ANIMACIONES AL HACER SCROLL ======
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observar todas las secciones
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// ====== EFECTOS HOVER MEJORADOS ======
function initializeHoverEffects() {
  // Efecto para las tarjetas de experiencia
  const experienceItems = document.querySelectorAll('.experience-item');
  experienceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Efecto para las tarjetas de proyectos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ====== INICIALIZACIÓN AL CARGAR LA PÁGINA ======
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado'); // Para debug
  initializePage();
  initializeSmoothScrolling();
  initializeScrollAnimations();
  initializeHoverEffects();
});

// ====== INICIALIZACIÓN ADICIONAL ======
window.addEventListener('load', function() {
  console.log('Página completamente cargada'); // Para debug
  // Reinicializar el idioma por si acaso
  setTimeout(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    const selector = document.getElementById('languageSelector');
    if (selector && selector.value !== savedLang) {
      selector.value = savedLang;
      changeLanguage();
    }
  }, 200);
});

// ====== MANEJO DE REDIMENSIONAMIENTO ======
window.addEventListener('resize', function() {
  const isMobile = window.innerWidth <= 768;
  // Lógica específica para móviles si es necesaria
});

// ====== PREVENCIÓN DE COMPORTAMIENTOS NO DESEADOS ======
document.addEventListener('DOMContentLoaded', function() {
  const emptyLinks = document.querySelectorAll('a[href="#"]');
  emptyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
});

// Banner de "lluvia de código" en el header
(() => {
  const header = document.querySelector('.header');
  const canvas = document.getElementById('codeCanvas');
  if (!header || !canvas) return;
  const ctx = canvas.getContext('2d');

  const CSS = getComputedStyle(document.documentElement);
  const color =
    (CSS.getPropertyValue('--secondary-color') || '#64ffda').trim() || '#64ffda';
  const bgFade = 'rgba(2, 12, 27, 0.08)'; // fondo sutilmente oscuro (legibilidad)

  // Conjunto de caracteres "de código"
  const chars = Array.from('01{}[]()<>=+-/*;:&%$#@!^?|\\.,_~"\'`abcdefXYZ<>');
  let fontSize = 16;
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let width = 0, height = 0, columns = 0;
  let drops = [];
  let raf = 0;
  let last = 0;
  const targetFPS = 30;
  const frameInterval = 1000 / targetFPS;

  const prefersReduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const rect = header.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    // Ajusta tamaño del texto según ancho (responsive)
    fontSize = Math.max(12, Math.min(20, Math.floor(width / 90)));

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fontSize}px "JetBrains Mono", Consolas, monospace`;
    ctx.textBaseline = 'top';

    columns = Math.ceil(width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * (height / fontSize)));
  }

  function draw(t) {
    raf = requestAnimationFrame(draw);
    if (t - last < frameInterval) return;
    last = t;

    // Desvanece ligeramente el lienzo para estelas
    ctx.fillStyle = bgFade;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < columns; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // "cabeza" más brillante y cola un poco más apagada
      ctx.fillStyle = color;
      const ch = chars[(Math.random() * chars.length) | 0];
      ctx.fillText(ch, x, y);

      // ocasionalmente pinta una cola tenue para variar
      ctx.fillStyle = hexToRgba(color, 0.5);
      if (Math.random() < 0.3) {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y - fontSize);
      }

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    }
  }

  function start() {
    stop();
    if (prefersReduce) {
      // Dibuja un patrón estático si el usuario prefiere menos movimiento
      ctx.clearRect(0, 0, width, height);
      for (let y = 0; y < height; y += fontSize * 2) {
        for (let x = (y / fontSize) % 2 ? fontSize : 0; x < width; x += fontSize * 2) {
          ctx.fillStyle = hexToRgba(color, 0.6);
          ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y);
        }
      }
      return;
    }
    raf = requestAnimationFrame(draw);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function hexToRgba(hex, a = 1) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(h => h + h).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Observa cambios de tamaño del header (por responsive o cambios de idioma)
  const ro = new ResizeObserver(() => {
    resize();
    start();
  });

  resize();
  start();
  ro.observe(header);

  // Limpieza al navegar o recargar
  window.addEventListener('beforeunload', stop);
})();