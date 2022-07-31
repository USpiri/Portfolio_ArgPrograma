export class Skill {

    id?: number;
    name: String;
    percentage: String;
    icon: String;

    constructor( name:String, percentage:String, icon:String ){
        this.name = name;
        this.percentage = percentage;
        this.icon = icon;
    }

}