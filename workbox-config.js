module.exports = {
    "globDirectory": "dist/static",
    "globPatterns": [
      "blog/**/*.html",
      "workshops/**/*.html",
      "assets/**/*.{woff,woff2,webp}",
      "manifest/**/*.*",
      "*.html",
      "*.{jpg,png,eot,ttf,woff,woff2, webp}"
      // "*.{jpg,png,eot,svg,ttf,woff,woff2, webp}"
    ],
    "swDest": "dist/static/sw.js",
    "swSrc": "src/sw.js"
  };