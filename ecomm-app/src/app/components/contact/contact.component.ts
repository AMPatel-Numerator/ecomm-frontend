import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Contact } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})

export class ContactComponent {

    public firstName = '';
    public lastName = '';
    public email = '';
    public subject = '';
    public query = '';

    constructor(public userService: UserService, private snackBar: MatSnackBar, private _router: Router,) {

    }


    public onSubmit(): void {
        const userInfo: Contact = {
            firstName: this.firstName, lastName: this.lastName, email: this.email,
            subject: this.subject, query: this.query
        };
        this.userService.contact(userInfo).subscribe((response: any) => {
            if (response.succeed) {
                this.snackBar.open(
                    response.message,
                    'Close',
                    { duration: 2000 });
            } else {
                this.snackBar.open(
                    'Signup failed. Check your user details.',
                    'Close',
                    { duration: 6000 });
            }
        }
        );
    }
}
export { Contact };

