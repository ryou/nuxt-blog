document.addEventListener('DOMContentLoaded', function() {

  (function() {
    var components = document.querySelectorAll('.box');

    components.forEach(function(component) {
      component.addEventListener('click', function(e) {
        console.log(`target:`);
        console.log(e.target);
        console.log(`currentTarget:`);
        console.log(e.currentTarget);
        console.log(`client: ${e.clientX}:${e.clientY}`);
        console.log(`page: ${e.pageX}:${e.pageY}`);
        console.log(`offset: ${e.offsetX}:${e.offsetY}`);
      });
    });
  })();
});
