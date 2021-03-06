import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { BreadCrumb } from 'models/index';
import { DialogService } from 'services/index';
import { QuestionaireMinor, Int023Vo, QtnReportDetail, Int023Service } from './int02-3.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

declare var $: any;

const RISK_TYPE: string = "QTN_MAIN";
const PAGE: string = "int02-3";

@Component({
  selector: "app-int02-3",
  templateUrl: "./int02-3.component.html",
  styleUrls: ["./int02-3.component.css"]
})
export class Int023Component implements OnInit {

  // BreadCrumb
  breadcrumb: BreadCrumb[];

  // Initial Variable
  headerId: string = "";
  headerCode: string = "";
  origins: Int023Vo<QuestionaireMinor>[] = [];
  newers: Int023Vo<QtnReportDetail>[] = [];

  // Forms
  formAddDetail: FormGroup = new FormGroup({});
  formDetails: FormArray = new FormArray([]);

  // State
  loading = {
    tableOrigins: true,
    tableNewers: true,
  }

  constructor(
    private route: ActivatedRoute,
    private dialog: DialogService,
    private _location: Location,
    private service: Int023Service,
    private formBuilder: FormBuilder
  ) {
    // BreadCrumb Data
    this.breadcrumb = [
      { label: "ตรวจสอบภายใน", route: "#" },
      { label: "แบบสอบถามระบบการควบคุมภายใน", route: "#" },
      { label: "สร้างแบบสอบถามระบบการควบคุมภายใน", route: "#" },
      { label: "เพิ่ม/แก้ไข ด้านแบบสอบถาม", route: "#" },
      { label: "เพิ่ม/แก้ไข รายละเอียดแบบสอบถาม", route: "#" },
    ];

    // Form Array
    this.formAddDetail = this.formBuilder.group({
      formDetails: this.formBuilder.array([])
    })
    this.formDetails = this.formAddDetail.get('formDetails') as FormArray;
    this.formDetails.push(this.formBuilder.group({ mainDetail: [""] }));
    this.formDetails.push(this.formBuilder.group({ minorDetail: [""] }));
    this.formDetails.push(this.formBuilder.group({ minorDetail: [""] }));
    for(let key in this.formDetails.controls) {
      console.log(key, this.formDetails.get(key));
    }
  }

