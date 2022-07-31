export class Social {

    id?:number;
    facebook: String;
    instagram: String;
    twitter: String;
    github: String;
    cv: String;
    linkedin: String;

    constructor( facebook:String, instagram:String, twitter:String, github:String, cv:String, linkedin:String ){
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;
        this.github = github;
        this.cv = cv;
        this.linkedin = linkedin;
    }

}