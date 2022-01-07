import { isJson } from '../src/isJson';

describe( 'json', () => {
	describe( 'isJson', () => {
		it( 'should return false on any string', () => {
			const item = 'somevalue';
			expect( isJson( item ) ).toBe( false );
		} );
		it( 'should return true on any valid JSON', () => {
			const item = '{"mykey":"myvalue"}';
			expect( isJson( item ) ).toBe( true );
		} );
		it( 'should return false on any invalid JSON', () => {
			const item = '{"mykey":"myvalue",something}';
			expect( isJson( item ) ).toBe( false );
		} );
		it( 'should return false on null', () => {
			const item = null;
			expect( isJson( item ) ).toBe( false );
		} );
		it( 'should return false on empty string', () => {
			const item = '';
			expect( isJson( item ) ).toBe( false );
		} );
	} );
} );
