// Utilities
import React from 'react';

// App settings
import settings from '../../settings';

// Local components
import Profile from './card';

var wpcomOAuth = require('wpcom-oauth-cors')( settings.clientId, settings.request );

let App = React.createClass( {
	getInitialState: function() {
		return {
			fetching: true,
			profile: false,
		};
	},

	componentDidMount: function() {
		wpcomOAuth.get( ( auth ) => {
			let wpcom = require( 'wpcom' )( auth.access_token );
			let me = wpcom.me();

			me.get().then( ( data ) => {
				console.log( data );
				this.setState( {
					fetching: false,
					profile: data,
				} );
			} ).catch( ( error ) => {
				console.warn( error );
				this.setState( {
					fetching: false,
					profile: false,
				} );
			} );
		} );
	},

	renderWaiting: function() {
		return (
			<h1>Waiting for API response…</h1>
		);
	},

	render: function() {
		let content = null;

		if ( ! this.state.profile && this.state.fetching ) {
			content = this.renderWaiting();
		} else if ( ! this.state.fetching && false !== this.state.profile ) {
			content = <Profile { ...this.state.profile } />
		}

		return (
			<div className='thumbnail-list'>
				{ content }
			</div>
		);
	}
} );

export default App;
