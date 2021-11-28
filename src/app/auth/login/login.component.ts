import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { EncrDecrService } from 'src/shared/security/encript.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/shared/services/token.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private apiService:AuthService,
    private encrtService:EncrDecrService,
    private toastr: ToastrService,
    private tokenService:TokenStorageService,
    private router: Router) {
    this.form =  this.fb.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    const postData = {
      email:this.encrtService.set(environment.encryptKey,this.form.value.email),
      password:this.encrtService.set(environment.encryptKey,this.form.value.password)
    }
    this.form.invalid? console.log('invalid') :null;
    this.apiService.login(this.form.value).subscribe(
      Response=>{
        console.log(Response)
        this.toastr.success('Welcome!!', 'Login Sucessfully!!');
        this.tokenService.saveToken(Response.data._token)
        this.router.navigate(['/dashboard'])
      },
      error=>{
        this.toastr.error('Somthing went wrong!!', 'Invalid Credential');
      }
    )
  }

  ngOnInit(): void {
  }

}
