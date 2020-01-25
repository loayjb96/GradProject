import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDoneComponent } from './test-done.component';

describe('TestDoneComponent', () => {
  let component: TestDoneComponent;
  let fixture: ComponentFixture<TestDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
