import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent {
  selected = '';
  @Input() active = '';
  @Input() names = [];
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  onInputChange = event => this.inputChange.emit(event.target.value);
  typeaheadOnSelect = (event: TypeaheadMatch) => this.inputChange.emit(event.value);
}
