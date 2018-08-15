import React, { Component } from 'react';
import './Interface.css';
import BottomMenu from './BottomMenu';
import HoverMenu from './HoverMenu';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Interface extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bottomMenu: false,
            index: this.props.index,
        };
        this.showBottomMenu = this.showBottomMenu.bind(this);
        this.hideBottomMenu = this.hideBottomMenu.bind(this);
        this.getMenuDots = this.getMenuDots.bind(this);
    }

    showBottomMenu() {
        this.setState({
            bottomMenu: true,
        });
        this.props.disableHoverMenu();
    }

    hideBottomMenu() {
        this.setState({
            bottomMenu: false
        })
        this.props.enableHoverMenu();
    }

    getMenuDots() {
        var count = this.props.pagesCount;
        var currentIndex = this.props.index;
        var contents = [];
        for (var i = 0; i < count; i++) {
            if (i === currentIndex){
                contents.push(<span className="active" key={i}></span>);
            } else {
                contents.push(<span key={i}></span>);
            }
        }
        return contents;
    }

	render() {
		var pageName = this.props.pageName;

        var k = 1;
        var showHoverMenu = false;
        if (this.props.swipeLength < 0){ k = -1; }
        var hoverLength = (this.props.swipeLength / 150) * k;
        if ((hoverLength > 0.2) && (this.props.hoverMenuEnabled)) { showHoverMenu = true; }
        if (hoverLength > 0.9) { hoverLength = 0.9; }

        var dotsBlockClass = "menu-dotsBlock";
        if (showHoverMenu){
            dotsBlockClass += " menu-dotsBlock_z";
            this.state.index = this.state.index - k;
        }

		return (
            <div>
                <div className="interface">
                    <div className="pageName">
                        {pageName}
                        <div className="pageName-line"></div>
                    </div>
                    <div className={dotsBlockClass}>
                        { this.getMenuDots() }
                    </div>
                    <div className="menuBtn" onClick={this.showBottomMenu}></div>

                    <ReactCSSTransitionGroup transitionName="bottom-menu-animation">
                        {this.state.bottomMenu && <BottomMenu groupsSelect={this.props.groupsSelect} hideBottomMenu = {this.hideBottomMenu} />}
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup transitionName="hover-menu-animation">
                        {showHoverMenu && <HoverMenu swipeLength = {hoverLength} pageName={pageName} pagesList = {this.props.pagesList} nextPageIndex={this.props.nextPageIndex}/>}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
		);
  	}

}

export default Interface;
