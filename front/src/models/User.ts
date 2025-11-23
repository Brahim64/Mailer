export class User {
    public id: string;
    public issuer: string;
    public email: string;
    public emailVerified: string;
    public name: string;
    public profileImage: string;
    public firstName: string;
    public familyName: string;

    constructor(
        id: string = '',
        issuer: string = '',
        email: string = '',
        emailVerified: string = '',
        name: string = '',
        profileImage: string = '',
        firstName: string = '',
        familyName: string = ''
    ) {
        this.id = id;
        this.issuer = issuer;
        this.email = email;
        this.emailVerified = emailVerified;
        this.name = name;
        this.profileImage = profileImage;
        this.firstName = firstName;
        this.familyName = familyName;
    }
}