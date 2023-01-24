import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent {
    public users:User[] = []
    constructor(public userService: UserService, private snackBar: MatSnackBar) {

    }

    ngOnInit(): void {
        this.getUsers();
    }

    public getUsers(): void {
        this.userService.geAlltUser()
            .subscribe((response: any) => {
                if (response && response.succeed) {
                    this.users = response.result;
                }
            })
    }

    public delete(data: User) {
        if (data.userid) {
          this.userService.deleteUser(data.userid).subscribe((res: any) => {
            if (res && res.succeed) {
              this.snackBar.open('User Deleted Successfully', 'Close', { duration: 5000 });
              this.getUsers();
            }
          })
        }
      }
}
