function fill_doc_bookmarks(doc, template, study) {
  var bs =  doc.getBookmarks();
  // var bs =  DocumentApp.getActiveDocument();
  for(var b of bs) {
    var bid = b.getId();
    var bname = bookmarks_id_name[bid];
    var notAvail = bname in study && study[bname] === undefined;
    var val = notAvail ? "NOT AVAILABLE!" : study[bname];
    if (!val)
      val = "";
    b.getPosition().insertText(val);
  }
}

function share_report_sub(email, data, keys) {
  var dst = cp(data["template"]["template_id"]);
  var doc = DocumentApp.openById(dst.getId());
  var study = {
  };
  for(var k in data["study"]) {
    study[k] = undefined;
  }

  for(var k of keys) {
    study[k] = data["study"][k];
  }
  fill_doc_bookmarks(doc, data["template"], study);
  dst.addEditor(email);
  return dst;
}

function share_report(data) {
  console.log(data);
  share_report_sub(data["study"]["doctor_referring"], data, 
 ["template_id", "study_iuid", "study_id", "doctor_referring", 'doctor_performing', "patient"]
  );
  share_report_sub(data["study"]["doctor_performing"], data, 
 ["template_id", "study_iuid", "study_id", 'doctor_performing']
  );
//   share_report_sub(data["study"]["patient"], data, 
//  ["template_id", "study_iuid", "study_id", "doctor_referring", 'doctor_performing', "patient"]
//   );

}
