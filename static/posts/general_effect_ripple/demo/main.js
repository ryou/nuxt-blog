var attachRipple = function(selector) {
  var rippleBtns = document.querySelectorAll(selector);

  rippleBtns.forEach(function(rippleBtn) {
    var ripple = document.createElement('span');
    ripple.classList.add('Ripple');
    var animation = document.createElement('span');
    animation.classList.add('Ripple__animation')

    ripple.appendChild(animation);
    rippleBtn.appendChild(ripple);

    rippleBtn.addEventListener('click', function(event) {
      var point = {
        x: event.layerX,
        y: event.layerY,
      };

      animation.style.top = `${point.y}px`;
      animation.style.left = `${point.x}px`;

      animation.classList.add('--enter');
    });
    animation.addEventListener('animationend', function(event) {
      animation.classList.remove('--enter');
    });
  });
};

attachRipple('.Btn[data-ripple=true]');
