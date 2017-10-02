import React from 'react'
import Pubsub from 'pubsub-js'
import { Link } from 'react-router'

import '../css/musicItem.less'
export default class MusicItem extends React.Component {
    constructor(props) {
        super(props);
    };
    playMusic(musicItem) {
        Pubsub.publish('PLAY_MUSIC', musicItem)
    };
    deleteMusic(musicItem, e) {
        e.stopPropagation()
        Pubsub.publish('DELETE_MUSIC', musicItem)
    };
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`musicItem ${this.props.focus ? 'active' : ''}`} >
                <Link to="/"><span><strong>{musicItem.title}-</strong>{musicItem.artist}</span></Link>
                <span onClick={this.deleteMusic.bind(this, musicItem)} className="del">删除</span>
            </li>
        )
    }
}