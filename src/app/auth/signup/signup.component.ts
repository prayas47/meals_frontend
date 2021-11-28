import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { EncrDecrService } from 'src/shared/security/encript.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private apiService:AuthService,
    private encrtService:EncrDecrService,
    private toastr: ToastrService) {
    this.form =  this.fb.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: this.ConfirmedValidator('password', 'confirm_password')
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.form.invalid? console.log('invalid') :null;
    this.apiService.signup(this.form.value).subscribe(
      Response=>{
        console.log(Response)
        this.toastr.success('Login with new account', Response.message);
        this.form.reset()
      },
      error=>{console.log(error)}
    )
  }

  ngOnInit(): void {
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

}
