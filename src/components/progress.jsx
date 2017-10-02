import React, { Component } from 'react';
import '../css/progress.less'
export default class Progress extends Component {
    constructor(props){
        super(props)
    }
    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        // console.log('ll', progress)
        
        this.props.onProgressChange && this.props.onProgressChange(progress)

    };
    render() {
        return (
            <div className="components-progress" onClick={this.changeProgress.bind(this)} ref="progressBar">
                <div className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}} >
                </div>
            </div>
        )
    }
}

Progress.defaultProps = {
  barColor: 'green'
};