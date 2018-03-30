import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
	renderNav(){
			return (<nav className="navbar is-primary" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<div className="navbar-item nav-brand">
						Draft
					</div>
				</div>

				<div className="navbar-menu">
					<div className="navbar-end">
						<div class="navbar-item">
								<NavLink exact className="nav-link"activeClassName='active' to="/">
									Lobby
								</NavLink>
						</div>
						<div class="navbar-item">
							<button>Sign Out</button>
						</div>
					</div>
				</div>

			</nav>
		)}

	render(){
		return (
		  <div>
      		{this.renderNav()}
      </div>
		)
	}

}
