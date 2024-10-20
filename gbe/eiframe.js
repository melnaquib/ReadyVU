function frame_open(aurl, atitle) {

  const TIMEOUT = 2000;
  var ss =   'setTimeout(function(){location.href="' + aurl + '"} , ' +  TIMEOUT + ');';

  var html = '<!DOCTYPE HTML><html lang="en-US"><head><title>' + atitle + '</title>'
  + '</head><body onload=\'' + ss + '\'>'
  + '"<p><a href="' + aurl + '" target="_blank">' + atitle + '</a>.</p>'
  + "</body></html>";
  var html_output = HtmlService.createHtmlOutput(html);
  html_output.setHeight(700);
  html_output.setWidth(900);
  DocumentApp.getUi().showModalDialog(html_output, atitle);
}
