import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private data: DataService) { }
  message:number=0;
  subscription: Subscription = new Subscription;
  ngOnInit(){
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  }

}
