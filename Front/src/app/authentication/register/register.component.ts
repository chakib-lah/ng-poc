import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators} from '@angular/forms';
import { PasswordMatcherValidators } from '../../shared/validators/password-matcher-validators';
import { debounceTime} from 'rxjs/operators';
import { RegisterService } from '../services/register.service';
import { GenericValidator } from '../../shared/validators/generic-validators';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent, merge } from 'rxjs';
import { UniqueValidators } from '../../shared/validators/unique-validators';
import { User } from './user';
import { Router } from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, {read: ElementRef}) formInputElements!: ElementRef[];

    registerForm!: FormGroup;
    errorMessage = '';

    user!: User;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;


    constructor(
        private router: Router,
        private fb: FormBuilder,
        private registerService: RegisterService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            username: {
                required: 'User name is required.',
                minlength: 'User name must be at least three characters.',
                maxlength: 'User name cannot exceed 50 characters.'

            },
            email: {
                required: 'Email is required.',
                email: 'Please enter a valid email address.'
            },
            password: {
                required: 'Password is required.',
                minlength: 'The password must be longer than 8 characters.'
            },
            confirmPassword: {
                required: 'Confirm your password is required.',
            }
        };

        // Define an instance of the validator for use with this form,
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)], UniqueValidators.uniqueMatch(this.registerService, 'username')],
            email: ['', [Validators.required, Validators.email], UniqueValidators.uniqueMatch(this.registerService, 'email')],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        }, {validator: PasswordMatcherValidators.passwordMatchValidator});

    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        // This is required because the valueChanges does not provide notification on blur
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        // so we only need to subscribe once.
        merge(this.registerForm.valueChanges, ...controlBlurs).pipe(
            debounceTime(300)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.registerForm);
        });
    }


    public register(): void {
        if (this.registerForm.valid) {
            if (this.registerForm.dirty) {
                // TODO show a toaster for user in successful sign up
                this.registerService.createRessource('/api/users', this.registerForm.value)
                    .subscribe(
                        () => this.router.navigateByUrl('/login'),
                        err => console.log(err)
                    );
            }
        }
    }

}
