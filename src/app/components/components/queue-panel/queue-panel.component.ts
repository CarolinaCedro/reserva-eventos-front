import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatLine} from "@angular/material/core";

@Component({
  selector: 'app-queue-panel',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    NgForOf,
    NgClass,
    MatLine,
    NgIf
  ],
  templateUrl: './queue-panel.component.html',
  styleUrl: './queue-panel.component.scss'
})
export class QueuePanelComponent {

  @Input() queue = [
    { name: 'Usuário 1', timer: 30 },
    { name: 'Usuário 2', timer: 20 },
    { name: 'Usuário 3', timer: 10 },
  ];
  @Input() maxConcurrentUsers = 3;

}
