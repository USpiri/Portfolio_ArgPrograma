import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Skill } from 'src/app/model/skillEntity';

@Component({
  selector: 'app-skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.css']
})
export class SkillsModalComponent implements OnInit, OnChanges {

  @Input() skill:Skill = new Skill( "","","" );
  @ViewChild('clsEditSkill') closeButton:any;

  @Output() onUpdateSkill:EventEmitter<Skill> = new EventEmitter();
  @Output() onDeleteSkill:EventEmitter<Skill> = new EventEmitter();


  skillSave:Skill = new Skill( "","","" );
  skillActual:Skill = new Skill( "","","" );

  percentage: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange = changes['skill'];
    if( change ){
      Object.assign( this.skillActual, this.skill );
      this.percentage = Number(this.skillActual.percentage.substring(0,this.skillActual.percentage.lastIndexOf("%")));
    }
  }

  onSubmit(editSkillForm:any){
    Object.assign( this.skillSave, this.skillActual );
    this.skillSave.percentage = this.percentage.toString() + "%";
    this.onUpdateSkill.emit(this.skillSave);
    this.closeButton.nativeElement.click();
    editSkillForm.resetForm();
  }

  onClose(){
    Object.assign( this.skillActual, this.skill );
  }

  onDelete(){
    this.onDeleteSkill.emit(this.skillActual);
  }

}
