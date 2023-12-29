import { Component } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
