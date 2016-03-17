export function getBrowserName() {
  var browser = "";
  var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var is_explorer = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  var is_safari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;
  var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
  if ((is_chrome)&&(is_safari)){ is_safari = false; }
  if ((is_chrome)&&(is_opera)) { is_chrome = false; }

  if (is_chrome) {
    browser = "Google Chrome";
  }
  if (is_explorer) {
    browser = "Internet Explorer";
  }
  if (is_firefox) {
    browser = "Mozilla Firefox";
  }
  if (is_safari) {
    browser = "Apple Safari";
  }
  if (is_opera) {
    browser = "Opera";
  }

  return browser;
}
