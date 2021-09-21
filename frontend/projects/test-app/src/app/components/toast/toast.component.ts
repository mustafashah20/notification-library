import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestLibService } from 'xg-notification-lib';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interfaces/notification';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  notificationCategory: string = 'info';
  headerContent: string = '';
  bodyContent: string = '';
  userId: string = '';

  constructor(
    private ntLibService: TestLibService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user-id');
    if (userId) {
      this.userId = userId;
    } else {
      this.router.navigate(['/']);
    }
  }

  clearAll = () => {
    this.ntLibService.clearAllNotifications();
  };

  addNotification = () => {
    if (this.headerContent === '' || this.bodyContent === '') {
      alert('Input header & body content for notification!');
      return;
    }
    this.ntLibService.addNotification(
      this.notificationCategory,
      this.headerContent,
      this.bodyContent
    );

    this.saveNotification();
  };

  saveNotification = () => {
    const notification: Notification = {
      userId: this.userId,
      headerContent: this.headerContent,
      bodyContent: this.bodyContent,
      category: this.notificationCategory,
    };
    this.notificationService.addNotification(notification).subscribe(() => {
      this.notificationService.pushNotification(notification);
    });
  };

  changePosition = (e: any) => {
    this.ntLibService.changePosition(e.target.value);
  };

  changeCategory = (e: any) => {
    this.notificationCategory = e.target.value;
  };

  changeTimout = (e: any) => {
    this.ntLibService.changeTimeout(e.target.value);
  };
}
