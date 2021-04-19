import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['SomeName',[Validators.required,Validators.minLength(4)]],
    email: ['test1@test.com',[Validators.required,Validators.email]],
    password: ['123456',[Validators.required,Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    //console.log(this.miFormulario.value);
    
    this.authService.register(this.miFormulario.value.name,
                              this.miFormulario.value.email,
                              this.miFormulario.value.password)
                      .subscribe( resp => {
                        if(resp.ok){
                          Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 2500
                          })
                          this.router.navigateByUrl('/auth');
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: resp.msg
                          })
                        }
                      });
  }

}
