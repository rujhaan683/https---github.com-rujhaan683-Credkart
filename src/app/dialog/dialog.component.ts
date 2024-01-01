import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  message = 'close';
  action = 'dismiss';
  listForm!: FormGroup;
  actionBtn: string = 'Save Expense';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private toast : ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
      comment: [''],
      selectedC: ['', Validators.required],
      selectedM: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update Expense';
      this.listForm.controls['name'].setValue(this.editData.name);
      this.listForm.controls['date'].setValue(this.editData.date);
      this.listForm.controls['amount'].setValue(this.editData.amount);
      this.listForm.controls['comment'].setValue(this.editData.comment);
      this.listForm.controls['selectedC'].setValue(this.editData.selectedC);
      this.listForm.controls['selectedM'].setValue(this.editData.selectedM);
    }
  }

  submitList() {
    if(!this.editData){
    if (this.listForm.valid) {
      this.api.postData(this.listForm.value).subscribe({
        next: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 2500);
          this.dialogRef.close('save')
          this.toast.success('Expense Added') 
        },
        error: () => {
          alert('Error while saving expense');
        },
      });
    }
  }
  else{
    this.updateData()
  }
  }

updateData(){
  this.api.putData(this.listForm.value,this.editData.id).subscribe({
    next: (res)=>{
      this.toast.success('Expense Updated Successfully')
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  })
}

}
