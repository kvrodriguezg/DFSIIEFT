import { Component, OnInit } from '@angular/core';
import { ChefsService } from '../services/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  chefs: any[] = [];

  constructor(private chefsService: ChefsService) {}

  ngOnInit(): void {
    this.chefsService.getChefs().subscribe(data => {
      this.chefs = data;
    });
  }
}