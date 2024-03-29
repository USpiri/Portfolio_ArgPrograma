import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/imageEntity';
import { LoginRequest } from 'src/app/model/LoginRequest';
import { Person } from 'src/app/model/personEntity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/auth/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() data:Person = new Person( "","","","","","","","","" );
  @Input() image:Image = new Image( "","" );

  @Output() onLog:EventEmitter<boolean> = new EventEmitter();

  isLogged:boolean = false;
  logFail:boolean = false;
  login = new LoginRequest("","");

  constructor(
    private authService:AuthService,
    private storageService:StorageService
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLogged=true;
    }
  }

  onSubmit(userForm:any){
    this.authService.login(this.login).subscribe(
      data => {
        this.isLogged = true;
        this.logFail = false;
        this.storageService.saveToken(data.token);
        this.storageService.saveUser(data.username);
        this.storageService.saveAuthorities(data.authorities);
        this.onLog.emit(this.isLogged);
        userForm.resetForm();
      },
      err => {
        this.isLogged = false;
        this.logFail = true;
        console.log(err.error.message);
        console.log("ERROR");
        
      }
    )
  }

  logout(){
    this.storageService.clean();
    this.isLogged=false;
    this.onLog.emit(this.isLogged);
  }

}
