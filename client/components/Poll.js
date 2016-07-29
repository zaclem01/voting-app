import React from 'react';

class Poll extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        	<div>{React.cloneElement(this.props.children, {...this.props})}</div>
        );
    }
}

export default Poll;