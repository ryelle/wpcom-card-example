// Utilities
import React from 'react';

import Avatar from './avatar';
import Notification from './notification';
import Stats from './stats';

import './style.scss';

let Profile = React.createClass( {
	wpcom: false,

	getInitialState: function() {
		return {
			fetching: true,
			followers: false,
			posts: false,
			following: false,
		};
	},

	componentDidMount: function() {
		if ( ! this.props.authKey ) {
			return;
		}

		this.wpcom = require( 'wpcom' )( this.props.authKey );

		this.fetchBlogInfo();
		this.fetchReaderInfo();
	},

	fetchBlogInfo: function() {
		if ( ! this.props.primary_blog_url ) {
			this.setState( {
				fetching: false,
				followers: false,
				posts: false,
			} );
			return;
		}

		let site = this.wpcom.site( this.props.primary_blog_url );

		site.get().then( ( data ) => {
			this.setState( {
				fetching: false,
				followers: data.subscribers_count,
				posts: data.post_count,
			} );
		} ).catch( ( error ) => {
			console.warn( error );
			this.setState( {
				fetching: false,
				followers: false,
				posts: false,
			} );
		} );
	},

	fetchReaderInfo: function() {
		let request = this.wpcom.req.get( '/read/following/mine' );

		request.then( ( data ) => {
			this.setState( {
				following: data.subscriptions.length,
			} );
		} ).catch( ( error ) => {
			console.warn( error );
		} );
	},

	renderStats: function() {
		let site = this.state.siteDetails;
		if ( false !== this.state.fetching ) {
			return (
				<ul className='stats-list'>
					<Stats number={ '…' } label='' />
				</ul>
			);
		}

		if ( false === site ) {
			return null;
		}

		return (
			<ul className='stats-list'>
				<Stats number={ this.state.followers } label='Followers' />
				<Stats number={ this.state.posts } label='Posts' />
				<Stats number={ this.state.following } label='Following' />
			</ul>
		);
	},

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
					{ this.renderStats() }
				</div>
			</div>
		);
	}
} );

export default Profile;
