import {AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { RegisterService } from '../../authentication/services/register.service';


export class UniqueValidators {

     static uniqueMatch (registerService: RegisterService, criteria: string): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return  registerService.getRessourceByCriteria("/api/check-unique-user", 'slug=' + control.value)
                .pipe(
                    map(res => res ? { 'unique': true } : null
                    )
                )
        }
    }
}