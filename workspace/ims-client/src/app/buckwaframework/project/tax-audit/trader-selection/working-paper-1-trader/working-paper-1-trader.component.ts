import { Component, OnInit } from "@angular/core";
import { AjaxService } from "../../../../common/services/ajax.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ExciseService } from "../../../../common/services/excise.service";
import { TextDateTH, digit } from "../../../../common/helper/datepicker";
import { CurrencyPipe } from "@angular/common";
import { BreadCrumb } from "models/breadcrumb";
import { AuthService } from "services/auth.service";

declare var jQuery: any;
declare var $: any;
@Component({
  selector: "app-working-paper-1-trader",
  templateUrl: "./working-paper-1-trader.component.html",
  styleUrls: ["./working-paper-1-trader.component.css"]
})
export class WorkingPaper1TraderComponent implements OnInit {
  breadcrumb: BreadCrumb[] = [
    { label: 'ตรวจสอบภาษี', route: '#' },
    { label: 'การคัดเลือกราย', route: '#' },
    { label: 'สร้างกระดาษทำการคัดเลือกราย', route: '#' },
  ]
  userManagementDt: any;
  before: any;
  last: any;
  num1: any;
  num2: any;
  _num1: any;
  _num2: any;
  percent1: any;
  percent2: any;
  _percent1: any;
  _percent2: any;
  month: any;
  from: any;
  analysNumber: any;
  exciseProductType: any;
  indexFilter: any;
  coordinates: any;
  coordinatesArr: any;
  flag: any;
  toggle: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ex: ExciseService,
    private ajax: AjaxService,
    private authService: AuthService
  ) {
    this._num1 = new Array();
    this._num2 = new Array();
    this._percent1 = new Array();
    this._percent2 = new Array();
  }

  ngOnInit() {
    this.authService.reRenderVersionProgram('TAX-08000');
    $(".ui.dropdown").dropdown();
    $(".ui.dropdown.ai").css("width", "100%");
    //get coordinates in select option
    const URL = "combobox/controller/getCoordinates";
    this.ajax.post(URL, {}, res => {
      this.coordinatesArr = res.json();
    });

    //call ExciseService
    var {
      before,
      last,
      from,
      month,
      currYear,
      prevYear
    } = this.ex.getformValues();
    var {
      num1,
      num2,
      percent1,
      percent2,
      analysNumber
    } = this.ex.getformNumber();
    this.indexFilter = "";
    this.flag = "";
    //set values
    this.before = before;
    this.last = last;
    this.from = from;
    this.month = month;
    this.num1 = num1;
    this.num2 = num2;
    this.percent1 = percent1;
    this.percent2 = percent2;
    this.analysNumber = analysNumber;

    for (var i = 0; i < this.num1.length; i++) {
      if (this.num2[i] !== 0) {
        this._num1.push(this.num1[i]);
        this._num2.push(this.num2[i]);
        this._percent1.push(this.percent1[i] + 0.0);
        this._percent2.push(this.percent2[i]);
      }
    }

    //split function
    var from_split = this.from.split("/");

    //default month & year
    var month = from_split[0];
    var year_before = from_split[1];

    var m = parseInt(month) + 1;
    var mm = parseInt(this.month);
    var yy = parseInt(year_before);

    var items: string[] = [];
    for (var i = 1; i <= mm; i++) {
      m = m - 1;
      if (m == 0) {
        m = 12;
        yy = yy - 1;
      }
      items.push(
        '<th style="text-align: center !important">' +
        TextDateTH.monthsShort[m - 1] +
        " " +
        (yy + "").substr(2) +
        "</th>"
      );
    }

    var trHeaderColumn = "";
    //for (var i = items.length - 1; i >= 0; i--) {
    //  trHeaderColumn += items[i];
    //}
    document.getElementById("trDrinamic").innerHTML =

      '<th rowspan="2" style="text-align: center !important">ทะเบียนสรรพสามิต เดิม/ใหม่</th> ' +
      '<th rowspan="2" style="text-align: center !important">ชื่อผู้ประกอบการ</th> ' +
      '<th rowspan="2" style="text-align: center !important">ชื่อโรงอุตสาหกรรม/สถานบริการ</th> ' +
      '<th rowspan="2" style="text-align: center !important">ภาค</th> ' +
      '<th rowspan="2" style="text-align: center !important">พื้นที่</th> ' +
      '<th colspan="2" style="text-align: center !important">การชำระภาษีในสภาวะปกติ (บาท)</th> ' +
      '<th rowspan="2" style="text-align: center !important">เปลี่ยนแปลง (ร้อยละ)</th> ' +
      '<th rowspan="2" style="text-align: center !important">เปอร์เซ็นส่วนเบี่ยงเบน</th> ' +
      '<th rowspan="2" style="text-align: center !important">ชำระภาษี(เดือน)</th> ' +
      '<th colspan="3" style="text-align: center !important">การตรวจสอบภาษีย้อนหลัง 3 ปีงบประมาณ</th> ' +
      '<th rowspan="2" style="text-align: center !important">พิกัด</th> ' +
      '<th rowspan="2" style="text-align: center !important">ที่อยู่โรงอุตสาหกรรม/สถานบริการ</th> ' +
      '<th rowspan="2" style="text-align: center !important" >เลขทะเบียนสรรพสามิตเก่า</th> ' +
      '<th rowspan="2" style="text-align: center !important">สถานะล่าสุด</th> ' +
      '<th rowspan="2" style="text-align: center !important">สถานะ/วันที่</th> ' +
      '<th rowspan="2" style="text-align: center !important">พิกัดอื่นๆ</th> ' +
      "</tr>" +
      '<tr><th style="border-left: 1px solid rgba(34,36,38,.1);">' +
      this.month / 2 +
      " เดือนแรก</th>" +
      '<th style="text-align: center !important">' +
      this.month / 2 +
      " เดือนหลัง </th>" +
      '<th style="text-align: center !important">' +
      (currYear - 3) +
      "</th>" +
      '<th style="text-align: center !important">' +
      (currYear - 2) +
      "</th>" +
      '<th style="text-align: center !important">' +
      (currYear - 1) +
      "</th>" +
      trHeaderColumn +
      "</tr>";

    this.initDatatable();
  }

  ngAfterViewInit() { }

  searchAll = () => {
    $("#coordinates").dropdown('restore defaults');
  }
  toggleBar() {
    if (this.toggle) {
      this.toggle = false;
    } else {
      this.toggle = true;
    }
  }
  filterDataByCriteria(index) {
    this.indexFilter = index;
    if (this.userManagementDt != null) {
      this.userManagementDt.destroy();
    }
    this.initDatatable();
  }

  filterAllDataByCriteria() {
    this.indexFilter = "";
    if (this.userManagementDt != null) {
      this.userManagementDt.destroy();
    }
    this.initDatatable();
  }

  initDatatable(): void {

    var d = new Date();
    const URL = AjaxService.CONTEXT_PATH + "/filter/exise/list";
    var json = "";
    json += ' { "lengthChange": true, ';
    json += ' "searching": false, ';
    json += ' "select": true, ';
    json += ' "ordering": false, ';
    json += ' "pageLength": 10, ';
    json += ' "scrollX": true, ';
    json += ' "processing": true, ';
    json += ' "serverSide": true, ';
    json += ' "paging": true, ';
    json += ' "fixedColumns": { "leftColumns" : 2 }, ';
    json += ' "pagingType": "full_numbers", ';
    json += " ";
    json += ' "ajax": { ';
    json += ' "type": "POST", ';
    json += ' "url": "' + URL + '", ';
    json += ' "data": { ';
    json += ' "flag": "' + (this.flag == "" ? "N" : this.flag) + '", ';
    json += ' "indexFilter": "' + this.indexFilter + '", ';
    json += ' "num1": "' + this.num1 + '", ';
    json += ' "num2": "' + this.num2 + '", ';
    json += ' "percent1": "' + this.percent1 + '", ';
    json += ' "percent2": "' + this.percent2 + '", ';
    json += ' "analysNumber": "' + this.analysNumber + '", ';
    json +=
      ' "productType": "' +
      (this.coordinates == undefined ? "" : this.coordinates) +
      '" ';
    json += " } ";
    json += " }, ";
    json += ' "columns": [ ';
    json += ' { "data": "exciseId","className":"center" }, ';
    json += ' { "data": "companyName" }, ';
    json += ' { "data": "companyName" }, ';
    json += ' { "data": "exciseOwnerArea1" }, ';
    json += ' { "data": "exciseOwnerArea" }, ';
    json += ' { "data": "firstMonth" ,"className":"center" }, ';
    json += ' { "data": "lastMonth","className":"center" }, ';
    json += ' { "data": "percentage","className":"center" }, ';
    json += ' { "data": "deviation","className":"center" }, ';
    json += ' { "data": "totalMonth" ,"className":"center"}, ';
    json += ' { "data": "no1" }, ';
    json += ' { "data": "no2" }, ';
    json += ' { "data": "no3" }, ';
    json += ' { "data": "productType" }, '
    json += ' { "data": "factoryAddress" }, ';
    json += ' { "data": "registeredCapital" }, ';
    json += ' { "data": "exciseIdOld","className":"center"}, ';
    json += ' { "data": "status" }, ';
    json += ' { "data": "otherCoordinates" } ';

    json += "] } ";
    let jsonMaping = JSON.parse(json);
    this.userManagementDt = $("#userManagementDt").DataTableTh(jsonMaping);
  }

  updateFlg() {
    var router = this.router;
    const URL =
      AjaxService.CONTEXT_PATH + "/filter/exise/updateStatusPlanWsHeader";
    var param1 = "";
    var param2 = "";
    var param3 = "";
    var param4 = "";
    for (var i = 0; i < 10; i++) {
      param1 += this.num1[i];
      param2 += this.num2[i];
      param3 += this.percent1[i];
      param4 += this.percent2[i];
      if (i != 9) {
        param1 += ",";
        param2 += ",";
        param3 += ",";
        param4 += ",";
      }
    }
    $.post(
      URL,
      {
        num1: param1,
        num2: param2,
        percent1: param3,
        percent2: param4,
        analysNumber: this.analysNumber
      },
      function (returnedData) {
        router.navigate(["/add-external-data"]);
      }
    ).fail(function () {
      console.error("error");
    });
  }

  changeCoordinates = () => {
    this.coordinates = $("#coordinates").val();
    this.userManagementDt.destroy();
    this.initDatatable();
  };

  FlagN = () => {
    this.flag = "N";
    this.indexFilter = "N";
    if (this.userManagementDt != null) {
      this.userManagementDt.destroy();
    }
    this.initDatatable();
  };

  FlagNotN = () => {
    this.flag = "NOT N";
    if (this.userManagementDt != null) {
      this.userManagementDt.destroy();
    }
    this.initDatatable();
  };



}
