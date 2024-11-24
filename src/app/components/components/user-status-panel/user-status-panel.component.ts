import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";




@Component({
  selector: 'app-user-status-panel',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatIcon,
    MatCardContent,
    NgClass
  ],
  templateUrl: './user-status-panel.component.html',
  styleUrl: './user-status-panel.component.scss'
})
export class UserStatusPanelComponent {

  @Input() totalUsersOnline = 0;
  @Input() maxConcurrentUsers = 3;
  @Input() availableSlots = 10;

}
