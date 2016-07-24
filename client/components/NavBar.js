import React from 'react';
import $ from 'jquery';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

class NavBar extends React.Component {
    constructor(props,context) {
        super(props);
        this.state = { expanded: false }
        this.context = context;

        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({ expanded: !this.state.expanded });
    }

    handleLogout() {
        $.ajax({
            url: '/api/logout',
            type: 'POST',
            dataType: 'json',
        })
        .done(data => this.context.router.push('/'))
        .fail((xhr, status, err) => console.error(err.toString()));
    }

    render() {
        return (
        	<Navbar fluid inverse 
                expanded={this.state.expanded}
                onToggle={this.toggleNav}
            >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a onClick={() => this.context.router.push('/')}>
                            Pollerize
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem onClick={() => {
                            this.context.router.push('/browse');
                            this.setState({ expanded: false });
                        }}>
                            Browse
                        </NavItem>
                    </Nav>
                    {
                        this.props.user.id ? 
                            (
                                <Nav pullRight>
                                    <NavDropdown title={this.props.user.email}>
                                        <MenuItem onClick={() => {
                                            this.context.router.push('/create');
                                            this.setState({ expanded: false });
                                        }}>
                                            Create
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            this.context.router.push('/dashboard');
                                            this.setState({ expanded: false });
                                        }}>
                                            Dashboard
                                        </MenuItem>
                                    </NavDropdown>
                                    <NavItem onClick={this.handleLogout}>
                                        Logout
                                    </NavItem>
                                </Nav>
                            ) :
                            (
                                <Nav pullRight>
                                    <NavItem onClick={() => {
                                        this.context.router.push('/signup');
                                        this.setState({ expanded: false });
                                    }}>
                                        Register
                                    </NavItem>
                                    <NavItem onClick={() => {
                                        this.context.router.push('/signin');
                                        this.setState({ expanded: false });
                                    }}>
                                        Login
                                    </NavItem> 
                                </Nav>
                            )
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NavBar;