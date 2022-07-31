export class Project {

    id?: number;
    name: String;
    description: String;
    img_url: String;
    link: String;
    enabled_link: boolean;

    constructor( name:String, description:String,  img_url:String, link:String, enabled_link:boolean ){
        this.name = name;
        this.description = description;
        this.img_url = img_url;
        this.link = link;
        this.enabled_link = enabled_link;
    }

}