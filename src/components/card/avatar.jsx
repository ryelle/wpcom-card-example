// Utilities
import React from 'react';

let Avatar = React.createClass( {
	render: function() {
		return (
			<div className='profile-image'>
				<img src={ this.props.url } />
			</div>
		);
	}
} );

export default Avatar;
