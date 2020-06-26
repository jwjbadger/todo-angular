import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent implements OnInit {
  @Input() x = 0;
  @Input() y = 0;
  @Input() complete = false;

  @Output() left = new EventEmitter<string>();

  constructor() {}

  hideMenu() {
    this.left.emit('left');
  }

  ngOnInit() {}
}
