import { Component, OnInit } from "@angular/core";
import { AjaxService } from "../../../../../common/services/ajax.service";
import { MessageBarService } from "../../../../../common/services/message-bar.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "services/auth.service";
import { RiskAssRiskWsHdr } from "models/RiskAssRiskWsHdr";
import { BreadCrumb } from "models/breadcrumb";

declare var jQuery: any;
declare var $: any;
const URL = {
  DROPDOWN: "combobox/controller/getDropByTypeAndParentId"
};
@Component({
  selector: 'app-int08-3-8',
  templateUrl: './int08-3-8.component.html',
  styleUrls: ['./int08-3-8.component.css']
})
export class Int0838Component implements OnInit {

  datatable: any;
  id: any;
  riskAssRiskWsHdr: RiskAssRiskWsHdr;
  breadcrumb: BreadCrumb[];

  titleList: any[] = [];
  isConditionShow: any;
  constructor(private router: Router,
    private authService: AuthService,
    private ajax: AjaxService,
    private messageBarService: MessageBarService,
    private route: ActivatedRoute) { 
      this.breadcrumb = [
        { label: "ตรวจสอบภายใน", route: "#" },
        { label: "การประเมินความเสี่ยง", route: "#" },
        { label: "ประเมินความเสี่ยงสำนักงานสรรพสามิตภาคพื้นที่", route: "#" },
        { label: "รายละเอียดปัจจัยเสี่ยงผลการปราบปรามด้านจำนวนคดี" , route: "#" },
      ];
    }

  ngOnInit() {
    this.riskAssRiskWsHdr = new RiskAssRiskWsHdr();
    this.riskAssRiskWsHdr.checkPosition = 'ผู้อำนวยการกลุ่มตรวจสอบภายใน';
    this.authService.reRenderVersionProgram('INT-08380');
    $(".ui.dropdown").dropdown();
    $(".ui.dropdown.ai").css("width", "100%");
    this.id = this.route.snapshot.queryParams["id"];
    this.findRiskById();
    this.initDatatable();
    this.ajax.post(URL.DROPDOWN, { type: 'TITLE' }, res => {
      this.titleList = res.json();

    });
  }

  findRiskById() {
    let url = "ia/int083/findRiskById"
    this.ajax.post(url, { riskHrdId: this.id }, res => {

      this.riskAssRiskWsHdr = res.json();
      this.riskAssRiskWsHdr.checkPosition = 'ผู้อำนวยการกลุ่มตรวจสอบภายใน';
      console.log(this.riskAssRiskWsHdr);

    });
  }

