// Utilities
import React from 'react';

import './style.scss';

let Card = React.createClass( {
	render: function() {
		let profile = this.props;
		return (
			<div className='profile'>
				<h1>Thanks for logging in, { profile.display_name }</h1>
			</div>
		);
	}
} );

export default Card;
