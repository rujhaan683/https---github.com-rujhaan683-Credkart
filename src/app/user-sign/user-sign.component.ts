import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-sign',
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.css'],
})
export class UserSignComponent implements OnInit {
  hide = true;
  public signupForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp() {
    this.http
      .post<any>('http://localhost:3000/login', this.signupForm.value)
      .subscribe((res) => {
        this.toast.success('Sign Up Success');
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2500);
      });
  }
}
