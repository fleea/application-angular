import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent {
  @Input() active = '';
  @Output() keyup: EventEmitter<string> = new EventEmitter<string>();
  onInputKeyup = event => this.keyup.emit(event);
}
