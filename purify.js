const purify = require("purify-css");

var content = ['./client/public/js/custom.min.js', './client/public/js/jquery.slimscroll.js', './client/public/js/scripts.js', './client/public/js/sidebarmenu.js', './client/src/components/check.js', './client/src/components/dashboard.js', './client/src/components/footer.js', './client/src/components/header.js', './client/src/components/helper.js', './client/src/components/search.js', './client/src/components/sidebar.js'];
//var css = '.button-active { color: green; } .unused-class { display: block; }';
var css = ['./client/public/css/style.min.css'];

var options = {
  output: './public/style_purified.css',

  // Will minify CSS code in addition to purify.
  minify: true
};

purify(content, css, options);