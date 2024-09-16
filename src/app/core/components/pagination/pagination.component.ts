import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="flex space-x-1">
            <button
                class="rounded-md border duration-500 border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                (click)="changePage(currentPage - 1)"
                [disabled]="currentPage === 1"
            >
                Prev
            </button>
            <button
                *ngFor="let page of pages"
                class="min-w-9 rounded-md duration-500 py-2 px-3 border text-center text-sm transition-all shadow-sm"
                [ngClass]="{
                    'bg-slate-800 text-white': page === currentPage,
                    'border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800':
                        page !== currentPage
                }"
                (click)="changePage(page)"
            >
                {{ page }}
            </button>
            <button
                class="rounded-md border duration-500 border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                (click)="changePage(currentPage + 1)"
                [disabled]="currentPage === totalPage"
            >
                Next
            </button>
        </div>
    `,
})
export class PaginationComponent {
    @Input() totalPage: number = 1;
    @Input() currentPage: number = 1;
    @Output() pageChange = new EventEmitter<number>();

    get pages(): number[] {
        return Array.from({ length: this.totalPage }, (_, i) => i + 1);
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPage) {
            this.pageChange.emit(page);
        }
    }
}
