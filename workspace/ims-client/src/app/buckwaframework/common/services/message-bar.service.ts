import { Injectable } from "@angular/core";
import { AlertMessage } from "./../models/index";

declare var $: any;

@Injectable()
export class MessageBarService {
  public static INFO_ICON: string = "info icon";
  public static SUCCESS_ICON: string = "checkmark icon";
  public static ERROR_ICON: string = "warning sign icon";
  private messageList: AlertMessage[] = [];

  constructor() {}

  info(message: string) {
    let msg: AlertMessage = new AlertMessage();
    msg.header = "Info";
    msg.message = message;
    msg.iconType = MessageBarService.INFO_ICON;
    this.messageList.push(msg);
  }

  success(message: string) {
    let msg: AlertMessage = new AlertMessage();
    msg.header = "Success";
    msg.message = message;
    msg.iconType = MessageBarService.SUCCESS_ICON;
    this.messageList.push(msg);
  }

  error(message: string) {
    let msg: AlertMessage = new AlertMessage();
    msg.header = "Error";
    msg.message = message;
    msg.iconType = MessageBarService.ERROR_ICON;
    this.messageList.push(msg);
  }

  getMessageList(): AlertMessage[] {
    return this.messageList;
  }

  clear() {
    this.messageList.length = 0;
  }

  comfirm(func: Function, message: string, title: string = "การยืนยัน") {
    $("#confirm div.header").html(title);
    $("#confirm div.content").html(message);
    $("#confirm")
      .modal({
        onApprove: function(element) {
          func(true);
        },
        onDeny: function(element) {
          func(false);
        },
        closable: false
      })
      .modal("show");
  }

  alert(message: string, title: string = "แจ้งเตือน") {
    $(".baiwa-alert div.header").html(title);
    $(".baiwa-alert div.content").html(message);
    $(".baiwa-alert div.actions").html(
      `<div class="ui red mini cancel inverted button">
            <i class="remove icon"></i> ปิด
        </div>`
    );
    $(".baiwa-alert").modal("show");
  }

  errorModal = (msg: string = "ไม่สามารถทำรายการได้กรุณาลองใหม่อีกครั้ง หรือ ติดต่อผู้ดูแลระบบ", title: string = "เกิดข้อผิดพลาด") => {
    $("#alert-header").html(title);
    $("#alert-content").html(msg);
    $("#alert-actions").html(
      `<div class="ui red mini cancel inverted button">
            <i class="remove icon"></i> ปิด
        </div>`
    );
    $("#alert").modal("show");
  };

  successModal = (msg: string, title: string = "สำเร็จ") => {
    $("#alert-header").html(title);
    $("#alert-content").html(msg);
    $("#alert-actions").html(
      `<div class="ui green mini cancel inverted button">
            <i class="check icon"></i> ตกลง
        </div>`
    );
    $("#alert").modal("show");
  };
}
