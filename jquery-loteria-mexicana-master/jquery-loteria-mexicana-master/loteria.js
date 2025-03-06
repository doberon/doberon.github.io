$(document).ready(function () {
  function getRandomInteger(min, max) {
    var floatingPoint = Math.random();
    var floatingPointInRange = floatingPoint * (max - min + 1) + min;
    return Math.floor(floatingPointInRange);
  }

  $('.carton__baraja').click(function() {
    $(this).attr('src', 'baraja/' + getRandomInteger(1, 54) + '.jpg');
  });

  $('.carton__loteria').each(function () {
    $(this).children('img').attr('src', 'baraja/' + getRandomInteger(2, 54) + '.jpg');
    $(this).children('div').append('<img src="10_centavos.png">');
  });

  $('.carton__loteria > img').click(function () {
    $(this).siblings().show();
  });

  $('.carton__loteria > div').click(function () {
    $(this).hide();
  });

});
