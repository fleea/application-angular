import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() items: Array<string> = [];
  @Input() selectedItem = '';
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  onSelectChange = event => this.change.emit(event);
}
