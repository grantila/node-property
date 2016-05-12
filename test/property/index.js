'use strict';

const property = require( '../../' );

describe( 'general', ( ) =>
{
	it( 'should be able to create a property', ( ) =>
	{
		const prop = property( );
		expect( prop ).to.be.a( 'function' );
	} );

	it( 'should be able to get and set values', ( ) =>
	{
		const prop = property( );

		expect( prop( ) ).to.be.a( 'undefined' );

		prop( 1 );
		expect( prop( ) ).to.be.a( 'number' );
		expect( prop( ) ).to.equal( 1 );

		prop( undefined );
		expect( prop( ) ).to.be.a( 'undefined' );

		prop( null );
		expect( prop( ) ).to.be.a( 'null' );
		expect( prop( ) ).to.equal( null );

		const prop2 = property( "hello world" );
		expect( prop2( ) ).to.be.a( 'string' );
		expect( prop2( ) ).to.equal( "hello world" );
	} );

	it( 'should handle valueOf properly', ( ) =>
	{
		const prop = property( 1 );
		expect( 1 + prop ).to.equal( 2 );

		const prop2 = property( "world" );
		expect( "hello " + prop2 ).to.equal( "hello world" );
	} );

	it( 'should handle toString properly', ( ) =>
	{
		const prop = property( "world" );
		expect( `hello ${prop}` ).to.equal( "hello world" );
	} );

	it( 'should be able to listen to changes', ( ) =>
	{
		const prop = property( 1 );

		const newValue = [ prop( ) ];

		prop.emitter.on( 'data', data => newValue.push( data ) );

		prop( 2 );
		prop( "test" );
		prop.emitter.removeAllListeners( );
		prop( 3 );

		expect( newValue ).to.deep.equal( [ 1, 2, "test" ] );
	} );
} );
