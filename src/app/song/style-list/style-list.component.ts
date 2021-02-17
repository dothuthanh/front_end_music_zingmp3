import { Component, OnInit } from '@angular/core';
import {Style} from '../../interface/Style';
import {StyleService} from '../../service/style.service';

@Component({
  selector: 'app-style-list',
  templateUrl: './style-list.component.html',
  styleUrls: ['./style-list.component.css']
})
export class StyleListComponent implements OnInit {

  styles: Style[];

  constructor(private styleService: StyleService) { }

  ngOnInit(): void{
    this.styleService.findAll().subscribe( result => {
      this.styles = result;
    });
  }

}
