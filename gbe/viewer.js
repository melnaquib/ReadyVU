function viewer_open() {
  // "http://localhost:8042/stone-webviewer/index.html?study=1.3.46.670589.11.0.1.1996082307380006&series=1.3.46.670589.11.0.2.1996082307380006";
  study.study_iuid = "1.3.46.670589.11.0.1.1996082307380006";
  var aurl = CFG.viewer_baseurl + "?study=" + study.study_iuid + '&report_id=' + study.report_id;
  console.log("AURL", aurl);
  frame_open(aurl, 'Study Viewer 🎞');
}

function report_add_img(data) {
  var report_id = data["report_id"];
  var imgDataEnc = data["img"];
  var imgData = Utilities.base64Decode(imgDataEnc, Utilities.Charset.UTF_8);
  var img = Utilities.newBlob(imgData, "image/png", 'img.png'); 

  var doc = DocumentApp.openById(report_id);
  var body = doc.getBody();
  var img = body.appendImage(img);
  return img.getHeight();
}

function test_viewer_add_img() {  
  var data = {}; //args
  data["action"] = "report_add_img";
  data["report_id"] = "1YUqgBpMeScQfKfjSIzQcMeGz2YSj1JjUTyGqD8Lxjfs";

  var content_url = "http://pngimg.com/uploads/mario/mario_PNG125.png";
  var imgBlob = UrlFetchApp.fetch(content_url).getBlob();
  var img = Utilities.base64Encode(imgBlob.getBytes());
  data["img"] = img;
  
  var res = doServe(data["action"], data);
  console.log(res);
}
