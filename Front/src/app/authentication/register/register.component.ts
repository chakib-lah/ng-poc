import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = c.get('password');
    const confirmControl = c.get('confirmPassword');

    if (passwordControl?.pristine || confirmControl?.pristine) {
        return null;
    }

    if (passwordControl?.value === confirmControl?.value) {
        return null;
    }
    return {'match': true};
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            passwordGroup: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
            }, {validator: passwordMatcher})
        });
    }


}
