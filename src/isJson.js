// Extensive check to make sure object is not of string type and not null.
export const isJson = ( item ) => {
	item = typeof item !== 'string' ? JSON.stringify( item ) : item;

	try {
		item = JSON.parse( item );
	} catch ( e ) {
		return false;
	}

	if ( typeof item === 'object' && item !== null ) {
		return true;
	}

	return false;
};
