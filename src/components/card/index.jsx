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

		Promise.all( [
			this.fetchBlogInfo(),
			this.fetchReaderInfo()
		] ).then( ( data ) => {
			this.setState( {
				fetching: false,
				followers: data[0] ? data[0].subscribers_count : false,
				posts: data[0] ? data[0].post_count : false,
				following: data[1] ? data[1].subscriptions.length : false,
			} );
		} ).catch( ( error ) => {
			console.warn( error );
			this.setState( {
				fetching: false,
				followers: false,
				posts: false,
				following: false,
			} );
		} );
	},

	fetchBlogInfo: function() {
		if ( ! this.props.primary_blog_url ) {
			return;
		}

		let site = this.wpcom.site( this.props.primary_blog_url );

		return site.get();
	},

	fetchReaderInfo: function() {
		return this.wpcom.req.get( '/read/following/mine' );
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
					<div className='site-url'><a href={ profile.primary_blog_url }>{ profile.primary_blog_url }</a></div>
				</div>
				<div className='card-body'>
					{ this.renderStats() }
				</div>
			</div>
		);
	}
} );

export default Profile;
