import React, { useState, useRef, useEffect } from 'react';
import bgm from "../music/bgm.mp3";
import "./BGMController.css"
import {BsVolumeMuteFill, BsVolumeUpFill} from "react-icons/bs";

function BGMController() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.2);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    // const handlePlayPause = () => {
    //     if (audioRef.current) {
    //         if (isPlaying) {
    //             audioRef.current.pause();
    //         } else {
    //             audioRef.current.play();
    //         }
    //         setIsPlaying(!isPlaying);
    //     }
    // };

    // const handleVolumeChange = (event) => {
    //     const volumeValue = event.target.value;
    //     setVolume(volumeValue);
    //     if (audioRef.current) {
    //         audioRef.current.volume = volumeValue;
    //     }
    // };
    
    return (
        <div className='audioPlayer'>
            <audio ref={audioRef} src={bgm} loop volume={volume} controls autoPlay></audio>            
            {/* <div className="container">
                <button onClick={handlePlayPause}>
                    <span className='audio-volume-icon'></span>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div> */}
        </div>
    );
}

export default BGMController;
