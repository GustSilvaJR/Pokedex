import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchData:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  public catchSearchValue(value:string){
    this.searchData = value;
    console.log(`Captei: ${value}`);
  }

}
