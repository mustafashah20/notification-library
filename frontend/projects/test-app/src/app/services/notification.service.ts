import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../interfaces/notification';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private rootUrl = 'http://localhost:5000';

  notificationsChanged = new Subject<Notification>();

  constructor(private http: HttpClient) {}

  pushNotification = (notification: Notification) => {
    this.notificationsChanged.next(notification);
  }

  getNotifications(id: string): Observable<Notification[]> {
    const url = `${this.rootUrl}/notifications/${id}`;
    return this.http.get<Notification[]>(url);
  }

  addNotification(notification: Notification): Observable<Notification> {
    const url = `${this.rootUrl}/notifications/create`;
    return this.http.post<Notification>(url, notification, httpOptions);
  }

  deleteNotification(id: string): Observable<Notification> {
    const url = `${this.rootUrl}/notifications/${id}`;
    return this.http.delete<Notification>(url);
  }

  updateNotifications(
    id: string,
    notification: Notification
  ): Observable<Notification> {
    const url = `${this.rootUrl}/notifications/${id}`;
    return this.http.patch<Notification>(url, notification, httpOptions);
  }
}
