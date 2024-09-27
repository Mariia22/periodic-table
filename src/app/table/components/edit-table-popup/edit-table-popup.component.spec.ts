import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditTablePopup } from "./edit-table-popup.component";

describe("EditTablePopupComponent", () => {
  let component: EditTablePopup;
  let fixture: ComponentFixture<EditTablePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTablePopup],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTablePopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
