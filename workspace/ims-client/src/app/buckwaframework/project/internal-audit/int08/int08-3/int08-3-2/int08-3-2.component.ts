import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Location } from "@angular/common";
import { AjaxService } from "../../../../../common/services/ajax.service";
import { MessageBarService } from "../../../../../common/services/message-bar.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Alert } from "../../../../../../../../node_modules/@types/selenium-webdriver";
import { AuthService } from "services/auth.service";
import { BreadCrumb } from "models/breadcrumb";

declare var jQuery: any;
declare var $: any;
@Component({
  selector: "int08-3-2",
  templateUrl: "./int08-3-2.component.html",
  styleUrls: ["./int08-3-2.component.css"]
})
export class Int0832Component implements OnInit {

  riskHdrName: any;
  datatable: any;
  budgetYear: any;
  yearList: any[];
  wsRiskList: any[];
  pageList: any[];
  isConditionShow: any = false;
  breadcrumb: BreadCrumb[]


  constructor(private router: Router,
    private route: ActivatedRoute,
    private ajax: AjaxService,
    private authService: AuthService,
    private messageBarService: MessageBarService
  ) {
    this.breadcrumb = [
      { label: "ตรวจสอบภายใน", route: "#" },
      { label: "การประเมินความเสี่ยง ", route: "#" },
      { label: "ประเมินความเสี่ยงสำนักงานสรรพสามิตภาคพื้นที่", route: "#" },
      { label: "กำหนดปัจจัยเสี่ยงประเมินความเสี่ยงสำนักงานสรรพสามิตภาคพื้นที่", route: "#" },
    ];
   }
  1
  ngOnInit() {
    this.authService.reRenderVersionProgram('INT-08320');
    this.riskHdrName = "";
    this.budgetYear = "";
    this.wsRiskList = ["ปัจจัยเสี่ยงความถี่การเข้าตรวจสอบ",
      "ปัจจัยเสี่ยงผลการจัดเก็บรายได้",
      "ปัจจัยเสี่ยงผลการปราบปรามด้านค่าปรับคดี",
      "ปัจจัยเสี่ยงผลการปราบปรามด้านจำนวนคดี",
      "ปัจจัยเสี่ยงการเงินและบัญชี",
      "ปัจจัยเสี่ยงระบบการควบคุมภายใน",
      "ปัจจัยเสี่ยงการส่งเงินเกิน 3 วัน",
      "ปัจจัยเสี่ยงแบบสอบถามระบบการควบคุมภายใน"];
    this.pageList = ["/int08/3/3",
      "/int08/3/6",
      "/int08/3/7",
      "/int08/3/8",
      "/int08/3/9",
      "/int08/3/9",
      "/int08/3/11",
      "/int08/3/10"];
    //this.initDatatable();
  }
  ngAfterViewInit() {
    this.budgetYear = this.route.snapshot.queryParams["budgetYear"];
    this.initDatatable();
  }


  addRiskAssRiskWsHdr() {
    console.log(this.budgetYear);
    const URL = "ia/int083/addRiskAssExcAreaHdr";

    this.ajax.post(URL, { riskHdrName: this.riskHdrName, budgetYear: this.budgetYear, active: 'Y' }, res => {
      var message = res.json();
      this.messageBarService.successModal(message.messageTh, "สำเร็จ");
      this.riskHdrName = "";
      this.datatable.destroy();
      this.initDatatable();
    }, errRes => {
      var message = errRes.json();
      this.messageBarService.errorModal(message.messageTh);

    });

  }

  initDatatable(): void {
    const URL = AjaxService.CONTEXT_PATH + "ia/int083/searchRiskAssExcAreaHdr";
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
        data: { budgetYear: this.budgetYear }
      },
      columns: [

        {
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          },
          className: "center"
        },
        { data: "riskHdrName" },
        { data: "budgetYear" },
        { data: "createdBy" },
        {
          render: function (data, type, row, meta) {
            console.log("data :", row.createdDate)
            if (row.createdDate != null && row.createdDate != undefined && row.createdDate != '') {
              var dateTime = new Date(row.createdDate).toLocaleString("th-TH");
              return dateTime.split(' ')[0];
            } else {
              return row.createdDate;
            }
          },
          className: "center"
        },
        // { data: "createdDate" },
        {
          data: "active",
          render: function (data, type, row, meta) {

            return '<button type="button" class="ui mini button ' + (data == "Y" ? "green" : "orange") + ' chk"><i class="power off icon"></i>' + (data == "Y" ? "เปิด" : "ปิด") + '</button>';
          }
        },
        {
          data: "riskHdrId",
          render: function () {
            return '<button type="button" class="ui mini button primary dtl"><i class="eye icon"></i> รายละเอียด</button>'
              + '<button type="button" class="ui mini red button red del"><i class="trash icon"></i> ลบ</button>';
          }
        }
      ],
      columnDefs: [
        { targets: [0, 2, 3, 4, 5, 6], className: "center aligned" },
        { targets: [1], className: "left aligned" }

      ],
      rowCallback: (row, data, index) => {
        $("td > .dtl", row).bind("click", () => {
          console.log("dtl");
          console.log(data.riskHdrName);
          console.log(this.wsRiskList.indexOf(data.riskHdrName));
          var indexPage = this.wsRiskList.indexOf(data.riskHdrName.trim());
          if (indexPage >= 0) {
            this.router.navigate([this.pageList[indexPage]], {
              queryParams: { id: data.riskHrdId }
            });
          } else {
            this.router.navigate(["/int08/3/4"], {
              queryParams: { id: data.riskHrdId }
            });
          }

        })
        $("td > .del", row).bind("click", () => {
          console.log("del");
          console.log(data.riskHrdId);

          const URL = "ia/int083/deleteRiskAssExcAreaHdr";

          this.ajax.post(URL, { riskHrdId: data.riskHrdId }, res => {
            var message = res.json();
            this.riskHdrName = "";
            this.messageBarService.successModal(message.messageTh, "สำเร็จ");
            this.datatable.destroy();
            this.initDatatable();
          }, errRes => {
            var message = errRes.json();
            this.messageBarService.errorModal(message.messageTh);


          });
        })
        $("td > .chk", row).bind("click", () => {
          console.log("chk");
          console.log(row.riskHrdId);
          console.log(data.riskHrdId);
          console.log(index);

          const URL = "ia/int083/updateStatusRisk";
          var newActive = data.active == 'N' ? 'Y' : 'N';
          this.ajax.post(URL, { riskHrdId: data.riskHrdId, active: newActive }, res => {
            //console.log(res.json());
            this.datatable.destroy();
            this.initDatatable();
          });

        })
          ;
      }
    });
  }

  getYearBackCount() {
    console.log(this.budgetYear);
    const URL = "combobox/controller/getYearBackCount";

    this.ajax.post(URL, {}, res => {
      console.log("res.json()");
      this.yearList = res.json();


    });
  }
  cancelFlow() {
    this.messageBarService.comfirm(foo => {
      // let msg = "";
      if (foo) {
        this.router.navigate(["/int08/3/1"], {
          queryParams: { budgetYear: this.budgetYear }
        });
      }
    }, "คุณต้องการยกเลิกการทำงานใช่หรือไม่ ? ");
  }

  configAllCondition() {
    this.router.navigate(["/int08/3/5"], {
      queryParams: { budgetYear: this.budgetYear }
    });
  }

  openConditioinRL() {
    this.isConditionShow = true;
  }

  closeConditionRL(e) {
    this.isConditionShow = false;
  }



}