  ngOnInit() {
    // ID from url
    this.headerId = this.route.snapshot.queryParams["id"] || "";
    this.headerCode = this.route.snapshot.queryParams["code"] || "";

    // Load Data from service [backend]
    this.service.getOrigins(this.headerCode).then((data: Int023Vo<QuestionaireMinor>[]) => {
      this.origins = data;
      this.loading.tableOrigins = false; // stop `tableOrigins` loading
    });
    this.service.getNewers(this.headerId).then((data: Int023Vo<QtnReportDetail>[]) => {
      this.newers = data;
      this.loading.tableNewers = false; // stop `tableNewers` loading
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.unsave()) {
      let confirm: any = this.dialog.confirm("ต้องการออกจากที่นี่หรือไม่?");
      if (confirm.value) {
        console.log("ออกจาก int02/3 แล้ว...");
      }
      return confirm;
    }
    return true;
  }

  unsave() {
    return 0;
  }

  // Button Actions
  back() { this._location.back(); } // Turn back
  modal() { $('#add').modal('show'); } // Modal Open
  dismiss() { $('#add').modal('hide'); } // Modal Hide
}

class Condition {
  [x: string]: any;
  seq: any;
  operator: any;
  value1: any;
  value2: any;
  risk: any;
  score: any;
}


















/*
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { toFormData } from 'helpers/index';
import { BaseModel, ManageReq, BreadCrumb } from 'models/index';
import { AjaxService, DialogService, MessageBarService } from 'services/index';

declare var $: any;

const URL = {
  SAVE: "ia/int02/save_qtn_report_detail",
  DATATABLE: AjaxService.CONTEXT_PATH + "ia/int02/queryQuestionnaireDetailByCriteria",
  DATATABLE2: "ia/int02/qtn_report_detail_by_hdr_id/datatable",
  _DATATABLE: "ia/int02/questionnaire_detail/datatable"
  //DATATABLE2: AjaxService.CONTEXT_PATH + "ia/int02/qtn_report_detail_by_hdr_id/datatable"
};

@Component({
  selector: "app-int02-3",
  templateUrl: "./int02-3.component.html",
  styleUrls: ["./int02-3.component.css"]
})
export class Int023Component implements OnInit {
  RISK_TYPE: string = "QTN_MAIN";
  PAGE: string = "int02-3";
  @ViewChild("m") mform: NgForm;

  // Service Details
  minorDetail: string[] = [""];
  mainDetail: string = "";
  // API Datatable
  data: Datatable[] = [];
  // References Datatable
  datatable: any;
  option: any;
  option2: any;
  // ID from url
  headerId: number;
  // Condition
  cond: Condition[] = [];
  // Checkbox
  chk1: Int023FormVo[] = [];
  chk2: Int023FormVo[] = [];
  // Request
  req: ManageReq<Int023FormVo> = new ManageReq<Int023FormVo>();
  // Data
  table: Int023FormVo[] = [];
  _table: Int023FormVo[] = [];
  // Table
  dt1: any;
  dt2: any;
  // BreadCrumb
  breadcrumb: BreadCrumb[];
  // 
  toggleRL: boolean = false;
  rl: boolean = false;
  rlLen: number = 0;

  constructor(
    private ajax: AjaxService,
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessageBarService,
    private dialog: DialogService,
    private message: MessageBarService,
    private _location: Location
  ) {

    this.breadcrumb = [
      { label: "ตรวจสอบภายใน", route: "#" },
      { label: "แบบสอบถามระบบการควบคุมภายใน", route: "#" },
      { label: "สร้างแบบสอบถามระบบการควบคุมภายใน", route: "#" },
      { label: "เพิ่ม/แก้ไข ด้านแบบสอบถาม", route: "#" },
      { label: "เพิ่ม/แก้ไข รายละเอียดแบบสอบถาม", route: "#" },
    ];

    for (let i = 0; i < 3; i++) {
      this.cond.push(new Condition());
    }

    window.addEventListener("beforeunload", (e) => {
      const confirmationMessage = "\o/";
      if (this.unsave()) {
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
    });

    // Initial Table Request
    this.option = {
      draw: 1,
      start: 0,
      length: 10
    };
    this.option2 = {
      draw: 1,
      start: 0,
      length: 10
    };

  }

  ngOnInit() {
    // ID from url
    this.headerId = this.route.snapshot.queryParams["id"];
    this._initialTable();
    this.initialTable();
    var url = "ia/condition/findConditionByParentId";
    this.ajax.post(url, { parentId: this.headerId, riskType: this.RISK_TYPE, page: this.PAGE }, res => {
      var data = res.json();
      if (data != undefined && data.length > 0) {
        this.rlLen = data.length;
        this.rl = true;
      } else {
        this.rl = false;
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.unsave()) {
      let confirm: any = this.dialog.confirm("ต้องการออกจากที่นี่หรือไม่?");
      if (confirm.value) {
        console.log("Exited...");
      }
      return confirm;
    }
    return true;
  }

  unsave() {
    return this.req.save.length != 0 || this.req.delete.length != 0;
  }

  _initialTable(loadmore = false): void {
    if (!loadmore) {
      this._table = [];
    }
    this.ajax.post(`${URL._DATATABLE}`, toFormData(this.option), res => {
      let d = res.json().data;
      d.forEach(data => {
        let qtn = new Int023FormVo();
        qtn.qtnReportHdrId = "NOT NULL";
        qtn.qtnReportManId = `OLD_${data.qtnReportManId}`;
        qtn.qtnMainDetail = data.qtnMainDetail;
        if (this._table.findIndex(obj => obj.qtnReportHdrId == "NOT NULL" && obj.qtnReportManId == data.qtnReportManId) == -1) {
          this._table.push(qtn);
        }
        data.detail.forEach((obj, index) => {
          let _qtn = new Int023FormVo();
          _qtn.qtnReportManId = `OLD_${obj.mainId}`;
          _qtn.qtnReportDtlId = obj.qtnMinorId;
          _qtn.qtnMainDetail = obj.qtnMinorDetail;
          if (this._table.findIndex(o => o.qtnReportDtlId == obj.qtnMinorId) == -1) {
            $("#chk1").prop("checked", false);
            this._table.push(_qtn);
          }
        });
      });
    }, null, new Headers());
  }

  initialTable(loadmore = false): void {
    if (!loadmore) {
      this.table = [];
    }
    this.ajax.post(`${URL.DATATABLE2}/${this.headerId}`, toFormData(this.option2), res => {
      let d = res.json().data;
      d.forEach(data => {
        let qtn = new Int023FormVo();
        qtn.qtnReportHdrId = data.qtnReportHdrId;
        qtn.qtnReportManId = data.qtnReportManId;
        qtn.qtnMainDetail = data.qtnMainDetail;
        if (this.table.findIndex(obj => obj.qtnReportHdrId == data.qtnReportHdrId && obj.qtnReportManId == data.qtnReportManId) == -1) {
          this.table.push(qtn);
        }
        data.detail.forEach((obj, index) => {
          let qtn = new Int023FormVo();
          qtn.qtnReportManId = data.qtnReportManId;
          qtn.qtnReportDtlId = obj.qtnReportDtlId;
          qtn.qtnMainDetail = obj.qtnMainDetail;
          if (this.table.findIndex(o => o.qtnReportDtlId == obj.qtnReportDtlId) == -1) {
            $("#chk1").prop("checked", false);
            this.table.push(qtn);
          }
        });
      });
    }, null, new Headers());
  }

  chck = (id, what, e, i, table) => {
    e.preventDefault();
    console.log("Checked: ", what);
    switch (what) {
      case 'man':
        this[`chk${i}`] = this[`chk${i}`].filter(obj => obj.qtnReportManId != id);
        this[`${table}`].forEach((obj, index) => {
          if (obj.qtnReportManId == id) {
            if (e.target.checked) {
              this[`chk${i}`].push(obj);
              $(`#chk${i}-${index}`).prop('checked', true);
            } else {
              const del = this[`chk${i}`].findIndex(ob => ob.qtnReportManId == id);
              del != -1 && this[`chk${i}`].splice(del, 1);
              $(`#chk${i}-${index}`).prop('checked', false);
            }
          }
        })
        break;
      case 'dtl':
        this[`${table}`].forEach((obj, index) => {
          if (obj.qtnReportDtlId == id) {
            if (e.target.checked) {

              let o = this[`chk${i}`].filter(a => a.qtnReportManId == obj.qtnReportManId && a.qtnReportDtlId == null);
              if (o.length == 0 && i != 2) {
                let ind = this[`${table}`].findIndex(a => a.qtnReportManId == obj.qtnReportManId);
                this[`chk${i}`].push(this[`${table}`][ind]);
                $(`#chk${i}-${ind}`).prop('checked', true);
              }

              this[`chk${i}`].push(obj);
              $(`#chk${i}-${index}`).prop('checked', true);

            } else {

              const del = this[`chk${i}`].findIndex(ob => ob.qtnReportDtlId == id);
              del != -1 && this[`chk${i}`].splice(del, 1);
              $(`#chk${i}-${index}`).prop('checked', false);
              let o = this[`chk${i}`].filter(b => b.qtnReportManId == obj.qtnReportManId);
              if (o.length == 1 && i != 2) {
                const del = this[`chk${i}`].findIndex(ob => ob.qtnReportManId == obj.qtnReportManId);
                if (del != -1) {
                  this[`chk${i}`].splice(del, 1);
                  $(`#chk${i}-${del}`).prop('checked', false);
                }
              }

            }
          }
        })
        break;
    }
    this[`${table}`].length == this[`chk${i}`].length ? $(`#chk${i}`).prop('checked', true) : $(`#chk${i}`).prop('checked', false);
  }

  chkAll = (event, table, i) => {
    if (event.target.checked) {
      this[`chk${i}`] = this[`${table}`];
      if (this[`${table}`].length > 0) {
        this[`${table}`].map((obj, index) => {
          if ($(`#chk${i}-${index}`)[0]) {
            $(`#chk${i}-${index}`).prop('checked', true);
          }
        });
      }
    } else {
      this[`chk${i}`] = [];
      if (this[`${table}`].length > 0) {
        this[`${table}`].map((obj, index) => {
          if ($(`#chk${i}-${index}`)[0]) {
            $(`#chk${i}-${index}`).prop('checked', false);
          }
        });
      }
    }
  }

  delete = () => {
    this.msg.comfirm(boo => {
      if (boo) {
        this.chk2.forEach(obj => {
          if (obj.qtnReportHdrId) {
            obj.qtnFor = "M";
          } else {
            obj.qtnFor = "D";
          }
          if (obj.status === undefined) {
            this.req.delete.push(obj);
          }
          this.table = this.table.filter(ob => ob != obj);
          this.req.save = this.table;
        });
        this.chk2 = [];
        $("#chk2").prop('checked', false);
      }
    }, "ต้องการลบข้อมูลจริงหรือไม่?");
  }

  onScroll(e, option) {
    const { children, offsetHeight, scrollTop } = e.target;
    if (Math.round(scrollTop) + 1 >= Math.floor(children[0].offsetHeight - offsetHeight)) {
      this[`${option}`].start += 10;
      if (option === "option") {
        this._initialTable(true);
      } else {
        this.initialTable(true);
      }
    }
  }

  onAddField = () => {
    if (this.minorDetail.length < 5) {
      this.minorDetail.push("");
    } else {
      this.msg.errorModal(
        "ไม่สามารถทำรายการได้เกิน 5 ข้อ",
        "เกิดข้อผิดพลาด"
      );
    }
  };

  onDelField = index => {
    this.minorDetail.splice(index, 1);
  }

  onSave = () => {
    this.req.save.forEach(obj => {
      if (obj.status !== undefined) {
        if (obj.qtnFor === "M") {
          obj.qtnReportManId = null;
        } else {
          obj.qtnReportManId = null;
          obj.qtnReportDtlId = null;
        }
      }
    });
    this.ajax.post(URL.SAVE, this.req, res => {
      this.req = new ManageReq<Int023FormVo>();
      const msg = res.json();
      if (msg.messageType == "C") {
        this.message.successModal(msg.messageTh);
        this.initialTable();
      } else {
        this.message.errorModal(msg.messageTh);
      }
    });
  }

  onAdd2Save = (e) => {
    e.preventDefault();
    if (this.mainDetail) {
      let main: Int023FormVo = new Int023FormVo();
      let detail: Int023FormVo;
      let mainId = `MAN_${this.getRndInteger(10000, 99999)}`;
      main.qtnReportHdrId = this.headerId.toString();
      main.qtnReportManId = mainId;
      main.qtnMainDetail = this.mainDetail;
      main.qtnFor = "M";
      main.status = "NEW";
      this.mainDetail = "";
      this.table.push(main);
      this.req.save = this.table;
      for (let i = 0; i < this.minorDetail.length; i++) {
        detail = new Int023FormVo();
        detail.qtnReportDtlId = `DTL_${this.getRndInteger(10000, 99999)}`;
        detail.qtnMainDetail = $(`#minorDetail${i}`).val();
        detail.qtnReportManId = mainId;
        detail.qtnFor = "D";
        detail.status = "NEW";
        $(`#minorDetail${i}`).val("");
        this.table.push(detail);
        if (i == this.minorDetail.length - 1) {
          this.table.forEach(obj => {
            if (!obj.qtnReportHdrId) {
              obj.qtnFor = "D";
            } else {
              obj.qtnFor = "M";
            }
            this.req.save = this.table;
          });
          // this.onAdd2SaveList();
        }
      }
    } else {
      this.onAdd2SaveList();
    }
  }

  onAdd2SaveList = () => {
    this.mainDetail = "";
    this.minorDetail = [""];
    let mainId = "";
    for (let j = 0; j < this.chk1.length; j++) {
      if (this.chk1[j].qtnReportHdrId) {
        mainId = `MAN_${this.getRndInteger(10000, 99999)}`;
        this.chk1[j].qtnFor = "M";
        this.chk1[j].qtnReportHdrId = this.headerId.toString();
        this.chk1[j].qtnReportManId = mainId;
      } else {
        this.chk1[j].qtnFor = "D";
        this.chk1[j].qtnReportManId = mainId;
      }
      this.chk1[j].status = "NEW";
      this.table.push(this.chk1[j]);
      $(`#chk1-${j}`).prop('checked', false);
      if (j == this.chk1.length - 1) {
        this.table.forEach(obj => {
          if (!obj.qtnReportHdrId) {
            obj.qtnFor = "D";
          } else {
            obj.qtnFor = "M";
          }
          this.req.save = this.table;
        });
      }
    }
  }

  edit(id: any, str: string): void {
    this.mform.controls.msgType.setValue(str);
    switch (str) {
      case 'dtl':
        // TODO
        $("#int02-3").modal('show');
        this.table.forEach(each => {
          if (each.qtnReportDtlId == id) {
            this.mform.controls.msg.setValue(each.qtnMainDetail);
            this.mform.controls.msgId.setValue(each.qtnReportDtlId);
          }
        });
        break;
      case 'man':
        // TODO
        $("#int02-3").modal('show');
        this.table.forEach(each => {
          if (each.qtnReportManId == id && each.qtnReportDtlId == null) {
            this.mform.controls.msg.setValue(each.qtnMainDetail);
            this.mform.controls.msgId.setValue(each.qtnReportManId);
          }
        });
        break;
    }
  }

  saveMsg(m: NgForm) {
    if (m.submitted && m.valid) {
      const { msgType, msgId, msg } = m.controls;
      switch (msgType.value) {
        case 'dtl':
          this.table.forEach(each => {
            if (each.qtnReportDtlId == msgId.value) {
              each.qtnMainDetail = msg.value;
            }
          });
          $('#int02-3').modal('hide');
          break;
        case 'man':
          this.table.forEach(each => {
            if (each.qtnReportManId == msgId.value && each.qtnReportDtlId == null) {
              each.qtnMainDetail = msg.value;
            }
          });
          $('#int02-3').modal('hide');
          break;
      }
    }
  }

  exit(): void {
    $('#int02-3').modal('hide');
  }

  addCond() {
    this.cond.length < 5 && this.cond.push(new Condition());
  }

  delCond(index) {
    this.cond.splice(index, 1);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  setRL(e) {
    if (e == 0) {
      this.toggleRL = true;
    } else {
      this.toggleRL = false;
    }
  }

  chkRL(e) {
    var url = "ia/condition/findConditionByParentId";
    this.ajax.post(url, { parentId: this.headerId, riskType: this.RISK_TYPE, page: this.PAGE }, res => {
      var data = res.json();
      if (data != undefined && data.length > 0) {
        this.rlLen = data.length;
        this.rl = true;
      } else {
        this.rl = false;
      }
    });
  }

  onCancel() {
    this._location.back();
  }

}

class Datatable extends BaseModel {
  qtnMainDetail: any;
  qtnReportDtlId: any;
  qtnReportHdrId: any;
}

class Int023FormVo extends BaseModel {
  [x: string]: any;
  qtnReportHdrId: string = null;
  qtnReportManId: string = null;
  qtnReportDtlId: string = null;
  qtnMainDetail: string = "";
  qtnFor: string = "";
}

class Condition {
  [x: string]: any;
  seq: any;
  operator: any;
  value1: any;
  value2: any;
  risk: any;
  score: any;
}

*/