(function(){
  'use strict';

  /* ---------------------------------------------------------
     Sticky header: dark bg + shadow once you scroll past hero
  --------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader(){
    if(window.scrollY > 40){
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------
     Mobile hamburger menu
  --------------------------------------------------------- */
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu(){
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  mobileMenu.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------------------------------------------------------
     Smooth scroll for every in-page anchor link
     (native CSS scroll-behavior handles most of it; this
     just makes sure the mobile menu closes on tap too)
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var id = link.getAttribute('href');
      if(id.length > 1){
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      closeMobileMenu();
    });
  });

  /* ---------------------------------------------------------
     Hero image fallback — if the hotlinked photo fails to
     load for any reason, drop back to the gradient treatment
     instead of showing a broken image icon.
  --------------------------------------------------------- */
  var heroImg = document.getElementById('heroImg');
  var heroMedia = document.getElementById('heroMedia');
  heroImg.addEventListener('error', function(){
    heroImg.remove();
    heroMedia.classList.add('fallback');
  });

  /* ---------------------------------------------------------
     Week tracker — lights up progressively on scroll into view
  --------------------------------------------------------- */
  var weekCells = document.querySelectorAll('#weekCells .wt-cell');
  var weekIndex = 0;
  setInterval(function(){
    weekCells.forEach(function(cell, i){
      cell.classList.toggle('is-lit', i <= weekIndex);
    });
    weekIndex = (weekIndex + 1) % weekCells.length;
  }, 900);

  /* ---------------------------------------------------------
     Reveal-on-scroll
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     Program / pricing toggle
  --------------------------------------------------------- */
  var plans = {
    monthly: {
      name: 'Monthly Membership',
      tagline: 'Ongoing access, cancel any time.',
      price: '149',
      suffix: '/ month',
      note: 'Billed monthly. No long-term contract.',
      cta: 'Start Monthly Membership',
      perks: [
        'Unlimited group classes, every session',
        'Open gym access outside class hours',
        'Access to community events & challenges',
        'Cancel or pause any time'
      ]
    },
    challenge: {
      name: '6-Week Challenge Package',
      tagline: 'Our flagship transformation program.',
      price: '299',
      suffix: '/ 6 weeks',
      note: 'One-time payment. Limited spots per cycle.',
      cta: 'Join the 6-Week Challenge',
      perks: [
        'Personalized nutrition plan for all 6 weeks',
        '3x/week coached small-group sessions',
        'Progress tracking & body measurements',
        'Private challenge community group',
        'Bonus: Apex tee + shaker bottle'
      ]
    }
  };

  var tabMonthly = document.getElementById('tabMonthly');
  var tabChallenge = document.getElementById('tabChallenge');
  var planName = document.getElementById('planName');
  var planTagline = document.getElementById('planTagline');
  var planPrice = document.getElementById('planPrice');
  var planSuffix = document.getElementById('planSuffix');
  var planNote = document.getElementById('planNote');
  var planCta = document.getElementById('planCta');
  var planPerks = document.getElementById('planPerks');

  function checkIconSvg(){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  }

  function renderPlan(key){
    var p = plans[key];
    planName.textContent = p.name;
    planTagline.textContent = p.tagline;
    planPrice.textContent = p.price;
    planSuffix.textContent = p.suffix;
    planNote.textContent = p.note;
    planCta.textContent = p.cta;

    planPerks.innerHTML = '';
    p.perks.forEach(function(perk){
      var li = document.createElement('li');
      li.innerHTML = checkIconSvg() + '<span>' + perk + '</span>';
      planPerks.appendChild(li);
    });

    tabMonthly.classList.toggle('is-active', key === 'monthly');
    tabChallenge.classList.toggle('is-active', key === 'challenge');
    tabMonthly.setAttribute('aria-selected', String(key === 'monthly'));
    tabChallenge.setAttribute('aria-selected', String(key === 'challenge'));
  }

  tabMonthly.addEventListener('click', function(){ renderPlan('monthly'); });
  tabChallenge.addEventListener('click', function(){ renderPlan('challenge'); });
  renderPlan('monthly');

  /* ---------------------------------------------------------
     Testimonial carousel
  --------------------------------------------------------- */
  var track = document.getElementById('carouselTrack');
  var slides = track.children;
  var dotsWrap = document.getElementById('carouselDots');
  var prevBtn = document.getElementById('prevSlide');
  var nextBtn = document.getElementById('nextSlide');
  var current = 0;
  var autoplayTimer;

  for(var i = 0; i < slides.length; i++){
    var dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    if(i === 0) dot.classList.add('is-active');
    (function(idx){
      dot.addEventListener('click', function(){ goTo(idx); restartAutoplay(); });
    })(i);
    dotsWrap.appendChild(dot);
  }
  var dots = dotsWrap.children;

  function goTo(index){
    current = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    for(var i = 0; i < dots.length; i++){
      dots[i].classList.toggle('is-active', i === current);
    }
  }

  function restartAutoplay(){
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(function(){ goTo(current + 1); }, 6000);
  }

  prevBtn.addEventListener('click', function(){ goTo(current - 1); restartAutoplay(); });
  nextBtn.addEventListener('click', function(){ goTo(current + 1); restartAutoplay(); });

  goTo(0);
  restartAutoplay();

  /* ---------------------------------------------------------
     Lead form validation + Formspree submission
  --------------------------------------------------------- */
  var FORM_ENDPOINT = 'https://formspree.io/f/xzdnpkgo';

  var form = document.getElementById('leadForm');
  var submitBtn = document.getElementById('submitBtn');
  var formStatus = document.getElementById('formStatus');
  var successPanel = document.getElementById('successPanel');

  var fields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    goal: document.getElementById('goal'),
    time: document.getElementById('time')
  };

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(key, hasError){
    var input = fields[key];
    var errorMsg = document.getElementById('err-' + key);
    input.classList.toggle('has-error', hasError);
    errorMsg.classList.toggle('is-visible', hasError);
  }

  function validateForm(){
    var valid = true;

    if(fields.fullName.value.trim().length < 2){
      setFieldError('fullName', true);
      valid = false;
    } else {
      setFieldError('fullName', false);
    }

    if(!emailPattern.test(fields.email.value.trim())){
      setFieldError('email', true);
      valid = false;
    } else {
      setFieldError('email', false);
    }

    if(!fields.goal.value){
      setFieldError('goal', true);
      valid = false;
    } else {
      setFieldError('goal', false);
    }

    if(!fields.time.value){
      setFieldError('time', true);
      valid = false;
    } else {
      setFieldError('time', false);
    }

    return valid;
  }

  // Clear a field's error state as soon as the visitor fixes it
  Object.keys(fields).forEach(function(key){
    fields[key].addEventListener('input', function(){
      if(fields[key].classList.contains('has-error')){
        validateForm();
      }
    });
    fields[key].addEventListener('change', function(){
      if(fields[key].classList.contains('has-error')){
        validateForm();
      }
    });
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    formStatus.classList.remove('is-visible');

    if(!validateForm()){
      formStatus.textContent = 'Please fix the highlighted fields before submitting.';
      formStatus.classList.add('is-visible');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    var payload = new FormData(form);

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: payload,
      headers: { 'Accept': 'application/json' }
    }).then(function(response){
      if(response.ok){
        form.style.display = 'none';
        formStatus.classList.remove('is-visible');
        successPanel.classList.add('is-visible');
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(function(){
      formStatus.textContent = "Something went wrong on our end — please try again, or email us directly.";
      formStatus.classList.add('is-visible');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Claim My Free Pass';
    });
  });

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

})();