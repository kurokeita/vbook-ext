function execute(url) {
  load('config.js');
  url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
  var doc = Http.get(url).html();
  if (doc) {
      doc.select("noscript").remove();
      doc.select("script").remove();
      doc.select("iframe").remove();
      doc.select("ins").remove();
      doc.select("div[class^=ads]").remove();
      doc.select("[style=font-size.0px;]").remove();
      doc.select("a").remove();

      var content = doc.select("div.chapter-c");
      content.select(".show-db").remove();

      var lines = content.select("p");
      var skipAttributes = [
        "class",
        "style",
        "onmousedown",
        "onselectstart",
        "oncopy",
        "oncut",
      ];
      var txt = "";
      lines.forEach((line) => {
        if (line.text() !== "") {
          txt += line.html() + "</br>"
        } else {
          line.attributes().asList().forEach((a) => {
            if (!skipAttributes.includes(a.getKey())) {
              line.text(a.getValue());
              txt += a.html() + "</br>";
            }
          })
        }
      })

      return Response.success(txt);
  }
  return null;
}