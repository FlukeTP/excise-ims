import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import {
  TravelCostHeader,
  TravelCostDetail,
  Contract
} from "../../../../../common/models";
import { AjaxService, MessageBarService, AuthService } from "../../../../../common/services";
import { Prices } from "../../../../../common/helper/travel";
import { Router, ActivatedRoute } from "@angular/router";
import {
  digit,
  numberWithCommas,
  TextDateTH,
  formatter,
  DecimalFormat
} from "../../../../../common/helper";
import { TravelService } from "../../../../../common/services/travel.service";
import { Headers } from "@angular/http/src/headers";
import { File } from "app/buckwaframework/common/models/file";
import { BreadCrumb } from 'models/index';

declare var $: any;
@Component({
  selector: "app-cop07-1-1",
  templateUrl: "./cop07-1-1.component.html",
  styleUrls: ["./cop07-1-1.component.css"]
})
export class Cop0711Component implements OnInit, OnDestroy {

  searchFlag: String;
  fileUpload: File[];

  id: any;
  fiscalYear: any;
  fiscalYearText: any;
  asPlanNumber: any;
  asPlanSuccess: any;
  outsidePlanNumber: any;
  outsidePlanSuccess: any;

  exciseName: any;

  travelTo1AddList: any;
  travelTo2AddList: any;
  checkTypeList: any;

  travelToDescription: any;

  entrepreneurNoList: any;
  actionPlanList: any;

  btnModal: any;
  breadcrumb: BreadCrumb[];

  btnAddDisabled: boolean = false;
  constructor(
    private message: MessageBarService,
    private ajax: AjaxService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private travelService: TravelService
  ) {
    this.breadcrumb = [
      { label: "ตรวจปฏิบัติการ", route: "#" },
      { label: "แผนการตรวจปฏิบัติการประจำปี", route: "#" },
      { label: "รายละเอียดแผนปฏิบัติการ", route: "#" }

    ];

    this.fileUpload = new Array<File>(); // initial file array
  }


  ngOnInit() {
    this.authService.reRenderVersionProgram('COP-07101');

    this.id = this.route.snapshot.queryParams["id"];
    this.fiscalYear = this.route.snapshot.queryParams["fiscalYear"];
    this.fiscalYearText = TextDateTH.months[parseInt(this.fiscalYear.split("/")[0]) - 1] + " " + this.fiscalYear.split("/")[1];

    this.asPlanNumber = this.route.snapshot.queryParams["asPlanNumber"];
    this.asPlanSuccess = this.route.snapshot.queryParams["asPlanSuccess"];
    this.outsidePlanNumber = this.route.snapshot.queryParams["outsidePlanNumber"];
    this.outsidePlanSuccess = this.route.snapshot.queryParams["outsidePlanSuccess"];
    this.entrepreneurNoDropdown();
    this.actionPlanDropdown();
    this.getHead();
    this.dataTable();
    this.dataTable2();
    this.travelTo1AddDropdown();
    this.checkTypeDropdown();
    if (this.validateDate(this.fiscalYear)) {
      this.btnAddDisabled = true;
    }
  }

  ngOnDestroy() {
    $('#modalAddDocument').remove();



  }

  travelTo1AddDropdown = () => {
    const URL = "combobox/controller/getDropByTypeAndParentId";
    this.ajax.post(URL, { type: "SECTOR_VALUE" }, res => {
      this.travelTo1AddList = res.json();
    });
  }

  travelTo2AddDropdown = e => {
    var id = e.target.value;
    if (id != "") {
      const URL = "combobox/controller/getDropByTypeAndParentId";
      this.ajax.post(URL, { type: "SECTOR_VALUE", lovIdMaster: id }, res => {
        this.travelTo2AddList = res.json();
        this.setTravelToAdd(e);
      });
    }
  }

  checkTypeDropdown = () => {
    const URL = "combobox/controller/getDropByTypeAndParentId";
    this.ajax.post(URL, { type: "CHECK_OPERATION", lovIdMaster: 2214 }, res => {
      this.checkTypeList = res.json();
    });
  }

  changeExciseId = (e) => {
    let exciseId = e.target.value;
    let url = "cop/cop064/findByExciseId";
    this.ajax.post(url, JSON.stringify(exciseId), res => {
      let data = res.json()
      console.log("exciseName : ", data.exciseName);
      this.exciseName = data.exciseName;
    })
  }


