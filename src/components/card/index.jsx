// Utilities
import React from 'react';

import Avatar from './avatar';
import Notification from './notification';
import Stats from './stats';

import './style.scss';

let Profile = React.createClass( {
	render: function() {
		let profile = this.props;
		return (
			<div className='card'>
				<div className='card-header'>
					<Avatar url={ profile.avatar_URL } />
					<h1>{ profile.display_name }</h1>
					<div className='site-url'>{ profile.primary_blog_url }</div>
				</div>
				<div className='card-body'>
					<ul className='stats-list'>
						<Stats number={ 36 } label='Followers' />
						<Stats number={ 112 } label='Posts' />
						<Stats number={ 52 } label='Following' />
					</ul>
				</div>
			</div>
		);
	}
} );

export default Profile;
