import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddResourceComponent } from "./add-service.component";

describe("AddResourceComponent", () => {
  let component: AddResourceComponent;
  let fixture: ComponentFixture<AddResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResourceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});