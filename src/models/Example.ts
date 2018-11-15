import { Length , IsEmail} from 'class-validator';

export class Example {


    @Length(1, 20)
    docID: String;
    @Length(1, 20)
    docType: String;
    @Length(1, 20)
    firstName: String;
    @Length(1, 20)
    dateOfIssued: String;
    issuedBy: String;
    others: String;
    @IsEmail()
    email: String;
}

