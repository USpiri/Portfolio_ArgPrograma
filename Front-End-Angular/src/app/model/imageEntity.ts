export class Image {

    id?: number;
    header: String;
    about: String;

    constructor( header:String, about:String ){
        this.header = header;
        this.about = about;
    }

}