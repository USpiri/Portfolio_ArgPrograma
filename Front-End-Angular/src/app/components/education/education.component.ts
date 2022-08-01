import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { Education } from '../../model/educationEntity';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  data: Education[] = [];
  file:any;

  educationToEdit: Education = new Education( "","",false,"","","","",false );
  educationToAdd: Education = new Education( "","",false,"","","","",false );

  start_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;
  end_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;

  constructor(
    private dataEducation:EducationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.dataEducation.getEducation().subscribe(
      education => {
        this.data = education;
      }
    );
  }

  editModal( education:Education ){
    this.educationToEdit = education;
  }

  updateEducation(obj:{ file?:any, education?:any  }){
    if (obj.file) {
      const dataForm = new FormData();
      dataForm.append( "education", obj.file, obj.file.name );
      this.dataEducation.updateEducation(obj.education).subscribe(
        edu => {
          let eduToUpdate:Education = edu
          this.dataEducation.updateImage( dataForm , eduToUpdate ).subscribe(
            educ => {
              this.data.map(
                (educa, i) => {
                  if (educa.id === educ.id) {
                    this.data[i] = educ;
                    this.extraerBase64(obj.file).then(
                      (image:any) => {
                        this.data[i].img_url = image.base;
                      }
                    )
                  }
                }
              );
            }
          );
        }
      );
    } else {
      this.dataEducation.updateEducation(obj.education).subscribe(
        edu => {
          this.data.map(
            (educ, i) => {
              if (educ.id === edu.id) {
                this.data[i] = edu;
              }
            }
          );
        }
      );
    }
  }

  addEducation(){
    const dataForm = new FormData();
    dataForm.append( "education", this.file, this.file.name );

    this.educationToAdd.start_date = this.datePipe.transform(this.date(this.start_date), "dd/MM/yyyy")!;
    this.educationToAdd.end_date = this.datePipe.transform(this.date(this.end_date), "dd/MM/yyyy")!;
    this.dataEducation.addEducation(this.educationToAdd).subscribe(
      edu => {
        let eduToUpdate:Education = edu;
        this.dataEducation.updateImage( dataForm , eduToUpdate ).subscribe(
          educ => {
            this.data.push(educ)
          }
        );
      }
    );
    this.onClose();
  }

  date( date:String ){
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onClose(){
    this.educationToAdd = new Education( "","",false,"","","","",false );
  }

  onDelete( educationToDelete:Education ){
    this.dataEducation.deleteEducation(educationToDelete).subscribe(
      () => {
        this.data = this.data.filter(
          education => education.id !== educationToDelete.id  
        );
      }
    );
  }

  captureFile(event:any){
    const savedFile = event.target.files[0];
    this.file = savedFile;
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

}
