$(document).ready(function () {
 
  // подсветка выбранного пункта меню
  var nav = $('.navbar-wrapper-small__item');

  nav.on("click", function (e) {
    // e.preventDefault();
    nav.removeClass('navbar-wrapper-small__item--active');
    $(this).toggleClass('navbar-wrapper-small__item--active');
  });

  // вызов модального окна
  var overlay = $('.modal__overlay');
  var modal = $('.modal__dialog');
  var enterButton = $('.enter-button');
  var closeButton = $('.modal__close');

  //открытие модального окна
  enterButton.on("click", function (e) {
    e.preventDefault();
    $("#btn").hide();
    //очищаем инпуты от значений и стилей прошлого заполнения
    $('input[type="email"]').val('').removeClass('validated invalidated');
    $('input[type="password"]').val('').removeClass('validated invalidated');
    $('#emailCheck').html('');
    $('#passwordCheck').html('');
    overlay.addClass('modal__overlay--visible');
    modal.addClass('modal__dialog--visible');
    $("body").addClass("scroll-hidden");
  });
  // закрытие модального по крестику
  closeButton.on("click", function (e) {
    e.preventDefault();
    overlay.removeClass('modal__overlay--visible');
    modal.removeClass('modal__dialog--visible');   
    $("body").removeClass("scroll-hidden");  
  });
  // закрытие модального окна при клике вне окна
  $(document).mouseup(function (e) {
    e.preventDefault();
    if (!modal.is(e.target) & modal.has(e.target).length === 0) {
      overlay.removeClass('modal__overlay--visible');
      modal.removeClass('modal__dialog--visible');   
    }
    $("body").removeClass("scroll-hidden");
  });

  // табы секции trends
  var tab = $(".trends-top__tab");
  var contentCards = $(".trends-cards");

  tab.on("click", function (e) {
    var activeContent = $(this).attr('data-target');
    tab.removeClass("trends-top__tab--active");
    contentCards.removeClass("trends-cards--active");
    $(activeContent).addClass("trends-cards--active");
    $(this).addClass("trends-top__tab--active");
  });

  //  слайдер секции reviews

  var reviewsSlider = new Swiper(".reviews-container", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,

     // pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    autoplay: {
      delay: 7000,
      disableOnInteraction: true
    }    
  });

  var historySlider = new Swiper(".history-container", {
    // preloadImages: false,
    // lazy: true,
    // when window width is <= 738px
    direction: "vertical",
    spaceBetween: 15,
    loop: false,

    breakpoints: {
      // when window width is >= 739px
      739: {
        direction: "horizontal",
        spaceBetween: 20
        // slidesPerView: 2
      }
    },  
    // Navigation arrows
    navigation: {
      nextEl: ".history-all__buttons-wrapper-right--active",
      prevEl: ".history-all__buttons-wrapper-left"
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    },
  });
// смена цвета активной кнопки секции history
  $('.history-all__buttons-wrapper').on('click', function() {
    if ($(this).hasClass('history-all__buttons-wrapper-right')) { 
      $('.history-all__buttons-wrapper-left').removeClass('history-all__buttons-wrapper-left--active');
      $(this).addClass('history-all__buttons-wrapper-right--active'); 
      if ($(this).hasClass('swiper-button-disabled')) {
        $(this).removeClass('history-all__buttons-wrapper-right--active');
        $('.history-all__buttons-wrapper-left').addClass('history-all__buttons-wrapper-left--active');
      }
    } else { 
      $('.history-all__buttons-wrapper-right').removeClass('history-all__buttons-wrapper-right--active');
      $(this).addClass('history-all__buttons-wrapper-left--active'); 
      if ($(this).hasClass('swiper-button-disabled')) {
        $(this).removeClass('history-all__buttons-wrapper-left--active');
        $('.history-all__buttons-wrapper-right').addClass('history-all__buttons-wrapper-right--active');
      }
    }
  });

