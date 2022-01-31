import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  @Input() 'numbers': any;
  @Output() newPageEvent = new EventEmitter<any>();

  numberPages: number = 0;
  paginationValues: any = [];

  constructor() {
    this.numbers = {};
  }

  ngOnInit(): void {
    this.numberPages = this.numbers.numItems / this.numbers.perPage;
    for (let i = 0; i < Math.ceil(this.numberPages); i++) {
      this.paginationValues.push({ i: i, perPage: this.numbers.perPage });
    }
  }

  onSelect(item: any) {
    this.newPageEvent.emit(item);
  }
}
