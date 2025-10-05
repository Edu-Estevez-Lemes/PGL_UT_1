import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlquileresListPage } from './alquileres-list.page';

describe('AlquileresListPage', () => {
  let component: AlquileresListPage;
  let fixture: ComponentFixture<AlquileresListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquileresListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
