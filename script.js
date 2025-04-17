// script.js
$(function () {
  $('#toggleInfo').on('click', function () {
    $('#extraInfo').fadeToggle();
    const isVisible = $('#extraInfo').is(':visible');
    $(this).text(isVisible ? 'Hide Info' : 'Show More Info');
  });

  $('#toggleTheme').on('click', function () {
    $('body').toggleClass('dark-mode');
    $(this).text($('body').hasClass('dark-mode') ? 'Light Mode ☀️' : 'Dark Mode 🌙');
  });

  function revealOnScroll() {
    $('.fade-in').each(function () {
      const top = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (top < scroll + windowHeight - 50) {
        $(this).addClass('visible');
      }
    });
  }

  revealOnScroll();
  $(window).on('scroll', revealOnScroll);

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#username').val();
    const message = $('#message').val();
    $('#submittedMessage')
      .html(`Thank you, <strong>${name}</strong>! Your message has been received.`)
      .fadeIn();
    this.reset();
  });

  // Sparkle particles
  const canvas = document.getElementById('sparkleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticle(x, y) {
    particles.push({
      x,
      y,
      size: Math.random() * 3 + 1,
      opacity: 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= 0.02;
      if (p.opacity <= 0) particles.splice(i, 1);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
      createParticle(e.clientX, e.clientY);
    }
  });
});
