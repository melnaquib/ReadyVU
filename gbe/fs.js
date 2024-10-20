function cp(src) {
  var res = DriveApp.getFileById(src).makeCopy();
  return res;
}
