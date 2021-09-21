import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interfaces/notification';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  faEdit = faEdit;
  notifications: Notification[] = [];
  showList: boolean = false;
  subscription: Subscription = new Subscription;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user-id');
    if (userId) {
      this.notificationService
        .getNotifications(userId)
        .subscribe((notifications) => {
          if (notifications.length > 0) {
            this.showList = true;
            this.notifications = notifications;
          } else {
            this.showList = false;
          }
        });
    } else {
      this.router.navigate(['/']);
    }

    this.subscription = this.notificationService.notificationsChanged.subscribe((notifiction) => {
      this.notifications.push(notifiction);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
