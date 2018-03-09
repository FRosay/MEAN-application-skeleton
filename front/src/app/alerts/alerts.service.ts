import { Injectable } from '@angular/core';
import { Alert, Level } from './alert';


@Injectable()
export class AlertsService {

  alerts: Alert[];

  constructor() { 
    this.alerts = [];
  }

  private showAlert(message: String, level: Level) {
    const newAlert = new Alert(message, level);
    this.alerts.push(newAlert);
    setTimeout(() => {
      this.alerts = this.alerts.filter((alert) => {
        alert.id !== newAlert.id;
      })
    }, 3000);
  }

  showInfoAlert(message: String) {
    this.showAlert(message, Level.info);
  }

  showWarningAlert(message: String) {
    this.showAlert(message, Level.warning);
  }

  showErrorAlert(message: String) {
    this.showAlert(message, Level.error);
  }

  showSuccessAlert(message: String) {
    this.showAlert(message, Level.success);
  }

}
