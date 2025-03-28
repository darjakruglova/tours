document.addEventListener("DOMContentLoaded", function () {
  let swiperInstance;

  function initSwiper() {
    const container = document.querySelector(".swiper-menu");
    const wrapper = document.querySelector(".swiper-wrapper");

    if (!container || !wrapper) return;

    const containerWidth = container.offsetWidth; // Ширина контейнера
    const contentWidth = wrapper.scrollWidth; // Общая ширина вкладок

    if (window.innerWidth < 768) {
      // Мобильная версия: показываем максимум 3 слайда
      if (!swiperInstance) {
        swiperInstance = new Swiper(".swiper-menu", {
          slidesPerView: 3.5, // Отображаем только 3 слайда
          spaceBetween: 10,
          freeMode: true,
        });
      }
    } else {
      // Десктоп: включаем Swiper только если вкладки не помещаются
      if (contentWidth > containerWidth) {
        if (!swiperInstance) {
          swiperInstance = new Swiper(".swiper-menu", {
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: true,
          });
        }
      } else {
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }
      }
    }
  }

  // Проверяем при загрузке и изменении размера экрана
  window.addEventListener("load", initSwiper);
  window.addEventListener("resize", initSwiper);

  new Swiper(".swiper-result", {
    slidesPerView: 4, // Отображение 5 слайдов одновременно
    spaceBetween: 5, // Отступы между слайдами
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    },
  });
  // Flatpickr
  flatpickr(".date-range", {
    mode: "range",
    dateFormat: "Y-m-d",
    locale: "ru",
    showMonths: 2,
  });

  // Swiper Sliders
  let servicesSwiper;
  const swiperContainer = document.querySelector(".services__slider");

  function initServicesSwiper() {
    servicesSwiper = new Swiper(swiperContainer, {
      slidesPerView: 3,
      navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      },
      breakpoints: {
        540: { slidesPerView: 3 },
        640: { slidesPerView: 4 },
        840: { slidesPerView: 6 },
        1124: { slidesPerView: 8 },
      },
    });
  }

  function destroyServicesSwiper() {
    if (servicesSwiper) {
      servicesSwiper.destroy(true, true);
      servicesSwiper = null;
    }
  }

  function handleResize() {
    if (window.innerWidth < 540) {
      destroyServicesSwiper();
    } else if (!servicesSwiper) {
      initServicesSwiper();
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);

  // Tours slider
  new Swiper(".tours__large", {
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Current slider
  new Swiper(".current__slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1424: { slidesPerView: 4 },
    },
  });

  // Main and thumbnail sliders
  const mainSlider = new Swiper(".main-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const thumbnailSlider = new Swiper(".thumbnail-slider", {
    spaceBetween: 10,
    slidesPerView: 4,
    slideToClickedSlide: true,
  });

  mainSlider.controller.control = thumbnailSlider;
  thumbnailSlider.controller.control = mainSlider;

  // Tabs in header
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const content = document.getElementById(`tab-${tab.dataset.tab}`);
      const isActive = tab.classList.contains("active"); // Проверяем, активна ли вкладка
      const arrow = tab.querySelector(".arrow"); // Находим стрелочку внутри вкладки

      // Удаляем активность у всех вкладок и их содержимого
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.querySelector(".arrow")?.classList.remove("rotated"); // Убираем поворот у всех стрелок
      });

      tabContents.forEach((c) => c.classList.remove("active"));

      // Если вкладка была неактивной, активируем её и соответствующий контент
      if (!isActive) {
        tab.classList.add("active");
        content.classList.add("active");
        arrow?.classList.add("rotated"); // Переворачиваем стрелку
      }
    });
  });

  // Filter toggle buttons
  const toggleButtons = document.querySelectorAll('[data-toggle="filters"]');

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const target = document.getElementById(targetId);

      if (target) {
        target.classList.toggle("hidden");
        this.textContent = target.classList.contains("hidden")
          ? "Расширенный поиск ˅"
          : "Скрыть фильтры ˄";
      }
    });
  });

  // Функция для управления открытием/закрытием блока
  function toggleSection(button, targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.style.display =
        targetElement.style.display === "none" ? "block" : "none";
    }
  }

  // Привязка событий к кнопкам с классом .toggle-button
  document.querySelectorAll(".toggle-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetSelector = button.getAttribute("data-target");
      if (targetSelector) {
        toggleSection(button, targetSelector);
      }
    });
  });

  function updateAdultsCount(count) {
    const toggleButton = document.querySelector(".toggle-button");
    if (toggleButton) {
      toggleButton.textContent = count;
    }
  }

  // Инкремент (увеличение числа взрослых)
  document.querySelectorAll(".increment").forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button
        .closest(".age-selector")
        .querySelector(".count");
      let count = parseInt(countElement.textContent);
      count += 1;
      countElement.textContent = count + " взрослых";
      updateAdultsCount(count); // Обновляем количество в блоке "Количество человек"
    });
  });

  // Декремент (уменьшение числа взрослых)
  document.querySelectorAll(".decrement").forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button
        .closest(".age-selector")
        .querySelector(".count");
      let count = parseInt(countElement.textContent);
      if (count > 1) {
        count -= 1;
        countElement.textContent = count + " взрослых";
        updateAdultsCount(count); // Обновляем количество в блоке "Количество человек"
      }
    });
  });

  // Toggle sections
  document.querySelectorAll(".toggle-button").forEach((button) => {
    let svgIcon = button.querySelector("svg");
    button.addEventListener("click", () => {
      const details = button.closest(".toggle-section").nextElementSibling;
      svgIcon.classList.toggle("rotated");
      //  button.style.background = "#000";
      //  details.style.background = "#000";
      if (details) {
        details.classList.toggle("active");
      }
    });
  });

  // Preview and main slide linkage
  const prewSlide = new Swiper(".swiper-prewslide", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  new Swiper(".swiper-mainslide", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: prewSlide,
    },
  });


  document.querySelectorAll(".tour-card").forEach((block) => {
    const button = block.querySelector(".tour-card__details");
    const price = block.querySelector(".tour-card__price");
  
    block.addEventListener("mouseenter", () => {
      button.style.display = "flex"; // Показываем кнопку
      price.style.display = "none"; // Скрываем цену
    });
  
    block.addEventListener("mouseleave", () => {
      button.style.display = "none"; // Скрываем кнопку
      price.style.display = "block"; // Показываем цену снова
    });
  });
  
});
