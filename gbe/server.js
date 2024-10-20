function doServe(action, data) {
  if("share_report" === action)return share_report(data);
  if("report_add_img" === action)return report_add_img(data);

}

function doGet() {
  // return doServe(data);
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents)
  return doServe(data["action"], data);

}

