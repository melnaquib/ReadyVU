function bidic(d) {
  var r = {};
  for(k in d) {
    r[d[k]] = k;
  }
  return r;
}

var bookmarks_id_name = {
  'id.lh5ssgdcdm07': "doctor_referring",
  'id.8s30gg2xi168': "patient",
  'id.v6sia8vj9vu3': "findings",
  'id.2foduxjbal66': "summary",
  'id.qt38aa6hiyl': "doctor_performing",
};

var bookmarks_name_id = bidic(bookmarks_id_name);
