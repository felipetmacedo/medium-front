myApp.filter("truncate", function () {
  return function (text, length) {
    if (!text) {
      return text;
    }

    return text.length > length ? text.substring(0, length) + "..." : text;
  };
});
