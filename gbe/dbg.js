function dbg_list_bookmarks() {
  var bs = DocumentApp.getActiveDocument().getBookmarks();
  bis = bs.map((b)=>b.getId());
  console.log(bis);

  return;

  for(var b of bs) {
    var bid = b.getId();
    console.log(bid);
    b.getPosition().insertText(bid);
  }
}


var data_t1 = 

{'action': 'share_report',
 'study': {'doctor_performing': 'melnaquib@gmail.com',
           'doctor_referring': 'melnaquib.sv@gmail.com',
           'patient': 'mustafa@globalultrasoundinstitute.com',
           'study_id': ' 191',
           'study_iuid': '1.3.46.670589.11.0.1.1996082307380006',
           'template_id': '1YUqgBpMeScQfKfjSIzQcMeGz2YSj1JjUTyGqD8Lxjfs'},
 'template': {'bookmarks': {'id.2foduxjbal66': 'summary',
                            'id.8s30gg2xi168': 'doctor_performing',
                            'id.lh5ssgdcdm07': 'findings_imgs',
                            'id.qt38aa6hiyl': 'doctor_referring',
                            'id.v6sia8vj9vu3': 'patient'},
              'template_id': '1YUqgBpMeScQfKfjSIzQcMeGz2YSj1JjUTyGqD8Lxjfs'}}

;

function test_doServer() {
  var action = data_t1["action"];
  return doServe(action, data_t1);
}