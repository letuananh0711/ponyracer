import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent {
  @Input() ponyModel!: PonyModel;

  // get pony's image url
  getPonyImageUrl(): string {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
  }

  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();
  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }
}
