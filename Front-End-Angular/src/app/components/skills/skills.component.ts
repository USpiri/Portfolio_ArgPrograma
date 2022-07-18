import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skillEntity';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  data:Skill[] = [];

  skillToEdit: Skill = new Skill();
  skillToAdd: Skill = new Skill();

  percentage: number = 0;
    
  constructor(
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.data = data.skills;
      }
    );
  }

  openEditModal( skill:Skill ){
    this.skillToEdit = skill;
  }

  updateSkill( skillToUpdate:Skill ){
    //Update View
    this.data.map(
      (skill , i ) => {
        if ( skill.id == skillToUpdate.id ) {
          this.data[i] = skillToUpdate;
        }
      }
    );
    //Update Server
  }

  deleteSkill( skillToDelete:Skill ){
    //Add Update Server
    this.data = this.data.filter(
      skill => skill.id !== skillToDelete.id
    )
  }

  addSkill(){
    //Add Update Server
    this.skillToAdd.percentage = this.percentage.toString() + "%";
    this.data.push(this.skillToAdd);
  }

  onClose(){
    this.skillToAdd.name = "";
    this.skillToAdd.icon = "";
    this.skillToAdd.percentage = "";
    this.percentage = 0;
  }

}
