export class Image {

    id?: number;
    header: String;
    header_id?:String;
    about: String;
    about_id?: String;

    constructor( header:String, about:String ){
        this.header = header;
        this.about = about;
    }

}