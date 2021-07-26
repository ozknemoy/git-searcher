import {ChangeDetectionStrategy, Component, Input} from '@angular/core';


/**
 * @Component компонент красивого отображения булево значений
 */
@Component({
  selector: 'boolean',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i class="material-icons" *ngIf="model;else noModel">check_box</i>
    <ng-template #noModel>
      <i class="material-icons">check_box_outline_blank</i>
    </ng-template>
  `
})
export class BooleanComponent {
  /** значение */
  @Input() model = false;
}
