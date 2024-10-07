import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { getVoices } from "../services/agent";
import UploadLoader from "../Routes/UploadLoader";

const VoiceLibrary = () => {
  const [streamingArray, setStreamingArray] = useState([]);
  const [audioNameArray, setAudioNameArray] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRefs = useRef({});

  const fetchVoices = async () => {
    try {
      const response = await getVoices();
      const modifiedData = response.data.map(voice => ({
        ...voice,
        audio: voice.audio.replace('/audio/', '/')
      }));
      const audioName=response.data.map((voices)=>({
        ...voices,
        audio: voices.audio.replace('/assets/audio/', '/')
      }))
      setAudioNameArray(audioName);
      setStreamingArray(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  const handlePlay = (id) => {
    if (currentlyPlaying !== null && currentlyPlaying !== id) {
      const prevAudio = audioRefs.current[currentlyPlaying];
      if (prevAudio && !prevAudio.paused) {
        prevAudio.pause();
      }
    }

    const currentAudio = audioRefs.current[id];
    if (currentAudio) {
      currentAudio.play().then(() => {
        setCurrentlyPlaying(id);
      }).catch((error) => {
        console.log("Failed to play audio:", error);
      });
    } else {
      console.error(`Audio element with id ${id} not found.`);
    }
  };

  const handlePause = () => {
    if (currentlyPlaying !== null) {
      const currentAudio = audioRefs.current[currentlyPlaying];
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        setCurrentlyPlaying(null);
      }
    }
  };

  useEffect(() => {
    const handleError = (event) => {
      if (event.target.tagName === 'AUDIO' && event.error) {
        console.error('Blocked request:', event);
      }
    };
    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  return (
    <>
      {loader && <UploadLoader />}
      <div className="main flex-1">
        <div className="dashboard-container items-center">
          <h1 className="fs-30 fw-600 dashboard-title mb-4">Voice Library</h1>
          <div className="flex flex-wrap gap-3 voiceLibrary_container">
            {streamingArray.map((streaming, index) => (
              <div
                className="w-24 p-3 border border-inherit rounded"
                key={index}
              >
                <h4
                  className="font-medium text-2xl mb-3"
                  style={{ color: "#04004d" }}
                >
                  {streaming.name}
                </h4>

                <p className="my-4 text-gray-600 text-md capitalize">
                  {streaming.gender} <span>|</span> {streaming.accent}
                </p>
                <audio
                  ref={(audio) => (audioRefs.current[streaming.id] = audio)}
                  // src={`https://app.voagents.ai${streaming.audio}`}
                  src={`${streaming.audio}`}

                  controls
                  onPause={handlePause}
                  className="w-full"
                  onPlay={() => handlePlay(streaming.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceLibrary;
