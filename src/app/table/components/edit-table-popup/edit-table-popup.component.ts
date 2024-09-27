import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-edit-table-popup",
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./edit-table-popup.component.html",
  styleUrl: "./edit-table-popup.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTablePopup {
  data = inject(MAT_DIALOG_DATA);
  editTableRowForm: FormGroup;
  dialogRef = inject(MatDialogRef<EditTablePopup>);

  constructor(private _fb: FormBuilder) {
    this.editTableRowForm = this._fb.group({
      position: [this.data.position, [Validators.required]],
      name: [this.data.name, [Validators.required]],
      weight: [this.data.weight, [Validators.required]],
      symbol: [this.data.symbol, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.editTableRowForm.valid) {
      this.dialogRef.close(this.editTableRowForm.value);
    }
  }
}
