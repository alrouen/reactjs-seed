var _ = require( "lodash" );
var Rtti = require( "./Rtti");
var ModelValidator = require( './ModelValidator' );

class Contact extends Rtti {
    constructor( firstName = '', lastName = '', email = '', language = '', age = '', gender = '', password = '',
                 favoriteMovies = [], tscs = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.language = language;
        this.age = age;
        this.gender = gender;
        this.password = password;
        this.favoriteMovies = favoriteMovies;
        this.tscs = tscs;
    }

    static fromObject( object ) {
        return _.merge( new Contact(), _.cloneDeep( object ) );
    }
}

Contact.className = "Contact";

Contact.validators = {
        firstName: [ ModelValidator.minimumLength( 10 ) ]
};

// new ModelValidator( new Contact( 'joi' ), Contact.validators ).validate();

module.exports = Contact;
