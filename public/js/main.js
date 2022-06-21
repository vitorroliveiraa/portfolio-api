(function () {
  ("use strict");

  //#region
  window.onload = function () {
    // Adjustable variables
    var settings = {
      pointDensity: 8,
      connections: 2,
      sizeVariation: 0.3,
      velocity: 0.00004,
      maxMovement: 50,
      attractionRange: 400,
      attractionFactor: 0.06,
      imagePath: "/img/nodejsBluee.png",
      imgWidth: 45,
      imgHeight: 42,
      lineColor: "#1d2a",
      particleDensity: 0.2,
      particleChance: 0.2,
      particleVelocity: 60,
      particleColor: "rgba(100, 159, 192,0.8)",
      particleLength: 10,
      flashRadius: 28,
      flashOpacity: 0.6,
      flashDecay: 0.2,
    };

    var start = null,
      delta = 0,
      lasttimestamp = null;

    var points = [],
      particles = [];

    var mousePoint = { x: 0, y: 0 };

    var img = new Image();
    img.src = settings.imagePath;

    var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d");

    // resize the canvas to fill browser window dynamically
    var resizeTimer;
    window.addEventListener("resize", resizeCanvas, false);
    function resizeCanvas() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createPoints();
        drawFrame();
      }, 250);
    }
    resizeCanvas();

    createPoints();

    document.onmousemove = handleMouseMove;

    window.requestAnimationFrame(animate);

    function createPoints() {
      points = [];
      particles = [];
      for (
        var x = 0 - 100;
        x < canvas.width + 100;
        x = x + 1000 / settings.pointDensity
      ) {
        for (
          var y = 0 - 100;
          y < canvas.height + 100;
          y = y + 1000 / settings.pointDensity
        ) {
          var px = Math.floor(
            x + (Math.random() * 900) / settings.pointDensity
          );
          var py = Math.floor(
            y + (Math.random() * 900) / settings.pointDensity
          );
          var pSizeMod = Math.random() * settings.sizeVariation + 1;
          var pw = settings.imgWidth * pSizeMod;
          var ph = settings.imgHeight * pSizeMod;
          var pAnimOffset = Math.random() * 2 * Math.PI;
          var p = {
            x: px,
            originX: px,
            y: py,
            originY: py,
            w: pw,
            h: ph,
            sizeMod: pSizeMod,
            animOffset: pAnimOffset,
            attraction: 0,
            flashOpacity: 0,
          };
          points.push(p);
        }
      }

      // for each point find the closest points. From https://tympanus.net/codrops/2014/09/23/animated-background-headers/
      for (var i = 0; i < points.length; i++) {
        var closest = [];
        var p1 = points[i];
        for (var j = 0; j < points.length; j++) {
          var p2 = points[j];
          if (!contains(p2.closest, p1) && p1 != p2) {
            var placed = false;
            for (var k = 0; k < settings.connections; k++) {
              if (!placed && closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }

            for (var k = 0; k < settings.connections; k++) {
              if (
                !placed &&
                getDistance(p1, p2) < getDistance(p1, closest[k])
              ) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
        p1.closest = closest;
      }
    }

    function animate(timestamp) {
      // Calculate frametime
      if (!start) {
        start = timestamp;
        lasttimestamp = timestamp;
      }
      var elapsed = timestamp - start,
        delta = (timestamp - lasttimestamp) / 100;
      lasttimestamp = timestamp;

      // Move points around
      for (var i = 0; i < points.length; i++) {
        var point = points[i];

        var attractionOffset = { x: 0, y: 0 };
        var distanceToMouse = getDistance(
          { x: point.originX, y: point.originY },
          mousePoint
        );
        if (distanceToMouse <= settings.attractionRange) {
          displacementFactor =
            ((Math.cos((distanceToMouse / settings.attractionRange) * Math.PI) +
              1) /
              2) *
            settings.attractionFactor;
          attractionOffset.x = displacementFactor * (mousePoint.x - point.x);
          attractionOffset.y = displacementFactor * (mousePoint.y - point.y);
        }

        point.x =
          point.originX +
          Math.sin(elapsed * settings.velocity + point.animOffset) *
            settings.maxMovement *
            point.sizeMod +
          attractionOffset.x;
        point.y =
          point.originY -
          Math.cos(elapsed * settings.velocity + point.animOffset) *
            settings.maxMovement *
            point.sizeMod +
          attractionOffset.y;

        point.flashOpacity = Math.max(
          0,
          point.flashOpacity - settings.flashDecay * delta
        );
      }

      // Move particles
      for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        var origin = points[particle.origin];
        var target = origin.closest[particle.target];

        var distance = getDistance(
          { x: origin.x, y: origin.y },
          { x: target.x, y: target.y }
        );
        var direction = {
          x: (target.x - origin.x) / distance,
          y: (target.y - origin.y) / distance,
        };

        particle.traveled += settings.particleVelocity * delta;
        particle.direction = direction;

        particle.x = origin.x + direction.x * particle.traveled;
        particle.y = origin.y + direction.y * particle.traveled;

        if (!between(origin, { x: particle.x }, target)) {
          particles.splice(i, 1);
          i--;
        }
      }

      // Spawn new particles
      for (var i = 0; i < settings.particleDensity * points.length; i++) {
        if (Math.random() < settings.particleChance * delta) {
          var pOriginNum = Math.floor(Math.random() * points.length);
          var pOrigin = points[pOriginNum];
          var pTargetNum = Math.floor(Math.random() * pOrigin.closest.length);
          var px = pOrigin.x;
          var py = pOrigin.y;
          var p = {
            origin: pOriginNum,
            target: pTargetNum,
            x: px,
            y: py,
            traveled: 0,
            direction: { x: 0, y: 0 },
          };
          particles.push(p);
          pOrigin.flashOpacity = settings.flashOpacity;
        }
      }

      drawFrame();

      window.requestAnimationFrame(animate);
    }

    function handleMouseMove(event) {
      mousePoint.x = event.pageX;
      mousePoint.y = event.pageY;
      // console.log(mousePoint.x, mousePoint.y);
    }

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < points.length; i++) {
        drawLines(points[i]);
      }

      for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
          particle.x - particle.direction.x * settings.particleLength,
          particle.y - particle.direction.y * settings.particleLength
        );
        ctx.strokeStyle = settings.particleColor;
        ctx.stroke();
      }

      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (point.flashOpacity > 0) {
          ctx.beginPath();
          ctx.rect(
            point.x - settings.flashRadius,
            point.y - settings.flashRadius,
            settings.flashRadius * 2,
            settings.flashRadius * 2
          );
          var gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            settings.flashRadius,
            point.x,
            point.y,
            1
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
          gradient.addColorStop(
            1,
            "rgba(255, 255, 255, " + point.flashOpacity + ")"
          );
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        ctx.drawImage(
          img,
          point.x - point.w / 2,
          point.y - point.h / 2,
          point.w,
          point.h
        );
      }
    }

    function drawLines(p) {
      for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = settings.lineColor;
        ctx.stroke();
      }
    }

    //Util
    function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    function contains(a, obj) {
      if (a !== undefined) {
        for (var i = 0; i < a.length; i++) {
          if (a[i] === obj) {
            return true;
          }
        }
      }
      return false;
    }

    function between(p1, p2, t) {
      return (p1.x - p2.x) * (p2.x - t.x) > 0;
    }

    const typed = select(".typed");
    if (typed) {
      let typed_strings = typed.getAttribute("data-typed-items");
      typed_strings = typed_strings.split(",");

      setTimeout(() => {
        new Typed(".typed", {
          strings: typed_strings,
          loop: false,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 1000,
        });
      }, 1100);
    }
  };

  //#endregion

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero type effect
   */
  // const typed = select('.typed');
  // if (typed) {
  //   let typed_strings = typed.getAttribute('data-typed-items');
  //   typed_strings = typed_strings.split(',');
  //   new Typed('.typed', {
  //     strings: typed_strings,
  //     loop: false,
  //     typeSpeed: 100,
  //     backSpeed: 50,
  //     backDelay: 1000,
  //   });
  // }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
