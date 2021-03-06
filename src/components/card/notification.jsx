// Utilities
import React from 'react';

let Notification = React.createClass( {
	getDefaultProps: function() {
		return {
			hasNew: false,
			size: 24,
		};
	},

	render: function() {
		return (
			<div className='notification'>
				<svg height={ this.props.size } width={ this.props.size } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M6.14 14.97l2.828 2.827c-.362.362-.862.586-1.414.586-1.105 0-2-.895-2-2 0-.552.224-1.052.586-1.414zm8.867 5.324L14.3 21 3 9.7l.706-.707 1.102.157c.754.108 1.69-.122 2.077-.51l3.885-3.884c2.34-2.34 6.135-2.34 8.475 0s2.34 6.135 0 8.475l-3.885 3.886c-.388.388-.618 1.323-.51 2.077l.157 1.1z"/></g></svg>
				{ this.hasNew ? <span className="notification-bubble"></span> : null }
			</div>
		);
	}
} );

export default Notification;
