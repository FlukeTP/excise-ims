import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { BreadCrumb } from 'models/breadcrumb';

@Component({
  selector: 'app-cop02-1-2',
  templateUrl: './cop02-1-2.component.html',
  styleUrls: ['./cop02-1-2.component.css']
})
export class Cop0212Component implements OnInit {

  breadcrumb: BreadCrumb[];
  constructor(private authService: AuthService) { 

    this.breadcrumb = [
      { label: "รวบรวมข้อมูลเพื่อเตรียมออกตรวจปฏิบัติการ", route: "#" },
      { label: "ข้อมูลวิเคราะห์รายได้ ตามแผนการตรวจสอบภาษี", route: "#" },
      { label: "เพิ่มข้อมูลภายนอก", route: "#" },
    ];

  }

  ngOnInit() {
    this.authService.reRenderVersionProgram('OPE-02120');
  }

}
