import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../user-dialog/user-dialog.component';
import {MatTable} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'angular-course';
  displayedColumns: string[] = ['id', 'name', 'role', 'country', 'age', 'stars', 'star'];
  users: IUser[] = [];
  loaded: boolean = false;

  @ViewChild(MatTable) table!: MatTable<IUser>;

  constructor(private usersService: UsersService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (v: IUser[]) =>  { 
        this.users = v; 
        this.loaded = true; 
      },
      error: (e) => this.loaded = true,
      complete: () => this.loaded = true
    })
  }

  openDialog(data?: IUser) {
    const dialogo1 = this.dialog.open(UserDialogComponent, {
      data: data !== undefined ? data : {}
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined) {
        if (data?.id != null) {
          this.editar(data);
        } else {
          this.agregar(art);
        }        
      }        
    });
  }

  agregar(user: IUser) {
    this.users.push({ id: this.users.length + 1, name: user.name, country: user.country, role: user.role, age: user.age });
    this.table.renderRows();
    this.snackBar.open("Created successfully", "Close", { duration: 3000 });
  }

  editar(user: IUser) {
    for (let i=0; i <= this.users.length -1; i++) {
      if (this.users[i].id == user.id) {
        this.users[i] = user;
        break;
      }
    }
    this.table.renderRows();
    this.snackBar.open("Edited successfully", "Close", { duration: 3000 });
  }

  borrarFila(user: IUser) {
    if (confirm("Realmente quiere borrarlo?")) {
      for (let i=0; i <= this.users.length -1; i++) {
        if (this.users[i].id == user.id) {
          this.users.splice(i, 1);
          break;
        }
      }
      this.table.renderRows();
      this.snackBar.open("Deleted successfully", "Close", { duration: 3000 });
    }
  }

}
