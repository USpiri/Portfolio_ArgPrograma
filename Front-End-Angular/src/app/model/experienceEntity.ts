export class Experience {

    id?: number;
    company: String;
    job: String;
    is_actual: boolean;
    start_date: String;
    end_date: String;
    img_url: String;
    link: String;
    enabled_link: boolean;
    job_type: String = "";

    constructor( company:String, job:String, is_actual:boolean, start_date:String, end_date:String, img_url:String, link:String, enabled_link:boolean, job_type:String ){
        this.company = company;
        this.job = job;
        this.is_actual = is_actual;
        this.start_date = start_date;
        this.end_date = end_date;
        this.img_url = img_url;
        this.link = link;
        this.enabled_link = enabled_link;
        this.job_type = job_type;
    }

}