import React from 'react'

import MusicItem from '../components/musicItem.jsx'

export default class MusicList extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        let listEle = null;
        listEle = this.props.musicList.map((item) => {
            return (
                <MusicItem key={ item.id } musicItem={ item } focus={item === this.props.currentMusicItem}/>
            )
        })
        return (
            <ul className="musicList">
                { listEle }
            </ul>
        )
    }
}