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
          slidesPerView: 2.5, // Отображаем только 3 слайда
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
  // // Flatpickr
  // flatpickr(".date-range", {
  //   mode: "range",
  //   dateFormat: "Y-m-d",
  //   locale: "ru",
  //   showMonths: 2,
  // });
  // Flatpickr адаптив
const dateRangePicker = flatpickr(".date-range", {
  mode: "range",
  dateFormat: "Y-m-d",
  locale: "ru",
  showMonths: window.innerWidth < 660 ? 1 : 2,
  onOpen: function(selectedDates, dateStr, instance) {
    adaptCalendar(instance);
  },
  onReady: function(selectedDates, dateStr, instance) {
    adaptCalendar(instance);
  }
});

// Функция адаптации количества месяцев
function adaptCalendar(instance) {
  const monthsToShow = window.innerWidth < 660 ? 1 : 2;
  if (instance.config.showMonths !== monthsToShow) {
    instance.set("showMonths", monthsToShow);
  }
}

// Слушаем ресайз окна
window.addEventListener("resize", () => {
  if (dateRangePicker.isOpen) {
    adaptCalendar(dateRangePicker);
  }
});

  // Swiper Sliders
  let servicesSwiper;
  const swiperContainer = document.querySelector(".services__slider");

  function initServicesSwiper() {
    servicesSwiper = new Swiper(swiperContainer, {
      slidesPerView: 4,
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
    slidesPerView: 2,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
740: {
  slidesPerView: 4,
}
    }
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


  // document.querySelectorAll(".tour-card").forEach((block) => {
  //   const button = block.querySelector(".tour-card__details");
  //   const price = block.querySelector(".tour-card__price");
  
  // });
  
  // Сортировка
  const sortSelect = document.querySelector('.sort-select');
  const sortDropdown = document.querySelector('.sort-dropdown');
  const sortOptions = document.querySelectorAll('.sort-option');

  if (sortSelect && sortDropdown) {
    sortSelect.addEventListener('click', (e) => {
      e.preventDefault();
      sortDropdown.classList.toggle('active');
    });

    sortOptions.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const text = option.textContent;

        // Убираем выделение у всех опций
        sortOptions.forEach(opt => opt.classList.remove('selected'));
        // Добавляем выделение выбранной опции
        option.classList.add('selected');

        // Обновляем текст в селекте
        sortSelect.textContent = text;

        // Закрываем дропдаун
        sortDropdown.classList.remove('active');

        // Здесь можно добавить логику сортировки
        // ...
      });
    });

    // Закрываем дропдаун при клике вне его
    document.addEventListener('click', (e) => {
      if (!sortSelect.contains(e.target) && !sortDropdown.contains(e.target)) {
        sortDropdown.classList.remove('active');
      }
    });
  }

  function updateTabHeight() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const activeTab = document.querySelector('.tab.active');

    if (swiperWrapper && activeTab) {
        activeTab.style.minHeight = `${swiperWrapper.offsetHeight}px`;
    }
}

function updateTabHeight() {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const activeTab = document.querySelector('.tab.active');

  if (swiperWrapper && activeTab) {
    const tabContent = activeTab.querySelector('.tabs__item');
    if (tabContent) {
        swiperWrapper.style.height = `${tabContent.offsetHeight}px`;
    }
  }
}

function resetTabHeight() {
  document.querySelectorAll('.tab').forEach(tab => {
      tab.style.height = 'auto';
  });
}

// Обновляем при загрузке и изменении размеров окна
window.addEventListener('load', updateTabHeight);
window.addEventListener('resize', updateTabHeight);

// Обрабатываем смену активного таба
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
      setTimeout(() => {
          resetTabHeight(); // Сбрасываем высоту у всех табов
          updateTabHeight(); // Устанавливаем высоту только активному табу
      }, 100);
  });
});



});


