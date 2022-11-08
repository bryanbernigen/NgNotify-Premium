import * as React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaRandom } from 'react-icons/fa';
import { FaStepBackward } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { FaStepForward } from 'react-icons/fa';
import { BiRepeat } from 'react-icons/bi';
import { FaVolumeUp } from 'react-icons/fa';
import './audioplayer.css';

const Audioplayer = () => {
    return (
        <>
            <footer className="musicPlayer">
                <div className="musicPlayerLeft">
                    <img id="musicPlayerPoster" className="musicPlayerPoster"/>
                    <div className="musicPlayerLeftDesc">
                        <div className="musicPlayerTitle" id="musicPlayerTitle"></div>
                        <div className="musicPlayerSinger musicPlayerSingerName" id="musicPlayerSinger"></div>
                    </div>
                    <FaRegHeart className='like' />
                </div>
                <div className="musicPlayerMid">
                    <audio id="addAudio">
                        <source id="sourceAudio" src=""></source>
                    </audio>
                    <div className="controls">
                        <div className="controlsTop">
                            <FaRandom className='random'/>
                            <FaStepBackward className='backward'/>
                            <FaPlay className='playmusic'/>
                            <FaStepForward className='forward'/>
                            <BiRepeat className='repeat' id="repeat"/>
                        </div>
                        <div className="controlsBottom">
                            <div className="passedTime" id="passedTime"></div>
                            <input type="range" className="timelineAudio" id="timelineAudio" min="0" max="100" value="0" />
                            <div className="remainingTime" id="remainingTime"></div>
                        </div>
                    </div>
                </div>
                <div className="musicPlayerRight">
                    <FaVolumeUp className='volume' id='vol'/>
                    <input type="range" className="timelineVol" id="timelineVol" min="0" max="100" value="20" />
                </div>
            </footer>
        </>
    );
};

export default Audioplayer;