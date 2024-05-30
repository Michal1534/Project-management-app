import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fetchAuthenticatedUserTokenAction } from '../store/queries/fetch-user-token/fetch-user-token.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    public loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.maxLength(50)]],
    });

    constructor(private store: Store, private formBuilder: FormBuilder) {}

    public onLogInClick() {
        //TODO
        this.store.dispatch(
            fetchAuthenticatedUserTokenAction({
                user: {
                    email: this.loginForm.value.email || '',
                    password: this.loginForm.value.password || '',
                },
            })
        );
    }
}