document.addEventListener("DOMContentLoaded", function () {
  function toggleActiveClass(triggerSelector, wrapperSelector) {
    const triggers = document.querySelectorAll(triggerSelector);

    triggers.forEach(triggerElement => {
      // Найдем элемент, который должен переключать активное состояние
      const wrapperElement = triggerElement.closest(wrapperSelector); // Попробуем найти ближайшего родителя

      // Если элемент с классом wrapperSelector найден
      if (wrapperElement) {
        triggerElement.addEventListener("click", () => {
          wrapperElement.classList.toggle("active");
        });
      }
    });
  }

  // Вызов функции для разных элементов
  toggleActiveClass("#sort", ".sort-wrapper");
  toggleActiveClass(".toggle-button", ".form__input");
  // toggleActiveClass("#duration", ".form__group");
});



document.addEventListener("DOMContentLoaded", () => {
  // Универсальное переключение видимости по data-target
  function toggleSection(button, targetSelector) {
    const parentGroup = button.closest(".form__group");
    const target = parentGroup?.querySelector(targetSelector);
    if (target) {
      const isHidden = getComputedStyle(target).display === "none";
      target.style.display = isHidden ? "block" : "none";
    }
  }

  // Обновление текста в кнопке (взрослые)
  function toggleSection(button, targetSelector) {
    const section = button.closest(".form__group").querySelector(targetSelector);
    if (section) {
      const isVisible = section.style.display === "block";
      section.style.display = isVisible ? "none" : "block";
    }
  }

  function updateAdultCount(button, count) {
    button.childNodes[0].nodeValue = `${count} `;
  }

  document.querySelectorAll(".form__group").forEach((group) => {
    let adultCount = 2;

    const toggleButton = group.querySelector(".toggle-button.form__input");
    const incrementBtn = group.querySelector(".increment");
    const decrementBtn = group.querySelector(".decrement");
    const countDisplay = group.querySelector(".count");

    const addChildBtn = group.querySelector(".add-child");
    const childAgeSelector = group.querySelector(".child-age-selector");

    // Открытие секции "взрослые"
    if (toggleButton) {
      toggleButton.addEventListener("click", (event) => {
        event.preventDefault(); // <- ВАЖНО
        event.stopPropagation();
        const target = toggleButton.getAttribute("data-target");
        if (target) toggleSection(toggleButton, target);
      });
    }

    // Счётчики взрослых
    if (incrementBtn && decrementBtn && countDisplay && toggleButton) {
      incrementBtn.addEventListener("click", (event) => {
        event.preventDefault(); // <- ВАЖНО
        adultCount++;
        countDisplay.textContent = `${adultCount} взрослых`;
        updateAdultCount(toggleButton, adultCount);
      });

      decrementBtn.addEventListener("click", (event) => {
        event.preventDefault(); // <- ВАЖНО
        if (adultCount > 1) {
          adultCount--;
          countDisplay.textContent = `${adultCount} взрослых`;
          updateAdultCount(toggleButton, adultCount);
        }
      });
    }

    // Кнопка "Добавить ребенка"
    if (addChildBtn) {
      addChildBtn.addEventListener("click", (event) => {
        event.preventDefault(); // <- ВАЖНО
        event.stopPropagation();
        const target = addChildBtn.getAttribute("data-target");
        if (target) toggleSection(addChildBtn, target);
      });
    }

    // Блоки не закрываются при клике внутри
    group.querySelectorAll(".age-selector, .child-age-selector").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });

  // Клик вне формы — закрыть все
  document.addEventListener("click", () => {
    document.querySelectorAll(".form__group").forEach((group) => {
      group.querySelectorAll(".age-selector, .child-age-selector").forEach((section) => {
        section.style.display = "none";
      });
    });
  });

  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
  
    // Открытие/закрытие по кнопке
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Предотврати всплытие
  
      // Просто переключаем текущий, НЕ закрывая другие
      dropdown.classList.toggle('open');
    });
  
    // Не закрывать меню при кликах внутри
    dropdownMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  
    // Логика выбора
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const selected = Array.from(checkboxes)
          .filter(c => c.checked)
          .map(c => c.value);
        console.log(`Dropdown ${dropdown.dataset.id} выбранные:`, selected);
      });
    });
  });
  
  // Закрываем только при клике ВНЕ всех .dropdown
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown').forEach(drop => {
      if (!drop.contains(e.target)) {
        drop.classList.remove('open');
      }
    });
  });
  
});
