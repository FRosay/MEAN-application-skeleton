import { Injectable } from '@angular/core';
import { Alert, Level } from './alert';


@Injectable()
export class AlertsService {

  alerts: Alert[];

  constructor() {
    this.alerts = [];
  }

  private showAlert(message: String, level: Level) {
    const alert = this.alerts.find((alert) => alert.message === message);
    if (alert) {
      alert.incCardinality();
      alert.setTimeOut(() =>
        this.alerts = this.alerts.filter((other_alert) => alert.message !== other_alert.message)
        , 3000);
    } else {
      const newAlert = new Alert(message, level);
      this.alerts.push(newAlert);
      newAlert.setTimeOut(() =>
        this.alerts = this.alerts.filter((other_alert) => newAlert.message !== other_alert.message)
        , 3000);
    }
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
