export class Education {

    id?: number;
    where: String;
    degree: String;
    is_actual: boolean;
    start_date: String;
    end_date: String;
    img_url: String;
    imageId?:String;
    link: String;
    enabled_link: boolean;

    constructor( where:String, degree:String, is_actual:boolean, start_date:String, end_date:String, img_url:String, link:String, enabled_link:boolean ){
        this.where = where
        this.degree = degree
        this.is_actual = is_actual
        this.start_date = start_date
        this.end_date = end_date
        this.img_url = img_url
        this.link = link
        this.enabled_link = enabled_link
    }

}
