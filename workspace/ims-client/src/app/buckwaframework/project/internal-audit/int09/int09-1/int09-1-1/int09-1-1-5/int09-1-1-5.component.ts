import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  TravelCostHeader,
  TravelCostDetail,
  Contract
} from "../../../../../../common/models";
import { AjaxService, MessageBarService, AuthService } from "../../../../../../common/services";
import { Prices } from "../../../../../../common/helper/travel";
import { Router, ActivatedRoute } from "@angular/router";
import {
  digit,
  numberWithCommas,
  TextDateTH,
  formatter,
  DecimalFormat
} from "../../../../../../common/helper";
import { TravelService } from "../../../../../../common/services/travel.service";
import { BreadCrumb } from 'models/index';

declare var $: any;
@Component({
  selector: "app-int09-1-1-5",
  templateUrl: "./int09-1-1-5.component.html",
  styleUrls: ["./int09-1-1-5.component.css"]
})
export class Int09115Component implements OnInit, AfterViewInit {

  idProcess:any;
  breadcrumb: BreadCrumb[]
  constructor(
    private authService: AuthService,
    private ajax: AjaxService,
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessageBarService,
    private travelService: TravelService
  ) {
    this.breadcrumb = [
      { label: "ตรวจสอบภายใน", route: "#" },
      { label: "ประมาณการค่าใช้จ่ายในการเดินทางไปราชการ", route: "#" },
      { label: "รายละเอียดเอกสาร", route: "#" },
      { label: "สร้างเอกสารบันทึกข้อความ", route: "#" }
      ]

  }
  calenda = function () {
    $("#date1").calendar({
      maxDate: new Date(),
      type: "month",
      text: TextDateTH,
      formatter: formatter("ด/ป")
    });
  }

  clickBack(){
    this.router.navigate(['/int09/1/1'], {
      queryParams: {idProcess:this.idProcess}
    });
  }
  save(){	

    $('#modalAddHead').modal('hide');
    const URL = "ia/int09115/save";
    this.ajax.post(URL, { 
      idProcess:this.idProcess
    }, res => {
      const msg = res.json();
      
    if (msg.messageType == "C") {
      this.msg.successModal(msg.messageTh);
      this.clickBack();
    } else {
      this.msg.errorModal(msg.messageTh);
    }
    });
  }

  ngOnInit() {
    this.authService.reRenderVersionProgram('INT-09115');
    this.idProcess = this.route.snapshot.queryParams["idProcess"];
    console.log("idProcess : ",this.idProcess);
    this.calenda();
  }
  

  ngAfterViewInit() {

  }

 
  
}