  setTravelToAdd = e => {
    $('#travelToAdd').val(e.target.value);
    $('#travelToIdAdd').val(e.target.value);

    if ($("#travelTo2Add").val() != "") {
      this.travelToDescription = $('#travelTo1Add option:selected').text() + " " + $('#travelTo2Add option:selected').text();
    } else if ($("#travelTo1Add").val() != "") {
      this.travelToDescription = $('#travelTo1Add option:selected').text();
    }
    console.log("TravelToDescription : ", this.travelToDescription);
  }

  calenda = function () {
    let promise = new Promise((resolve, reject) => {
      $("#modalDate1").calendar('clear');
      setTimeout(() => resolve(true), 200);
    });
    promise.then(resolve => {
      if (resolve) {

        let maxDate = new Date((parseInt(this.fiscalYear.split("/")[1]) - 543) + "-" + (parseInt(this.fiscalYear.split("/")[0])));
        maxDate.setMonth(maxDate.getMonth() + 1);
        maxDate.setDate(maxDate.getDate() - 1);

        let minDate = new Date((parseInt(this.fiscalYear.split("/")[1]) - 543) + "-" + (parseInt(this.fiscalYear.split("/")[0])));

        console.log("maxDate : ", maxDate + " minDate : " + minDate);

        $("#modalDate1").calendar({
          type: "date",
          maxDate: maxDate,
          minDate: minDate,
          text: TextDateTH,
          formatter: formatter()
        });
      }
    });
  }

  entrepreneurNoDropdown = () => {

    const URL = "combobox/controller/getExciseId";
    this.ajax.post(URL, {}, res => {
      this.entrepreneurNoList = res.json();
      // console.log("this.entrepreneurNoList : ",this.entrepreneurNoList);
    });
  }

  actionPlanDropdown = () => {

    const URL = "combobox/controller/getDropByTypeAndParentId";
    this.ajax.post(URL, { type: "CHECK_OPERATION", lovIdMaster: 1870 }, res => {
      this.actionPlanList = res.json();
    });
  }

  modalAdd() {
    this.btnModal = 'S';
    $('#modalAdd').modal({
      onShow: () => {
        this.calenda();
        $(".ui.dropdown").dropdown();
        $(".ui.dropdown.ai").css("width", "100%");
      }
    }).modal('show');

  }

  modalEdit = (data) => {
    console.log("data edit : ", data);

    this.btnModal = 'E';
    $('#modalAdd').modal({
      onShow: () => {
        this.calenda();
        $(".ui.dropdown").dropdown();
        $(".ui.dropdown.ai").css("width", "100%");
        $("#id").val(data.id);
        $("#entrepreneurNo").dropdown('set selected', data.entrepreneurNo);
        $("#checkDate").val(data.checkDate);
        $("#actionPlan").dropdown('set selected', data.actionPlan);
        $("#checkType").dropdown('set selected', data.checkType);
      },
      autofocus: false
    }).modal('show');

  }

  saveData() {
    if ($("#actionPlan").val() == '1871' && $('#tableData').DataTable().column(0).data().length >= this.asPlanNumber) {
      this.message.alert("ไม่สามารถเพิ่มจำนวน ตามแผนปฏิบัติการ   เกิน " + this.asPlanNumber + " ราย");
      return false;
    }

    if ($("#actionPlan").val() == '1872' && $('#tableData2').DataTable().column(0).data().length >= this.outsidePlanNumber) {
      this.message.alert("ไม่สามารถเพิ่มจำนวน นอกแผนปฏิบัติการ   เกิน " + this.outsidePlanNumber + " ราย");
      return false;
    }

    console.log("Save");
    $('modalAdd').modal('hide');
    const URL = "cop/cop0711/save";
    this.ajax.post(URL, {
      cop0711Vo: {
        idMaster: this.id,
        fiscalyear: this.fiscalYear,
        entrepreneurNo: $("#entrepreneurNo").val(),
        checkDate: $("#checkDate").val(),
        actionPlan: $("#actionPlan").val(),
        checkType: $("#checkType").val()
      }
    }, res => {
      const commonMessage = res.json();

      if (commonMessage.msg.messageType == "C") {
        this.message.successModal(commonMessage.msg.messageTh);
        console.log("commonMessage.data : ", commonMessage.data);
      } else {
        this.message.errorModal(commonMessage.msg.messageTh);
      }
      $("#searchFlag").val("TRUE");
      $('#tableData').DataTable().ajax.reload();
      $('#tableData2').DataTable().ajax.reload();
    });
  }

