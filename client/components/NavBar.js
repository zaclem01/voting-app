import React from 'react';
import { Navbar, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

class NavBar extends React.Component {
    constructor(props,context) {
        super(props);
        this.state = { expanded: false }
        this.context = context;

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({ expanded: !this.state.expanded });
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
                        <NavItem onClick={() => {
                            this.context.router.push('/create');
                            this.setState({ expanded: false });
                        }}>
                            Create
                        </NavItem>
                        <NavItem onClick={() => {
                            this.context.router.push('/dashboard');
                            this.setState({ expanded: false });
                        }}>
                            Manage
                        </NavItem>
                    </Nav>
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
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NavBar;