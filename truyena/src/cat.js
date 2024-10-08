function execute(url, page) {
  const cat_id = url.split('/')[4];
  if (!page) page = '0';
  const doc = Http.get('https://truyena.net/index.php?cat='+cat_id+'&page='+page).html()
var next = doc.select('.pagination').select('li.active + li').text();

  const el = doc.select(".story-list .row")

  const data = [];
  for (var i = 0; i < el.size(); i++) {
      var e = el.get(i);
      data.push({
          name: e.select(".story-list-title").first().text(),
          link: e.select(".story-list-title a").first().attr("href"),
          cover: e.select(".imgThumb img").first().attr("src"),
          description: e.select("a[href~=tac-gia]").first().text(),
          host: "https://truyena.net"
      })
  }
  return Response.success(data, next)
}