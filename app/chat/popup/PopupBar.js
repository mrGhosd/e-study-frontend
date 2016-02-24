import angular from 'angular';

popupBar.$inject = ['PopupMessage'];

export default function popupBar (PopupMessage) {
  return {
        restrict:"C",
        link: function(sc, el) {
            PopupMessage.registerDOM(el);
        }
    }
}
