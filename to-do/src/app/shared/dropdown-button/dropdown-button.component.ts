import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';

export interface DropDownItem {
  value?: string;
  icon?: string;
  value$?: Observable<string>;
  callback: (event: MouseEvent) => void;
  disabled$?: Observable<boolean>;
}

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownButtonComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef<HTMLElement>;

  @Input() items: DropDownItem[] = [];

  @Input() classNames: string[] = [];

  showDropdown: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.items);

    this.items[0]?.disabled$?.subscribe((x) => console.log('disabled', x));
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
