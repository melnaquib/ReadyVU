
'📡 📠 👨‍⚕‍ 🔬 ⚗ c 🎞   🌐'
function setupMenus() {
  var ui = DocumentApp.getUi();

  ui.createMenu('📠 ReadyVU')
      .addItem('👨‍⚕ Login...', 'radiologist_login')
      .addSeparator()

      .addItem('🎞 Open Viewer', 'viewer_open')
      .addSeparator()

      .addItem('🔏 Sign and Send', 'report_send')
      .addSeparator()
      .addItem('🔏 Approve and Send', 'report_approve')
      .addSeparator()

      .addItem('📠 About ReadyVU...', "readyvu_about")

      .addToUi();

}

function setupUi() {
  setupMenus();
}
