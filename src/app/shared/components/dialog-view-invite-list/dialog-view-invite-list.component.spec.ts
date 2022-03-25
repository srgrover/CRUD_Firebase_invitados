import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewInviteListComponent } from './dialog-view-invite-list.component';

describe('DialogViewInviteListComponent', () => {
  let component: DialogViewInviteListComponent;
  let fixture: ComponentFixture<DialogViewInviteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewInviteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewInviteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