// обрезка длинного заголовка в секции history
  function cutLongText(textSize, finalLength) {
    $('.history-all__title').each(function() {
      if ($(this).text().length > textSize) {
        $(this).html($(this).text().slice(0, finalLength) + '...');
      }
    })
  }
  cutLongText(25, 24);  
  // обрезка длинного текста в секции reviews на экранах менее 320px
  $(window).resize(function(){
    if ($(window).width() <= 320) {
      function cutReviewsLongText(textSize, finalLength) {
        $('.swiper-slide > .reviews-text').each(function () {
          if ($(this).text().length > textSize) {
            $(this).html($(this).text().slice(0, finalLength));
          }
        })
      }
      cutReviewsLongText(249, 249);
      }
  })
  $(window).resize(function(){
    if ($(window).width() > 321 && $(window).width() <= 768) {
      function cutReviewsText(textSize, finalLength) {
        $('.swiper-slide > .reviews-text').each(function () {
          if ($(this).text().length > textSize) {
            $(this).html($(this).text().slice(0, finalLength));
          }
        })
      }
      cutReviewsText(287, 287);
    }
  })  
  $(window).resize(function(){
    if ($(window).width() > 769) {
      function cutReviewsBigText(textSize, finalLength) {
        $('.swiper-slide > .reviews-text').each(function () {
          if ($(this).text().length > textSize) {
            $(this).html($(this).text().slice(0, finalLength));
          }      
        })
      }
      cutReviewsBigText(305, 305);
    }
  })  
  
  // обрезка длинного текста в секции history
  function cutHistoryText(textSize, finalLength) {
    $('.history-all__text').each(function() {
      if ($(this).text().length > textSize) {
        $(this).html($(this).text().slice(0, finalLength) + '...');
      }
    })
  }
  cutHistoryText(80, 79);

  // обрезка длинного текста в слайдере секции history
  function cutHistoryLongText(textSize, finalLength) {
    $('.card__inner-title').each(function() {
      if ($(this).text().length > textSize) {
        $(this).html($(this).text().slice(0, finalLength) + '...');
      }
    })
  }
  cutHistoryLongText(54, 53);
  
// выпадающее мобильное меню
  var burgerMenu = $(".burger");
  burgerMenu.on("click", function () {
    $(".navbar-wrapper__close").addClass("navbar-wrapper__close--mobile");
    $(".navbar-wrapper-small").addClass("navbar-wrapper-small__mobile_display");
    $(".navbar-wrapper-big").addClass("navbar-wrapper-big__mobile");
    $("body").addClass("scroll-hidden");
  });
  
// закрытие модального меню - клик по крестику
  var closeMenu = $(".navbar-wrapper__close");
  closeMenu.on("click", function () {
    $(".navbar-wrapper__close").removeClass("navbar-wrapper__close--mobile");
    $(".navbar-wrapper-small").removeClass("navbar-wrapper-small__mobile_display");
    $(".navbar-wrapper-big").removeClass("navbar-wrapper-big__mobile");
    $("body").removeClass("scroll-hidden");
  }); 

