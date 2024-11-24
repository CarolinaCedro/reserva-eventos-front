import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusPanelComponent } from './user-status-panel.component';

describe('UserStatusPanelComponent', () => {
  let component: UserStatusPanelComponent;
  let fixture: ComponentFixture<UserStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatusPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
