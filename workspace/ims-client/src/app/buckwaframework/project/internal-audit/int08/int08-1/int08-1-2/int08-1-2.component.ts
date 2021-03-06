import { Component, OnInit } from "@angular/core";
import { AuthService } from "services/auth.service";

declare var $: any;
@Component({
  selector: "int08-1-2",
  templateUrl: "./int08-1-2.component.html",
  styleUrls: ["./int08-1-2.component.css"]
})
export class Int0812Component implements OnInit {
  showData: boolean = false;
  public data: String[];

  constructor( private authService: AuthService) {
    this.data = [
      "ประเมินความเสี่ยงโครงการ - งบประมาณ",
      "ประเมินความเสี่ยงโครงการ - ประสิทธิภาพ",
      "ประเมินความเสี่ยงโครงการ - รวม",
      "ประเมินความเสี่ยงสารสนเทศ - จำนวนครั้งใช้งานไม่ได้",
      "ประเมินความเสี่ยงสารสนเทศ - ร้อยละความเห็น",
      "ประเมินความเสี่ยงภาคพื้นที่ - ความถี่การตรวจ",
      "ประเมินความเสี่ยงภาคพื้นที่ - ผลการจัดเก็บรายได้",
      "ประเมินความเสี่ยงภาคพื้นที่ - ผลการปราบปราม (ค่าปรับ)",
      "ประเมินความเสี่ยงภาคพื้นที่ - ผลการปราบปราม (คดี)",
      "ประเมินความเสี่ยงภาคพื้นที่ - ผลการปราบปราม (รวม)",
      "ประเมินความเสี่ยงภาคพื้นที่ - การเงินและบัญชี",
      "ประเมินความเสี่ยงภาคพื้นที่ - ควบคุมภายใน",
      "ประเมินความเสี่ยงภาคพื้นที่ - รวม"
    ];
  }

  ngOnInit() {
    this.authService.reRenderVersionProgram('INT-08120');
    $(".ui.dropdown").dropdown();
    $(".ui.dropdown.ai").css("width", "100%");
  }

  ngAfterViewInit() {
    $("#select1").hide();
    $("#select2").hide();
    $("#select3").hide();
    $("#selectCondition1").dropdown();
    $("#selectCondition2").dropdown();
    $("#selectCondition3").dropdown();
    $("#selectColor1").dropdown();
    $("#selectColor2").dropdown();
    $("#selectColor3").dropdown();
  }

  uploadData() {
    this.showData = true;
  }

  clearData() {
    this.showData = false;
  }

  popupEditData() {
    $("#select1").show();
    $("#select2").show();
    $("#select3").show();
    $("#modalInt0812").modal("show");
  }

  closePopupEdit() {
    $("#select1").hide();
    $("#select2").hide();
    $("#select3").hide();
    $("#modalInt0812").modal("hide");
  }
}
