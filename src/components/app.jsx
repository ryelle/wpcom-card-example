// Utilities
import React from 'react';

// App settings
import settings from 'config';

// Local components
import Profile from './card';

var wpcomOAuth = require('wpcom-oauth-cors')( settings.clientId, { scope: settings.scope } );

let App = React.createClass( {
	getInitialState: function() {
		return {
			fetching: true,
			profile: false,
			authKey: false,
		};
	},

	componentDidMount: function() {
		wpcomOAuth.get( ( auth ) => {
			let wpcom = require( 'wpcom' )( auth.access_token );
			let me = wpcom.me();

			me.get( { meta: 'flags' } ).then( ( data ) => {
				this.setState( {
					fetching: false,
					profile: data,
					authKey: auth.access_token
				} );
			} ).catch( ( error ) => {
				console.warn( error );
				this.setState( {
					fetching: false,
					profile: false,
					authKey: false,
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
			content = <Profile { ...this.state.profile } authKey={ this.state.authKey } />
		}

		return (
			<div className='profile-view'>
				{ content }
			</div>
		);
	}
} );

export default App;
