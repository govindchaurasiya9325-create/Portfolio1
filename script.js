const scrollSections = document.querySelectorAll('section[id]');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const projectFilters = document.getElementById('project-filters');
const projectCards = document.querySelectorAll('.project__card');
const testimonialCarousel = document.getElementById('testimonial-carousel');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const resumeDownloadLink = document.getElementById('resume-download-link');
const hireMeLink = document.getElementById('hire-me-link');
const contactSection = document.getElementById('contact');

const toggleMenu = () => {
  navMenu.classList.toggle('show-menu');
};

navToggle.addEventListener('click', toggleMenu);
navToggle.addEventListener('keyup', event => {
  if (event.key === 'Enter') toggleMenu();
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  scrollSections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href*='${sectionId}']`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active-link');
    } else {
      navLink?.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

const revealElements = document.querySelectorAll('.section, .card, .hero__badge, .hero__visual, .about__profile, .about__content, .skills__card, .service__card, .timeline__item, .project__card, .testimonial__card, .blog__card, .contact__content, .contact__form');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach(el => revealObserver.observe(el));

projectFilters?.addEventListener('click', event => {
  const filter = event.target.closest('button');
  if (!filter) return;

  projectFilters.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
  filter.classList.add('active');

  const category = filter.dataset.filter;
  projectCards.forEach(card => {
    const matches = category === 'all' || card.dataset.category === category;
    card.style.display = matches ? 'grid' : 'none';
  });
});

const typingText = ['Senior Software Engineer', 'AI Engineer', 'Full Stack Developer', 'Web Architect'];
let typeIndex = 0;
let charIndex = 0;
const typeSpeed = 120;
const deleteSpeed = 60;
const typeTextElement = document.querySelector('.hero__description');

const typeLoop = () => {
  if (!typeTextElement) return;
  const currentText = typingText[typeIndex];
  if (charIndex <= currentText.length) {
    typeTextElement.textContent = `Senior Software Engineer crafting premium web experiences, ${currentText}.`;
    charIndex++;
    setTimeout(typeLoop, typeSpeed);
    return;
  }

  setTimeout(() => {
    charIndex = 0;
    typeIndex = (typeIndex + 1) % typingText.length;
    typeLoop();
  }, 2400);
};

typeLoop();

const counters = document.querySelectorAll('.about__stat span');
counters.forEach(counter => {
  const target = Number(counter.textContent.replace('+', ''));
  let count = 0;
  const step = Math.ceil(target / 60);

  const updateCounter = () => {
    count += step;
    counter.textContent = `${count >= target ? target : count}+`;
    if (count < target) {
      requestAnimationFrame(updateCounter);
    }
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCounter();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  observer.observe(counter);
});

resumeDownloadLink?.addEventListener('click', event => {
  event.preventDefault();

  const link = document.createElement('a');
  link.href = 'resume.pdf';
  link.download = 'Govind_Chaurasiya_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.open('resume.pdf', '_blank', 'noopener,noreferrer');
});

hireMeLink?.addEventListener('click', event => {
  event.preventDefault();
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      window.location.hash = '#contact';
    }, 100);
  }
});

form?.addEventListener('submit', event => {
  event.preventDefault();

  const nameField = form.querySelector('#name');
  const emailField = form.querySelector('#email');
  const subjectField = form.querySelector('#subject');
  const messageField = form.querySelector('#message');

  const name = nameField?.value.trim() || '';
  const email = emailField?.value.trim() || '';
  const subject = subjectField?.value.trim() || '';
  const message = messageField?.value.trim() || '';

  if (!name || !email || !subject || !message) {
    formStatus.textContent = 'Please fill in all fields before sending.';
    return;
  }

  const mailtoLink = `mailto:govindchaurasiya9325@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  formStatus.textContent = 'Opening your email app…';
  window.open(mailtoLink, '_blank', 'noopener,noreferrer');
  form.reset();
});

const testimonials = Array.from(testimonialCarousel?.children || []);
let testimonialIndex = 0;

const rotateTestimonials = () => {
  testimonials.forEach((card, index) => {
    card.classList.toggle('active', index === testimonialIndex);
  });
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
};

setInterval(rotateTestimonials, 5000);

const observerOptions = {
  root: null,
  threshold: 0.25,
};

const stickyHeader = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    stickyHeader.classList.add('scroll-header');
  } else {
    stickyHeader.classList.remove('scroll-header');
  }
});

const cards = document.querySelectorAll('.progress');
cards.forEach(card => {
  const percent = card.dataset.percent;
  card.querySelector('span').style.width = '0%';
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        card.querySelector('span').style.width = `${percent}%`;
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  observer.observe(card);
});
