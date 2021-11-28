import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EncrDecrService } from 'src/shared/security/encript.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  editForm: FormGroup = new FormGroup({});
  MealsList: Array<any> = []
  TotalCalories: Number = 0;

  constructor(private fb: FormBuilder,
    private apiService:AuthService,
    private encrtService:EncrDecrService,
    private toastr: ToastrService,
    private tokenService:TokenStorageService,
    private router: Router) {
    this.form =  this.fb.group({
      mealName:['',[Validators.required]],
      calories: ['', [Validators.required]],
    })

    this.editForm =  this.fb.group({
      mealName:['',[Validators.required]],
      calories: ['', [Validators.required]],
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    if(this.form.invalid){
      this.toastr.info('Enter all information correctly')
      return
    }
    this.apiService.addMeals(this.form.value).subscribe(
      Response=>{
        this.toastr.success('Sucessfully!!', Response?.message);
        this.form.reset()
        this.getAllMealsList()
      },
      error=>{
        console.log(error.error?.message);
        this.toastr.error(error.error?.message);
      }
    )
  }

  deleteMeal(ID:number){
    try {
      this.apiService.deleteMeals(ID).subscribe(
        Response=>{
          this.toastr.success('Deleted Sucessfully!!', Response?.message);
          this.getAllMealsList()
        },
        error=>{
          this.toastr.error(error.error?.message);
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  editAction(item:any){
    try {
      this.MealsList.forEach((obj)=>{
        obj['edit'] = false
      })
      item.edit = !item.edit
      this.editForm.patchValue(item)
    } catch (error) {
        console.log(error)
    }
  }

  editSubmit(data:any){
    if(this.editForm.invalid){
      this.toastr.info('Enter all information correctly')
      return
    }
    this.apiService.updateMeals(this.editForm.value,data._id).subscribe(
      Response=>{
        this.toastr.success('Updated Sucessfully!!', Response?.message);
        this.editForm.reset()
        this.getAllMealsList()
        data.edit = !data.edit
      },
      error=>{
        this.toastr.error(error.error?.message);
      }
    )
  }

  ngOnInit(): void {
    this.getAllMealsList()
  }

  // Get All Meals for cuttent date
  getAllMealsList(){
    try {
      this.apiService.getMeals().subscribe(
        Response=>{
          this.MealsList = Response.data
          this.TotalCalories = 0
          this.MealsList.forEach((obj)=>{
            obj['edit'] = false
            this.TotalCalories+=obj.calories
          })
        },
        error=>{
          this.toastr.error(error.error?.message);
        }
      )
    } catch (error) {
      console.log(error)
    }
  }


}
