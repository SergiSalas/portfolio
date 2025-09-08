// ====== GESTIÓN DE IDIOMAS ======
function changeLanguage() {
    const selector = document.getElementById('languageSelector');
    const selectedLang = selector.value;
    
    // Ocultar todos los contenidos
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
  }
  
  // ====== CARGA INICIAL DE LA PÁGINA ======
  function initializePage() {
    // Cargar idioma preferido
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    document.getElementById('languageSelector').value = savedLang;
    
    if (savedLang !== 'es') {
      changeLanguage();
    }
  }
  
  // ====== SMOOTH SCROLLING PARA NAVEGACIÓN ======
  function initializeSmoothScrolling() {
    // CAMBIAR este selector
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
  window.addEventListener('load', function() {
    initializePage();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeHoverEffects();
  });
  
  // ====== MANEJO DE REDIMENSIONAMIENTO ======
  window.addEventListener('resize', function() {
    // Ajustar elementos si es necesario en responsive
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Lógica específica para móviles si es necesaria
    }
  });
  
  // ====== PREVENCIÓN DE COMPORTAMIENTOS NO DESEADOS ======
  document.addEventListener('DOMContentLoaded', function() {
    // Prevenir comportamiento por defecto en enlaces vacíos
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
      });
    });
  });