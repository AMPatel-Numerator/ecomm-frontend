import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user.service";
import { Contact } from "../contact/contact.component";

@Component({
    selector: 'app-queries',
    templateUrl: './queries.component.html',
    styleUrls: ['./queries.component.scss']
})

export class QueriesComponent {
    public queries: Contact[] = []
    constructor(public userService: UserService) {

    }

    ngOnInit(): void {
        this.getQueries();
    }

    public getQueries(): void {
        this.userService.getQueries()
            .subscribe((response: any) => {
                if (response && response.succeed) {
                    this.queries = response.result;
                }
            })
    }
}
