const html = document.documentElement
const body = document.body
const pageWrapper = document.querySelector('.page')
const header = document.querySelector('.toolbar')
const firstScreen = document.querySelector('[data-observ]')
const burgerButton = document.querySelector('.icon-menu')
const menu = document.querySelector('.menu')
const lockPaddingElements = document.querySelectorAll('[data-lp]')

/*
* Универсальная функция для блокировки скрола при открытии модальных окон
* При открытии модального окна вызываем: toggleBodyLock(true)
* При закрытии окна вызываем: toggleBodyLock(false)

* lockPaddingElements - это коллекция элементов с фиксированной позицией
* В html таким элементам нужно дать атрибут [data-lp] 
*/
const toggleBodyLock = (isLock) => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`)
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth

  setTimeout(() => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 500)
}

// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    document.querySelector('.toolbar').classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}



headerFixed();
//плавные якоря
$('a[href^="#"]').on("click", function (e) {
    let anchor = $(this);
    let offset = document.documentElement.clientHeight * 220 / 929
    $('html, body').stop().animate({
        scrollTop: $(anchor.attr("href")).offset().top - offset
    }, 700);
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', function () {
    if(document.querySelector('.feedback-wrapper') !== null) {
        $('.feedback-wrapper').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            prevArrow: `#feedback-arrows__item-left`,
            nextArrow: `#feedback-arrows__item-right`,
        });

        //обрезка текста отзывов
        let allFeedbackItems = document.querySelectorAll('.feedback__item-desc')

        allFeedbackItems.forEach(el => {
            cutText(el, 462)
        })

        allFeedbackItems.forEach(el => {
            el.addEventListener('click', (e) => {
                if(e.target.classList.contains('feedback__item-desc')) return false
                openText(el, e.target.dataset.text)
            })
        })
    }

    if(document.querySelector('#licenses-double-slider') !== null) {
        $('#licenses-double-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            prevArrow: `.licenses-double-left`,
            nextArrow: `.licenses-double-right`,
            touchMove: false,
            swipe: false,
            infinite: false,
        });
        Fancybox.bind('[data-fancybox="gallery"]', {  });
    }
    if(document.querySelector('#licenses-three-slider') !== null) {
        $('#licenses-three-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            prevArrow: `.licenses-three-left`,
            nextArrow: `.licenses-three-right`,
            touchMove: false,
            swipe: false,
            infinite: false,
        });
        Fancybox.bind('[data-fancybox="gallery"]', {  });
    }
    if(document.querySelector('.release-inner') !== null) {
        $('.release-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
            prevArrow: `#release-left`,
            nextArrow: `#release-right`,
            infinite: false,
        });
    }

    if(document.querySelector('.content') !== null) {
        const sections = document.querySelectorAll('section'),
            links = document.querySelectorAll('.toolbar__item')

        const cb = (entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                    let activeId = entry.target.id
                    const activeLink = document.querySelector(`.toolbar__item[href="#${activeId}"]`)

                    if(activeLink) {
                        links.forEach(el => el.classList.remove('active'))
                        let line = document.querySelector('.toolbar__active-line'),
                            left = activeLink.offsetLeft
                        line.style.left = left + 'px'
                        line.style.width = activeLink.offsetWidth + 'px'
                    }

                    if(activeLink) {
                        activeLink.classList.add('active')
                    }
                }
            })
        }
        const sectionObserver = new IntersectionObserver(cb, { threshold: [ 0.1, 0.5, 0.8], rootMargin: `-80px 0px -80px 0px` })

        sections.forEach(section => {sectionObserver.observe(section)})
    }

    if(document.querySelector('.faq') !== null) {
        let faqItems = document.querySelectorAll('.faq-question')

        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                let content = item.parentNode.querySelector('.faq-answerBx');

                if(content.style.maxHeight){
                    content.style.maxHeight = null;
                    item.parentNode.classList.remove('active');
                }else{
                    document.querySelectorAll('.faq-answerBx').forEach(el => el.style.maxHeight = null);
                    document.querySelectorAll('.faq__item').forEach(el => el.classList.remove('active'));
                    content.style.maxHeight = content.scrollHeight + 'px';
                    item.parentNode.classList.add('active');
                }

            })
        })
    }
    if(document.querySelector('.content') !== null) {
        $('.content-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            infinite: false,
            arrows: false,
            fade: true,
            asNavFor: ".content-slider-nav",
            swipe: false,
        });
        $('.content-slider-nav').slick({
            slidesToShow: 5,
            dots: false,
            infinite: false,
            arrows: false,
            asNavFor: ".content-slider",
            focusOnSelect: true,
        });

    }
    if(document.querySelector('.instruction-slider') !== null) {
        $('.instruction-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            infinite: false,
            fade: true,
            asNavFor: ".instruction-nav-slider",
            prevArrow: `.instruction__crumb.prev`,
            nextArrow: `.instruction__crumb.next`,
            swipe: false,
        });

        $('.instruction-nav-slider').slick({
            slidesToShow: 13,
            dots: false,
            infinite: false,
            arrows: false,
            asNavFor: ".instruction-slider",
            focusOnSelect: true,
            vertical: true,
            useTransform: false,
            animate: false,
            useCSS: false
        });

    }
})

let toggleBlackout = () => {

}

let closeAllModal = () => {

}

//обрезка текста с добавлением в конец синего слова еще, по нажатию на который происходит раскрытие текста
const cutText = (element, limit, isShow = false, preventText = '') => {
    if(isShow){
        element.parentNode.textContent = preventText
        return false
    }
    let maxLength = element.textContent.length,
        text = element.textContent,
        sliced = element.textContent.slice(0, limit).trim()
    if (sliced.length < element.textContent.length) {
        element.textContent = sliced
        element.innerHTML += `...<span class='more' data-text='${text}'">ещё</span>`
    }
}

const openText = (element, preventText = '') => {
    element.textContent = preventText
    return false
}


// =======================================================================================================
