import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'

import Progress from '../components/progress.jsx';

import '../css/player.less'

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: true,
            leftTime: ''
        };
        this.duration = null
    };
    formatTime(time) {
        time = Math.floor(time)
        let min = Math.floor(time/60);
        let sec = Math.floor(time%60);
        sec = sec < 10 ? `0${sec}`: sec
        return `${min}:${sec}`
    }
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.duration = e.jPlayer.status.duration;
            this.setState({
                progress: Math.round(e.jPlayer.status.currentPercentAbsolute),
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.duration * (1 - e.jPlayer.status.currentPercentAbsolute/100)
            })
        });
    };
    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate)
    };
    progressChangeHandler(progress) {
        $('#player').jPlayer('play', this.duration * progress)
    };
    changeVolumeHandler(progress) {
        $('#player').jPlayer('volume', progress)
    };
    play() {
        if (this.state.isPlay) {
            $('#player').jPlayer('pause')
        } else {
            $('#player').jPlayer('play')
        }
        let cur = this.state.isPlay
        this.setState({
            isPlay: !cur
        })
    };
    playNext(type) {
        Pubsub.publish('PLAY_NEXT', type)
    };
    render() {
        return (
            <div >
                <div className="player">
                    <h2><Link to="/list">我的私人音乐坊 &gt;</Link></h2>
                    <h3>歌曲名称: {this.props.currentMusicItem.title}</h3>
                    <h4>歌手: {this.props.currentMusicItem.artist}</h4>
                    <h6> -{this.formatTime(this.state.leftTime)}</h6>
                </div>
                <div className="btn">
                    <span className="btn-prev" onClick={this.playNext.bind(this, "prev")}>上一首</span>
                    <span className="btn-mid" onClick={this.play.bind(this)}>{this.state.isPlay === true ? '暂停' : '播放'}</span>
                    <span className="btn-next" onClick={this.playNext.bind(this, "next")}>下一首</span>
                </div>
                <div className="volume">
                    <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler.bind(this)} />
                </div>
                <div className="music">
                    <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler.bind(this)} barColor="#f00" />
                </div>
            </div >
        )
    }
}