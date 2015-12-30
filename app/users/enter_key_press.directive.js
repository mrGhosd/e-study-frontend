enterKeyPressDirective.$inject = [];

export default function enterKeyPressDirective() {
  return function(scope, element, attrs) {
    element.bind("keydown", function (event) {
            if(!event.ctrlKey && event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterKeyPress);
                });
                event.preventDefault();
            }
        });
  };
}
