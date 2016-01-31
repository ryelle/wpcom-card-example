// Utilities
import React from 'react';

let Stat = React.createClass( {
	render: function() {
		let profile = this.props;
		return (
			<li className='stats'>
				<div className='stats-number'>{ this.props.number }</div>
				<div className='stats-label'>{ this.props.label }</div>
			</li>
		);
	}
} );

export default Stat;
