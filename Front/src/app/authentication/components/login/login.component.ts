import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { GenericValidator } from '../../../shared/validators/generic-validators';
import { fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, {read: ElementRef}) formInputElements!: ElementRef[];

    loginForm!: FormGroup;
    errorMessage = '';
    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;


    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private fb: FormBuilder
    ) {
        this.validationMessages = {
            username: {
                required: 'Please enter your username.'
            },
            password: {
                required: 'Please enter your password.'
            }
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
    }


    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        // This is required because the valueChanges does not provide notification on blur
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        // so we only need to subscribe once.
        merge(this.loginForm.valueChanges, ...controlBlurs).pipe(
            debounceTime(300)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.loginForm);
        });
    }

    public login() {
        let username = this.loginForm.get('username')?.value;
        let password = this.loginForm.get('password')?.value;
        this.authService
            .login(username, password)
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (err) => {
                    if (err.status === 401) {
                        this.errorMessage = 'The username or password are wrong';
                    }
                },
            });
    }

}
