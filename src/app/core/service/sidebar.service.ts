import { Injectable } from '@angular/core';
import { ISidebarItem } from '@core/components/sidebar/sidebar-item.interface';
import { SidebarItems } from '@core/configs/constants/sidebar-items';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    private sidebarStateSubject = new BehaviorSubject<boolean>(true);

    public sidebarItems$ = this.getSidebarItems();
    public sidebarState$ = this.sidebarStateSubject.asObservable();

    constructor() {
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize.bind(this));
    }

    public toggleSidebar(): void {
        const currentState = this.sidebarStateSubject.getValue();
        this.sidebarStateSubject.next(!currentState);
    }

    public setSidebarState(isOpen: boolean): void {
        this.sidebarStateSubject.next(isOpen);
    }

    private getSidebarItems(): Observable<ISidebarItem[]> {
        return of(SidebarItems);
    }

    private checkScreenSize(): void {
        const isMobile = window.innerWidth < 768;
        this.setSidebarState(!isMobile);
    }
}
