import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private messageService: MessageService) { }

  public displayError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Przepraszamy, coś poszło nie tak'
  })
  }
}
