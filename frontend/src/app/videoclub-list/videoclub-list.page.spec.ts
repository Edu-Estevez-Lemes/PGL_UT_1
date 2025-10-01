import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoclubListPage } from './videoclub-list.page';

describe('VideoclubListPage', () => {
  let component: VideoclubListPage;
  let fixture: ComponentFixture<VideoclubListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoclubListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