  initDatatable(): void {
    const URL = AjaxService.CONTEXT_PATH + "ia/int083/dataTableWebService4";
    console.log(URL);
    this.datatable = $("#dataTable").DataTableTh({
      lengthChange: false,
      searching: false,
      ordering: false,
      pageLength: 10,
      processing: true,
      serverSide: true,
      paging: false,
      ajax: {
        type: "POST",
        url: URL,
        data: { riskHrdId: this.id }
      },
      columns: [

        {
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          },
          className: "center"
        },
        { data: "departmentName" },
        { data: "resultsIncome", render: $.fn.dataTable.render.number(',', '.', 2, '') },
        { data: "budgetIncome", render: $.fn.dataTable.render.number(',', '.', 2, '') },
        { data: "budgetDiff", render: $.fn.dataTable.render.number(',', '.', 2, '') },
        { data: "percenDiff", render: $.fn.dataTable.render.number(',', '.', 2, '') },

        { data: "rl" },
        { data: "valueTranslation" }

      ],
      columnDefs: [
        { targets: [0, 6, 7], className: "center aligned" },
        { targets: [1], className: "left aligned" },
        { targets: [2, 3, 4, 5], className: "right aligned" }

      ], createdRow: function (row, data, dataIndex) {
        console.log("row");
        console.log("data", data.color);
        console.log("dataIndex", dataIndex);
        if (data.color == 'แดง') {
          $(row).find('td:eq(6)').addClass('bg-c-red');
          $(row).find('td:eq(7)').addClass('bg-c-red');
        } else if (data.color == 'เขียว') {
          $(row).find('td:eq(6)').addClass('bg-c-green');
          $(row).find('td:eq(7)').addClass('bg-c-green');
        } else if (data.color == 'เหลือง') {
          $(row).find('td:eq(6)').addClass('bg-c-yellow');
          $(row).find('td:eq(7)').addClass('bg-c-yellow');
        }

      }


    });
  }


  saveRiskAssRiskWsDtl(): void {

    console.log(this.datatable.data());
    var msgMessage = "";
    if (this.riskAssRiskWsHdr.checkLastName == null || this.riskAssRiskWsHdr.checkLastName == undefined || this.riskAssRiskWsHdr.checkLastName == "") {
      msgMessage = "กรุณากรอก \"นามสกุลผู้ตรวจ\" ";
    }
    if (this.riskAssRiskWsHdr.checkUserName == null || this.riskAssRiskWsHdr.checkUserName == undefined || this.riskAssRiskWsHdr.checkUserName == "") {
      msgMessage = "กรุณากรอก \"ชื่อผู้ตรวจ\" ";
    }
    if (this.riskAssRiskWsHdr.checkUserTitle == null || this.riskAssRiskWsHdr.checkUserTitle == undefined || this.riskAssRiskWsHdr.checkUserTitle == "") {
      msgMessage = "กรุณากรอก \"คำนำหน้าชื่อผู้ตรวจ\" ";
    }
    if (this.riskAssRiskWsHdr.createPosition == null || this.riskAssRiskWsHdr.createPosition == undefined || this.riskAssRiskWsHdr.createPosition == "") {
      msgMessage = "กรุณากรอก \"ตำแหน่งผู้จัดทำ\" ";
    }
    if (this.riskAssRiskWsHdr.createLastName == null || this.riskAssRiskWsHdr.createLastName == undefined || this.riskAssRiskWsHdr.createLastName == "") {
      msgMessage = "กรุณากรอก \"นามสกุลผู้จัดทำ\" ";
    }
    if (this.riskAssRiskWsHdr.createUserName == null || this.riskAssRiskWsHdr.createUserName == undefined || this.riskAssRiskWsHdr.createUserName == "") {
      msgMessage = "กรุณากรอก \"ชื่อผู้จัดทำ\" ";
    }
    if (this.riskAssRiskWsHdr.createUserTitle == null || this.riskAssRiskWsHdr.createUserTitle == undefined || this.riskAssRiskWsHdr.createUserTitle == "") {
      msgMessage = "กรุณากรอก \"คำนำหน้าชื่อผู้จัดทำ\" ";
    }
    if (this.riskAssRiskWsHdr.riskHrdPaperName == null || this.riskAssRiskWsHdr.riskHrdPaperName == undefined || this.riskAssRiskWsHdr.riskHrdPaperName == "") {
      msgMessage = "กรุณากรอก \"ชื่อกระดาษทำการ\" ";
    }


    var url = "ia/condition/findConditionByParentId";
    this.ajax.post(url, { parentId: this.id, riskType: 'MAIN', page: 'int08-3-8' }, res => {
      var conditionList = res.json();
      console.log("conditionList", conditionList.length)
      if (conditionList.length == 0) {
        msgMessage = "กรุณากำหนดเงื่อนไขความเสี่ยง";
      }
      if (msgMessage == "") {
        var url = "ia/int083/updateRiskAssExcNocDtl";

        this.ajax.post(url, this.riskAssRiskWsHdr, res => {
          console.log(res.json());
          var message = res.json();
          console.log(message.messageType);
          if (message.messageType == 'E') {
            this.messageBarService.errorModal(message.messageTh, 'แจ้งเตือน');
          } else {
            this.messageBarService.successModal(message.messageTh, 'บันทึกข้อมูลสำเร็จ');
            this.router.navigate(["/int08/3/2"], {
              queryParams: { budgetYear: this.riskAssRiskWsHdr.budgetYear }
            });
          }

        }, errRes => {
          var message = errRes.json();
          console.log(message);
          this.messageBarService.errorModal(message.messageTh);

        });
      } else {
        this.messageBarService.errorModal(msgMessage);
      }

    });


  }

  cancelFlow() {
    this.messageBarService.comfirm(foo => {
      // let msg = "";
      if (foo) {
        this.router.navigate(["/int08/3/2"], {
          queryParams: { budgetYear: this.riskAssRiskWsHdr.budgetYear }
        });
      }
    }, "คุณต้องการยกเลิกการทำงานใช่หรือไม่ ? ");
  }
  getConditionShow() {
    return this.isConditionShow;
  }
  modalConditionRL() {
    this.isConditionShow = true;
  }

  closeConditionRL(e) {
    this.isConditionShow = false;
  }


}
