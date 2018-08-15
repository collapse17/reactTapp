import React, { Component } from 'react';
import './HoverMenu.css';

class HoverMenu extends Component {

    constructor() {
        super();
        this.getMenuItem = this.getMenuItem.bind(this);
    }
    getMenuItem(index, title){
        var swipeLength = this.props.swipeLength;

        var fontSize = 24 + (swipeLength*10);
        if (fontSize>32){ fontSize = 32; }

        if (index === this.props.nextPageIndex){
            return (<li className="menu-item-active" style={{fontSize: fontSize}}>{title}</li>);
        } else {
            return (<li>{title}</li>);
        }
    }
    render() {
        const opacity = this.props.swipeLength;
        const style = ({
            opacity: opacity,
        });
        const pagesList = this.props.pagesList;

		return (
		  	<div>
                <div className="hover-BG" style={style}></div>
                <div className="hover-menu" style={style}>
                    {pagesList.map((item, index) =>
                        this.getMenuItem(index, item.title)
                    )}
                </div>
            </div>
		);
  	}
}
export default HoverMenu
