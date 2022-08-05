import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skillEntity';
import { StorageService } from 'src/app/services/auth/storage.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @Input() isLogged:boolean = false;

  data:Skill[] = [];

  skillToEdit: Skill = new Skill( "","","" );
  skillToAdd: Skill = new Skill( "","","" );

  percentage: number = 0;
    
  constructor(
    private dataSkill:SkillService,
    private storageService:StorageService
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLogged = true;
    }
    this.dataSkill.getSkills().subscribe(
      data => {
        this.data = data;
      }
    );
  }

  openEditModal( skill:Skill ){
    this.skillToEdit = skill;
  }

  updateSkill( skillToUpdate:Skill ){
    this.dataSkill.updateSkill(skillToUpdate).subscribe(
      skill => {
        this.data.map(
          (sk , i ) => {
            if ( sk.id == skill.id ) {
              this.data[i] = skill;
            }
          }
        );
      }
    );
  }

  deleteSkill( skillToDelete:Skill ){
    this.dataSkill.deleteSkill(skillToDelete).subscribe(
      () => {
        this.data = this.data.filter(
          skill => skill.id !== skillToDelete.id  
        );
      }
    );
  }

  addSkill(){
    this.skillToAdd.percentage = this.percentage.toString() + "%";
    this.dataSkill.addSkill(this.skillToAdd).subscribe(
      skill => {
        this.data.push(skill);
      }
    )
    this.onClose();
  }

  onClose(){
    this.skillToAdd = new Skill( "","","" );
    this.percentage = 0;
  }

}