// закрытие модального окна - клик по фону
  $(document).mouseup(function (e) {
    var menuWindow = $(".navbar-wrapper-small__mobile_display");
    if (!menuWindow.is(e.target) & menuWindow.has(e.target).length === 0) {
      $(".navbar-wrapper__close").removeClass("navbar-wrapper__close--mobile");
      $(".navbar-wrapper-small").removeClass("navbar-wrapper-small__mobile_display");
    }
    $(".navbar-wrapper-big").removeClass("navbar-wrapper-big__mobile");
    $("body").removeClass("scroll-hidden");
  });

  // закрытие меню при нажатии на пункт меню
  $(document).mouseup(function (e) {
    var menuWindow = $(".navbar-wrapper-small__mobile_display");
    if (menuWindow.has(e.target).length != 0) {
      $(".navbar-wrapper__close").removeClass("navbar-wrapper__close--mobile");
      $(".navbar-wrapper-small").removeClass("navbar-wrapper-small__mobile_display");      
    }
    $(".navbar-wrapper-big").removeClass("navbar-wrapper-big__mobile");
    $("body").removeClass("scroll-hidden");
  });

  //очищаем инпуты форм
  $('input[type="email"]').val('');
  $('input[type="password"]').val('');

  // Окна формы секции Подписаться - валидация полученных данных
  // по событию keyup проверяем логин = email
		$("#myform").keyup(function(){
			if(validEmail()){
				// выводим сообщение, если валидация успешна
				$("#emailMessage").html("<p class='success'>Email введен верно</p>");
			}else{
        // выводим сообщение, если валидация НЕ успешна
				$("#emailMessage").html("<p class='invalid'>Правильный формат name@domain.com</p>");
			}
    });
	function validEmail(){
		// получаем значение инпута email
		var email=$("#myform").val();
		// используем регулярное выражение
    var reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
    if(reg.test(email)){
      return true;
    } else {
      return false;
    }
  }  
  // Форма модального окна popup - валидация полученных данных
  // кнопка отправить спрята изначально
		$("#btn").hide();
		// по событию keyup проверяем логин = email
		$("#email").keyup(function(){
      if (validateEmail()) {
        $("#email").removeClass('invalidated');
				$("#email").addClass('validated');
				// выводим сообщение, если валидация успешна
				$("#emailCheck").html("<p class='success'>Email введен верно</p>");
			}else{
        $("#email").addClass('invalidated');
        // выводим сообщение, если валидация НЕ успешна
				$("#emailCheck").html("<p class='invalid'>Правильный формат name@domain.com</p>");
			}
			buttonState();
		});
		// используем keyup event
		$("#pass").keyup(function(){
			if(validatePassword()){
				$("#pass").removeClass('invalidated');
				$("#pass").addClass('validated');
				$("#passwordCheck").html("<p class='success'>Пароль введен верно</p>");
			}else{
				$("#pass").addClass('invalidated');
				$("#passwordCheck").html("<p class='invalid'>Должны быть строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов</p>");
			}
			buttonState();
    });
  
  function buttonState(){
		if(validateEmail() && validatePassword()){
			// показываем кнопку, если ОБА email и password прошли валидацию
			$("#btn").show();
		}else{
			// иначе она спрятана
			$("#btn").hide();
		}
	}
	function validateEmail(){
		// получаем значение инпута email
		var email=$("#email").val();
		// используем регулярное выражение
		 var reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
		 if(reg.test(email)){
		 	return true;
		 }else{
		 	return false;
		 }
	}
	function validatePassword(){
		//получаем значение поля password
    var pass = $("#pass").val();
    // используем регулярное выражение
		 var reg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
		if(reg.test(pass)){
			return true;
		}else{
			return false;
		}
	}

  //очищаем инпуты всех форм
  // $('input[type="email"]').val('');
  // $('input[type="password"]').val('');

  // Обработка формы Footer
  // $(".subscribe-form").validate({
  //   errorClass: "invalid",
  //   messages: {
  //     email: {
  //       required: "Введите email",
  //       email: "Правильный формат name@domain.com"
  //     },
  //   }
  // }); 

    // Обработка формы модального окна
  // $(".modal__form").validate({
  //   errorClass: "invalid",
  //   messages: {
  //     email: {
  //       required: "Введите Ваш логин",
  //       email: "Правильный формат name@domain.com"
  //     },
  //     password: {
  //       required: "Введите Ваш пароль",
  //       password: "Правильный формат - латиница и цифры"
  //     }
  //   }
  // });

  // $('.modal__input-pass').mask('xxxxxxx', {'translation': {
  //   x: {pattern: /[A-Za-z0-9]/}   
  //   }
  // });

AOS.init({
    disable: 'mobile'
  });

});
