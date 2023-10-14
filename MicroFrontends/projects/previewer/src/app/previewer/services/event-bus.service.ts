import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventTarget = new EventTarget();

  emitEvent(eventName: string, data: any = null) {
    const event = new CustomEvent(eventName, { detail: data });
    this.eventTarget.dispatchEvent(event);
  }

  onEvent(eventName: string, callback: (data: any) => void) {
    this.eventTarget.addEventListener(eventName, (event: CustomEvent) => {
      callback(event?.detail);
    });
  }

  // onEvent(eventName: string): Observable<any> {
  //   const subject = new Subject<any>();

  //   this.eventTarget.addEventListener(eventName, (event: CustomEvent) => {
  //     subject.next(event.detail);
  //   });

  //   return subject.asObservable();
  // }

  // onEvent(eventType: string): Observable<any> {
  //   return this.eventSubject.asObservable().pipe(
  //     filter((event) => event.type === eventType),
  //     map((event) => event.data)
  //   );
  // }
}
