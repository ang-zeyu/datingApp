import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGalleryEditComponent } from './member-gallery-edit.component';

describe('MemberGalleryEditComponent', () => {
  let component: MemberGalleryEditComponent;
  let fixture: ComponentFixture<MemberGalleryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberGalleryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberGalleryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
