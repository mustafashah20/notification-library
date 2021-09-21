import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class TestLibService {
  notificationStatus: boolean = false;
  notificationStatusChanged = new Subject<boolean>();
  notificationsChanged = new Subject<Notification[]>();
  notificationPositionChanged = new Subject<string>();

  notifications: Notification[] = [];
  position: string = 'top-right';
  clearTimeout: number = 5000;

  constructor() {}

  showNotification = () => {
    this.notificationStatus = true;
    this.notificationStatusChanged.next(true);
  };

  hideNotification = () => {
    this.notificationStatus = false;
    this.notificationStatusChanged.next(false);
  };

  addNotification = (category: string, header: string, body: string) => {
    const ntObject = {
      id: Date.now().toString(),
      headerContent: header,
      bodyContent: body,
      category: category,
    };
    this.notifications.push(ntObject);
    this.notificationsChanged.next(this.notifications.slice());
    if (this.clearTimeout > 0) {
      setTimeout(() => {
        const index = this.notifications.findIndex(
          (item) => item.id === ntObject.id
        );
        this.clearNotification(index);
      }, this.clearTimeout);
    }
  };

  clearNotification = (index: number) => {
    this.notifications.splice(index, 1);
    this.notificationsChanged.next(this.notifications.slice());
  };

  clearAllNotifications = () => {
    this.notifications.splice(0, this.notifications.length);
    this.notificationsChanged.next(this.notifications.slice());
  };

  changePosition = (newPosition: string) => {
    this.position = newPosition;
    this.notificationPositionChanged.next(this.position);
  };

  changeTimeout = (newTimout: number) => {
    this.clearTimeout = newTimout;
  };
}
