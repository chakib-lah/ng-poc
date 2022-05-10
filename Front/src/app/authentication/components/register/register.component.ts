import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators} from '@angular/forms';
import { PasswordMatchValidators } from '../../../shared/validators/password-match-validators';
import { debounceTime} from 'rxjs/operators';
import { RegisterService } from '../../services/register.service';
import { GenericValidator } from '../../../shared/validators/generic-validators';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent, merge } from 'rxjs';
import { UniqueValidators } from '../../../shared/validators/unique-validators';
import { User } from '../../models/user';
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
                unique: 'Username is taken'
            },
            firstName: {
                required: 'First name is required.',
                minlength: 'First name must be at least three characters.',
            },
            lastName: {
                required: 'Last name is required.',
                minlength: 'Last name must be at least three characters.',
            },
            email: {
                required: 'Email is required.',
                email: 'Please enter a valid email address.',
                unique: 'Email is taken'
            },
            password: {
                required: 'Password is required.',
                minlength: 'The password must be longer than 8 characters.'
            },
            confirmPassword: {
                required: 'Confirm your password is required.',
                passwordMatch: 'The password confirmation does not match with the password'
            }
        };

        // Define an instance of the validator for use with this form,
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['', {
                validators: [Validators.required, Validators.minLength(3)],
                asyncValidators: UniqueValidators.uniqueMatch(this.registerService, 'username'),
                updateOn: 'blur'
            }],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', {
                validators: [Validators.required, Validators.email],
                asyncValidators: UniqueValidators.uniqueMatch(this.registerService, 'email'),
                updateOn: 'blur'
            }],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        }, {validator: PasswordMatchValidators.passwordMatchValidator});

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
                console.log(this.registerForm.value)
                // TODO show a toaster for user in successful sign up
                this.registerService.createRessource('/api/users', this.registerForm.value)
                    .subscribe({
                        next: () => this.router.navigateByUrl('/login'),
                        error: err => console.log(err)
                    });
            }
        }
    }

}
