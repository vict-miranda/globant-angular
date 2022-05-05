import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UsersService {

    private actionUrl: string = "http://localhost:3100/api/users";
    public users: IUser[] = [];

    constructor(private _http: HttpClient) {
    }

    getUsers(): Observable<IUser[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this._http.get<IUser[]>(this.actionUrl, httpOptions);
    }

}