  editData() {
    console.log("Edit");
    $('modalAdd').modal('hide');
    const URL = "cop/cop0711/edit";
    this.ajax.post(URL, {
      cop0711Vo: {
        id: $("#id").val(),
        entrepreneurNo: $("#entrepreneurNo").val(),
        checkDate: $("#checkDate").val(),
        actionPlan: $("#actionPlan").val(),
        checkType: $("#checkType").val()
      }
    }, res => {
      const commonMessage = res.json();

      if (commonMessage.msg.messageType == "C") {
        this.message.successModal(commonMessage.msg.messageTh);
        console.log("commonMessage.data : ", commonMessage.data);
      } else {
        this.message.errorModal(commonMessage.msg.messageTh);
      }
      $("#searchFlag").val("TRUE");
      $('#tableData').DataTable().ajax.reload();
      $('#tableData2').DataTable().ajax.reload();
    });
  }

  dataTable = () => {
    if ($('#tableData').DataTable() != null) { $('#tableData').DataTable().destroy(); };
    var table = $('#tableData').DataTableTh({
      "lengthChange": true,
      "serverSide": false,
      "searching": false,
      "ordering": false,
      "processing": true,
      "scrollX": true,
      "ajax": {
        "url": '/ims-webapp/api/cop/cop0711/list',
        "contentType": "application/json",
        "type": "POST",
        "data": (d) => {
          return JSON.stringify($.extend({}, d, {
            "searchFlag": "TRUE",
            "id": this.id
          }));
        },
      },
      "columns": [
        {
          "data": "id",
          "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        }, {
          "data": "entrepreneurNo", "className": "ui center aligned"
        }, {
          "data": "entrepreneurName"
        }, {
          "data": "entrepreneurLoca"
        }, {
          "data": "checkDate", "className": "ui center aligned"
        }, {
          "data": "actionPlan", "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            let s = '';
            if (data == '1871') {
              s = 'ตามแผนปฏิบัติการ';
            } else {
              s = 'นอกแผนปฏิบัติการ';
            }
            return s;
          }
        }, {
          "data": "checkType", "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            let s = '';
            if (data == '2215') {
              s = 'ตรวจโซเว็นท์';
            } else {
              s = 'ตรวจโรงอุตสาหกรรม';
            }
            return s;
          }
        }, {
          "data": "status", "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            let s = '';
            if (data == '1874') {
              s = 'เสร็จสิ้น';
            } else {
              s = 'รอการดำเนินการ';
            }
            return s;
          }
        }, {
          "data": "id",
          "className": "ui center aligned",
          "render": (data, type, row) => {
            var btn = '';
            if (this.validateDate(this.fiscalYear)) {
              // btn += '<button class="mini ui yellow button btn-edit" type="button" disabled><i class="edit icon"></i>แก้ไข</button>';
              // btn += '<button class="mini ui red button btn-delete" type="button" disabled><i class="trash alternate icon"></i>ลบ</button>';
            } else {
              btn += '<button class="mini ui yellow button btn-edit" type="button" ><i class="edit icon"></i>แก้ไข</button>';
              btn += '<button class="mini ui red button btn-delete" type="button" ><i class="trash alternate icon"></i>ลบ</button>';
            }

            return btn;
          }
        }
      ]
    });
    //button edit>
    table.on('click', 'tbody tr button.btn-edit', (e) => {
      var closestRow = $(e.target).closest('tr');
      var data = table.row(closestRow).data();
      this.modalEdit(data);
    });
    //button delete>
    table.on('click', 'tbody tr button.btn-delete', (e) => {
      var closestRow = $(e.target).closest('tr');
      var data = table.row(closestRow).data();

      const URL = "cop/cop0711/delete";
      this.message.comfirm((res) => {
        if (res) {

          this.ajax.post(URL, { id: data.id }, res => {
            const msg = res.json();
            if (msg.messageType == "C") {
              this.message.successModal(msg.messageTh);
            } else {
              this.message.errorModal(msg.messageTh);
            }
            $("#searchFlag").val("TRUE");
            $('#tableData').DataTable().ajax.reload();
          });
        }
      }, "ลบรายการ");

    });
  }

  dataTable2 = function () {
    if ($('#tableData2').DataTable() != null) { $('#tableData2').DataTable().destroy(); };
    var table2 = $('#tableData2').DataTableTh({
      "lengthChange": true,
      "serverSide": false,
      "searching": false,
      "ordering": false,
      "processing": true,
      "scrollX": true,
      "ajax": {
        "url": '/ims-webapp/api/cop/cop0711/list2',
        "contentType": "application/json",
        "type": "POST",
        "data": (d) => {
          return JSON.stringify($.extend({}, d, {
            "searchFlag": "TRUE",
            "id": this.id
          }));
        },
      },
      "columns": [
        {
          "data": "id",
          "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        }, {
          "data": "entrepreneurNo", "className": "ui center aligned"
        }, {
          "data": "entrepreneurName"
        }, {
          "data": "entrepreneurLoca"
        }, {
          "data": "checkDate", "className": "ui center aligned"
        }, {
          "data": "actionPlan", "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            let s = '';
            if (data == '1871') {
              s = 'ตามแผนปฏิบัติการ';
            } else {
              s = 'นอกแผนปฏิบัติการ';
            }
            return s;
          }
        }, {
          "data": "checkType", "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            let s = '';
            if (data == '2215') {
              s = 'ตรวจโซเว็นท์';
            } else {
              s = 'ตรวจโรงอุตสาหกรรม';
            }
            return s;
          }
        }, {
          "data": "status", "className": "ui center aligned",
          "render": (data, type, row, meta) => {
            let s = '';
            if (data == '1874') {
              s = 'เสร็จสิ้น';
            } else {
              s = 'รอการดำเนินการ';
            }
            return s;
          }
        }, {
          "data": "id",
          "className": "ui center aligned",
          "render": (data, type, row) => {
            var btn = '';
            if (this.validateDate(this.fiscalYear)) {
              // btn += '<button class="mini ui yellow button btn-edit" type="button" disabled><i class="edit icon"></i>แก้ไข</button>';
              // btn += '<button class="mini ui red button btn-delete" type="button" disabled><i class="trash alternate icon"></i>ลบ</button>';
            } else {
              btn += '<button class="mini ui yellow button btn-edit" type="button" ><i class="edit icon"></i>แก้ไข</button>';
              btn += '<button class="mini ui red button btn-delete" type="button" ><i class="trash alternate icon"></i>ลบ</button>';
            }
            return btn;
          }
        }
      ]
    });
    //button edit>
    table2.on('click', 'tbody tr button.btn-edit', (e) => {
      var closestRow = $(e.target).closest('tr');
      var data = table2.row(closestRow).data();
      this.modalEdit(data);
    });
    //button delete>
    table2.on('click', 'tbody tr button.btn-delete', (e) => {
      var closestRow = $(e.target).closest('tr');
      var data = table2.row(closestRow).data();

      const URL = "cop/cop0711/delete";
      this.message.comfirm((res) => {
        if (res) {

          this.ajax.post(URL, { id: data.id }, res => {
            const msg = res.json();
            if (msg.messageType == "C") {
              this.message.successModal(msg.messageTh);
            } else {
              this.message.errorModal(msg.messageTh);
            }
            $("#searchFlag").val("TRUE");
            $('#tableData2').DataTable().ajax.reload();
          });
        }
      }, "ลบรายการ");

    });

  }

  validateDate = (req) => {
    var str = req.split("/");
    str = str[1] + str[0];
    var date = new Date();
    var datenow = date.toLocaleDateString()
    var datenowstr = datenow.split("/");
    var result = datenowstr[2] + datenowstr[1];

    var res = false;

    if (result > str) {
      res = true;
    }
    return res;
  }

  modalAddDocument() {
    $('#modalAddDocument').modal('show');
  }

  clickBack() {
    this.router.navigate(['/cop07/1'], {
      queryParams: {
        fiscalYear: this.fiscalYear.split("/")[1]
      }
    });
  }

  getHead = () => {


  }

}