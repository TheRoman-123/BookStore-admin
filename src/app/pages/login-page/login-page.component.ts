import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";


export interface LoginRequest {
  username: string,
  password: string,
  remember: boolean
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.value)
        .subscribe(
          {
            next:
              (response) => {
                localStorage.setItem('token', response.accessToken);
                this.router.navigate(['welcome'])
                  .then(() => console.log("redirection success"))
              },
            error:
              err => {
                alert(err);
              }
          }
        );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
