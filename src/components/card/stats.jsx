// Utilities
import React from 'react';

let Stat = React.createClass( {
	render: function() {
		if ( false === this.props.number ) {
			return null;
		}
		return (
			<li className='stats'>
				<div className='stats-number'>{ this.props.number }</div>
				<div className='stats-label'>{ this.props.label }</div>
			</li>
		);
	}
} );

export default Stat;
