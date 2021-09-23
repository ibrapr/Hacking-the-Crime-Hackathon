import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-numbine-check-box',
  templateUrl: './numbine-check-box.component.html',
  styleUrls: ['./numbine-check-box.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumbineCheckBoxComponent),
    multi: true
  }]
})
export class NumbineCheckBoxComponent implements OnInit, ControlValueAccessor {

  // Bindable properties
  @Input()
  content: String;
  @Input()
  title: String;
  @Input()
  id: number;
  @Input()
  disabled = false;

  // Internal properties
  isChecked: boolean = false;
  onChange = (_ => { });
  onBlur = (_ => { });

  ngOnInit(): void {
  }

  writeValue(obj: boolean): void {
    this.isChecked = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChanged($event) {
    this.isChecked = $event && $event.target && $event.target.checked;
    this.onChange(this.isChecked);
  }

}
