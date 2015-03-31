/* @flow */
var _ = require( 'lodash' );


/**
 * Helps validate a model class.
 * Features an automatic repair function on invariant that can try and repair the object.
 */
class ModelValidator {
    constructor( object, validators ) {
        this.object = object;
        this.validators = validators;
    }

    get hasErrors()/*:boolean*/ { return this.errors.length > 0; }


    validate() {
        var errors = [];
        for( var prop in this.validators ) {
            let validators = [ ...this.validators[ prop ] ];
            validators.forEach( ( validator ) => {
                if( this.object.hasOwnProperty( prop ) ) {
                    if( !validator.validate( this.object[ prop ] ) ) {
                        errors.push( `${prop} ${validator.message}` );
                        console.error( `${prop} ${validator.message}` );
                    };
                }
            });
        }

        return errors.length === 0;
    }

    static minimumLength( ln ) {
        return {
            validate( input ) {
                if( input.length < ln )
                    return false;
                else
                    return true;
            },

            message: ` has to be at least ${ln} characters long`
        };
    }
}


module.exports = ModelValidator;
