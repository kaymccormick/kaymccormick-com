import React from 'react'

class Structure extends React.Component {
    render() {
	return <div className="tlgrid">
	    <div className="tlgrid__header1">{this.props.header1}</div>
	    <div className="tlgrid__nav1">{this.props.nav1}</div>
	    <div className="tlgrid__mainarea">{this.props.mainarea}</div>
	    </div>;
    }
}
export default Structure;

