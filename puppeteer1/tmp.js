function asd(t) {
  switch ((void 0, t.data)) {
    case "key-close":
      window.csdn.loginBox.self2 && window.csdn.loginBox.self2.close();
      break;
    case "im_client":
      window.csdn.loginBox.self2 && window.csdn.loginBox.self2.close(),
        window.open("https://csdn.s2.udesk.cn/im_client/?web_plugin_id=29181");
      break;
    case "pop":
      window.csdn.loginBox.self2 && window.csdn.loginBox.self2.close(),
        window.csdn.loginBox.show();
      break;
    case "page_reload":
      window.csdn.loginBox.self2 && window.csdn.loginBox.self2.close(),
        window.location.reload();
      break;
    case "page_reload_onclose":
      window.csdn.loginBox.self &&
        window.csdn.loginBox.self.changeCloseReLoadSwitch(1);
      break;
    case "pay-cb":
      window.csdn.loginBox.self &&
        window.csdn.loginBox.self.cb &&
        window.csdn.loginBox.self.cb();
      break;
    case "pay-data":
      window.csdn.loginBox.self &&
        window.csdn.loginBox.self.$iframeHtml[0].contentWindow.postMessage(
          { payInfo: window.csdn.loginBox.self.payInfo },
          "*"
        );
      break;
    case "show_login_box_by_tip":
      window.csdn.loginBox.autoLoginTip &&
        window.csdn.loginBox.autoLoginTip.close();
      var i = { spm: "1001.2101.3001.9568" },
        o = { spm: i.spm };
      p &&
        p.curCookie &&
        ((i.reportExtra = { popupType: p.taskId + "-" + p.curCookie.version }),
        (o.extra = JSON.stringify(i.reportExtra))),
        e(o),
        window.csdn.loginBox.show(i);
      break;
    case "close_activate_page":
      window.csdn.loginBox.self && window.csdn.loginBox.self.close();
      break;
    default:
      return !1;
  }
}
