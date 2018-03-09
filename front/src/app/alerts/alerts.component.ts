import { Component, OnInit } from '@angular/core';
import { AlertsService } from './alerts.service';
import { Alert } from './alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private alertService: AlertsService) {
    this.alertService = alertService;
  }

  ngOnInit() {
  }

  getAlerts() : Alert[] {
    return this.alertService.alerts;
  }

 }
