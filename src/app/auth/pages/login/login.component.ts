import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: ['test1ddddddd@test.com',[Validators.required,Validators.email]],
    password: ['123456',[Validators.required,Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.miFormulario.value);
    //console.log(this.miFormulario.value.email);
    this.authService.login(this.miFormulario.value.email,this.miFormulario.value.password)
                    .subscribe( resp => {
                      console.log(resp);
                      if(resp){
                        this.router.navigateByUrl('/dashboard')
                      } else {
                        //algo
                      }
                    },
                    err => {
                      console.log('Usuario no existe lol');
                    })
    //this.router.navigateByUrl('/dashboard')
  }

}
