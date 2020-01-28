import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerepositoryComponent } from './filerepository.component';

describe('FilerepositoryComponent', () => {
  let component: FilerepositoryComponent;
  let fixture: ComponentFixture<FilerepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilerepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilerepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
