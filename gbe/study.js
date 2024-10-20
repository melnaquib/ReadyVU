var documentProperties = PropertiesService.getDocumentProperties();
var scriptProperties = PropertiesService.getScriptProperties();
var userProperties = PropertiesService.getUserProperties();

function getProp(key) {
  return documentProperties.getProperty(key);
}

function setProp(key, val) {
  return documentProperties.setProperty(key, val);
}

var study = {
  orig_doc_id: getProp("orig_doc_id"),
  doc_id: getProp("doc_id"),
  study_id: getProp("study_id"),
  study_iuid: getProp("study_iuid"),
  report_id: getProp("report_id"),
};
