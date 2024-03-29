import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Social } from 'src/app/model/socialMediaEntity';
import { Person } from 'src/app/model/personEntity';
import { PersonService } from 'src/app/services/person.service';
import { Image } from 'src/app/model/imageEntity';
import { SocialService } from 'src/app/services/social.service';
import { ImageService } from 'src/app/services/image.service';
import { StorageService } from 'src/app/services/auth/storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() isLogged:boolean = false;
  @Output() onUpdate:EventEmitter<{ person:Person, links:Social, images:Image }> = new EventEmitter();
  @ViewChild('headerInput',{ static : false}) InputHeader?:ElementRef;
  @ViewChild('aboutInput',{ static : false}) InputAbout?:ElementRef;
  @ViewChild('clsAbout') closeButton:any;

  updatePerson:Person = new Person( "","","","","","","","","" );
  updateLinks:Social = new Social( "","","","","","" );
  updateImages:Image = new Image( "","" );

  data:Person = new Person( "","","","","","","","","" );
  links:Social = new Social( "","","","","","" );
  images:Image = new Image( "","" );
  files:{ header?: any, about?: any; } = {};

  dataToEdit:Person = new Person( "","","","","","","","","" );
  linksToEdit:Social = new Social( "","","","","","" );
  imagesToEdit:Image = new Image( "","" );

  date:{ month: string , day: string , year: string } = {
    month: "",
    day: "",
    year: ""
  };

  constructor(
    private dataPerson:PersonService,
    private dataSocial:SocialService,
    private dataImages:ImageService,
    private storageService:StorageService
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLogged = true;
    }
    this.dataPerson.getPerson().subscribe(
      data => {
        this.updateData( this.data, data );
        this.updateData(this.updatePerson, data);
        this.updateData( this.dataToEdit, this.data );
        this.getBirthDate( this.data );
      }
    );
    this.dataSocial.getLinks().subscribe(
      social => {
        if (social) {
          this.updateData( this.links, social );
          this.updateData( this.updateLinks, social );
          this.updateData( this.linksToEdit, this.links );
          this.getLastIndex(this.linksToEdit);
        } else {
          this.dataSocial.addLinks(this.links).subscribe();
        }
      }
    );
    this.dataImages.getImages().subscribe(
      images => {
        if (images) {
          this.updateData( this.images, images );
          this.updateData( this.updateImages, images );
          this.updateData( this.imagesToEdit, this.images );
        } else {
          this.dataImages.addImages(this.images).subscribe();
        }
      }
    );
    this.onUpdate.emit({  person: this.updatePerson,
                          links: this.updateLinks,
                          images: this.updateImages }
    );
  }

  updateData ( dataTo:any , dataFrom: any ){
    Object.assign( dataTo, dataFrom );
  }

  parseInt(string:String){
    return Number(string);
  }

  hasImage(string:String){
    return string.length !== 0;
  }

  getLastIndex( links:Social ){
    this.links.facebook = (links.facebook).substring((links.facebook).lastIndexOf('/')+1);
    this.links.instagram = (links.instagram).substring((links.instagram).lastIndexOf('/')+1);
    this.links.twitter = (links.twitter).substring((links.twitter).lastIndexOf('/')+1);
    this.links.github = (links.github).substring((links.github).lastIndexOf('/')+1);
    this.links.cv = links.cv;
    this.links.linkedin = (links.linkedin).substring((links.linkedin).lastIndexOf('/')+1);
  }

  getBirthDate( data: any ){
    this.date.year = data.birth_date.substring(data.birth_date.lastIndexOf(',')+2);
    this.date.day = data.birth_date.substring(data.birth_date.lastIndexOf(',')-2,data.birth_date.lastIndexOf(',')).trim();
    this.date.month = data.birth_date.split(' ')[0]
  }

  formateBirthDate(){
    return this.date.month + " " + this.date.day + ", " + this.date.year;
  }

  isEmpty( object:any ){
    return Object.keys(object).length === 0;
  }

  onSubmit(aboutForm:any){
    //Actualizar Servidor
    this.dataToEdit.birth_date = this.formateBirthDate()
    this.completeLinks();
    this.dataPerson.updatePerson(this.dataToEdit).subscribe(
      data => {
        this.updateData( this.data, data );
        this.updateData( this.updatePerson, data );
      }
    );
    this.dataSocial.updateLinks(this.linksToEdit).subscribe(
      social => {
        this.updateData( this.links, social );
        this.updateData( this.updateLinks, social );
      }
    );
    if ( this.files.header && !this.files.about ) {
      //Update Header
      const dataForm = new FormData();
      dataForm.append( "image", this.files.header, this.files.header.name );
      this.dataImages.updateHeader( dataForm , this.imagesToEdit ).subscribe(
        () => {
          this.extraerBase64(this.files.header).then(
            (image:any) => {
              this.images.header = image.base;
              this.updateImages.header = image.base;
            }
          );
        }
      );
    } else if ( this.files.about && !this.files.header ){
      //Update About
      const dataForm = new FormData();
      dataForm.append( "image", this.files.about, this.files.about.name );
      this.dataImages.updateAbout( dataForm , this.imagesToEdit ).subscribe(
        () => {
          this.extraerBase64(this.files.about).then(
            (image:any) => {
              this.images.about = image.base;
              this.updateImages.about = image.base;
            }
          );
        }
      );
    } else if ( this.files.about && this.files.header ){
      const dataForm = new FormData();
      dataForm.append( "image", this.files.header, this.files.header.name );
      dataForm.append( "image", this.files.about, this.files.about.name );
      this.dataImages.updateImages( dataForm , this.imagesToEdit ).subscribe(
        () => {
          this.extraerBase64(this.files.header).then(
            (image:any) => {
              this.images.header = image.base;
              this.updateImages.header = image.base;
            }
          )
          this.extraerBase64(this.files.about).then(
            (image:any) => {
              this.images.about = image.base;
              this.updateImages.about = image.base;
            }
          );
        }
      );
    }
    this.onUpdate.emit({  person: this.updatePerson,
      links: this.updateLinks,
      images: this.updateImages }
    );
    this.closeButton.nativeElement.click();
    aboutForm.resetForm();
  }

  updateAll(){
    this.updateData( this.dataToEdit, this.data );
    this.updateData( this.linksToEdit, this.links );
    this.updateData( this.imagesToEdit, this.images );
    this.getBirthDate( this.data );
    this.getLastIndex(this.linksToEdit);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return null;
    } catch (e) {
      return null;
    }
  })

  getHeaderImg(event:any){
    const savedFile = event.target.files[0];
    this.files.header = savedFile;
  }

  getAboutImg(event:any){
    const savedFile = event.target.files[0];
    this.files.about = savedFile;
  }

  completeLinks(){
    this.linksToEdit.facebook = "https://facebook.com/" + this.linksToEdit.facebook;
    this.linksToEdit.instagram = "https://instagram.com/" + this.linksToEdit.instagram;
    this.linksToEdit.twitter = "https://twitter.com/" + this.linksToEdit.twitter;
    this.linksToEdit.github = "https://github.com/" + this.linksToEdit.github;
    this.linksToEdit.linkedin = "https://www.linkedin.com/in/" + this.linksToEdit.linkedin;
  }

}
