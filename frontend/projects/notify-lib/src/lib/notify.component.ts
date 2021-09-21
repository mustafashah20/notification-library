import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Notification } from './notification.model';
import { NotifyService } from './notify.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-notify',
  template: ` <div
    class="notification-panel"
    [ngClass]="{
      'top-right': position === 'top-right',
      'bottom-right': position === 'bottom-right',
      'top-left': position === 'top-left',
      'bottom-left': position === 'bottom-left'
    }"
  >
    <div
      class="notification"
      *ngFor="let notification of notifications; let id = index"
      [ngClass]="{
        'info': notification.category === 'info',
        'warning': notification.category === 'warning',
        'danger': notification.category === 'danger'
      }"
      [@flyState]
    >
      <div class="nt-header">
        <div class="header-content">
          {{ notification.headerContent }}
        </div>
        <div class="close-button">
          <button class="lib-btn" (click)="clearNotification(id)">
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </div>
      </div>
      <div class="nt-body">
        {{ notification.bodyContent }}
      </div>
    </div>
  </div>`,
  styles: [
    `
      :root {
        --danger-bg-color: #ffd3da;
        --danger-text-color: #9d0034;

        --info-bg-color: #ccdfff;
        --info-text-color: #1d259b;

        --warning-bg-color: #fff7cd;
        --warning-text-color: #6a5002;
      }

      .notification-panel {
        position: absolute;
        overflow-y: auto;
        max-height: 100vh;
      }

      ::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }

      .top-right {
        top: 0;
        right: 0;
      }

      .bottom-right {
        bottom: 0;
        right: 0;
      }

      .top-left {
        top: 0;
        left: 0;
      }

      .bottom-left {
        bottom: 0;
        left: 0;
      }

      .notification {
        margin: 12px;
        min-width: 324px;
        max-width: 324px;
        border-radius: 5px;
      }
      .info {
        background: var(--info-bg-color);
        color: var(--info-text-color);
        border: 2px solid var(--info-text-color);
      }

      .warning {
        background: var(--warning-bg-color);
        color: var(--warning-text-color);
        border: 2px solid var(--warning-text-color);
      }

      .danger {
        background: var(--danger-bg-color);
        color: var(--danger-text-color);
        border: 2px solid var(--danger-text-color);
      }

      .nt-header {
        padding: 12px;
        font-weight: bold;
        display: flex;
      }

      .header-content {
        margin-right: 8px;
      }

      .close-button {
        margin-left: auto;
      }

      .lib-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-weight: bold;
      }

      .info button {
        color: var(--info-text-color);
      }

      .warning button {
        color: var(--warning-text-color);
      }

      .danger button {
        color: var(--danger-text-color);
      }

      .nt-body {
        padding: 12px;
        padding-top: 0px;
      }
    `,
  ],
  animations: [
    trigger('flyState', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NotifyComponent implements OnInit {
  notificationStatus: boolean = false;
  notifications: Notification[] = [];
  position = 'top-right';
  faTimes = faTimes;

  constructor(private libService: NotifyService) {}

  ngOnInit(): void {
    this.libService.notificationStatusChanged.subscribe(
      (notificationStatus) => {
        this.notificationStatus = notificationStatus;
      }
    );
    this.notifications = this.libService.notifications;
    this.libService.notificationsChanged.subscribe((notifications) => {
      this.notifications = notifications;
    });

    this.position = this.libService.position;
    this.libService.notificationPositionChanged.subscribe((position) => {
      this.position = position;
    });
  }

  clearNotification = (index: number) => {
    this.libService.clearNotification(index);
    this.libService.notificationsChanged.subscribe((notifications) => {
      this.notifications = notifications;
    });
  };
}
