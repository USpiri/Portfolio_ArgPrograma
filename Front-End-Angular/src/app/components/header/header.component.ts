import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/app/model/LoginRequest';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/auth/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  login = new LoginRequest("","");

  constructor(
    private authService:AuthService,
    private storageService:StorageService
  ) { }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      console.log("TokenExistente");
    }
  }

  onSubmit(){
    this.authService.login(this.login).subscribe(
      data => {
        console.log(data.username);
        console.log(data.token);
        
      }
    )
  }

}
