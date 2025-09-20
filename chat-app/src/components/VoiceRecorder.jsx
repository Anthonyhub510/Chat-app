import { Mic, MicOff, OctagonX } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../AppContexts';

function VoiceRecorder({ onRecordingComplete }) {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  // const {setAudio} = useContext(AppContext);
  const [mediaRecorder, setMediaRecorder] = useState(null);
// setAudio(audioBlob)
  console.log(audioBlob)
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
      })
      .catch(error => console.error(error));
  }, []);

  const handleStartRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      mediaRecorder.ondataavailable = (event) => {
        const audioBlob = new Blob([event.data], { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        onRecordingComplete(audioBlob);
      };
    }
  };

  return (
    <div>
      {recording ? (
        <button onClick={handleStopRecording}><OctagonX /></button>
      ) : (
        <button onClick={handleStartRecording}> <Mic/> </button>
      )}
    </div>
  );
}

export default VoiceRecorder;