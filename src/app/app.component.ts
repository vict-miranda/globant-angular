import { Component, OnInit } from '@angular/core';
import { UsersService } from '../app/services/users.service';
import { IUser } from '../app/interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'angular-course';

  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (v: IUser[]) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }

}
