import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-int06-5-3',
  templateUrl: './int06-5-3.component.html',
  styleUrls: ['./int06-5-3.component.css']
})
export class Int0653Component implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.reRenderVersionProgram('INT-06530');
  }

}
