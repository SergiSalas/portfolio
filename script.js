// ====== GESTIÓN DE IDIOMAS MEJORADA ======
function changeLanguage() {
  const selector = document.getElementById('languageSelector');
  const selectedLang = selector.value;
  
  console.log('Cambiando idioma a:', selectedLang); // Para debug
  
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
  
  // Guardar preferencia en localStorage
  localStorage.setItem('preferredLanguage', selectedLang);
  
  console.log('Elementos activos:', document.querySelectorAll('.lang-content.active').length); // Para debug
}

// ====== CARGA INICIAL DE LA PÁGINA MEJORADA ======
function initializePage() {
  console.log('Inicializando página...'); // Para debug
  
  // Cargar idioma preferido
  const savedLang = localStorage.getItem('preferredLanguage') || 'es';
  const selector = document.getElementById('languageSelector');
  
  if (selector) {
    selector.value = savedLang;
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