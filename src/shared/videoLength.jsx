import React from 'react';
import moment from 'moment';

const VideoLength = ({ time }) => {
  const findVideoLength = () => {
    let videoLengthInSeconds = moment()
      ?.startOf('day')
      ?.seconds(time)
      ?.format('H:mm:ss');

    const videoLen = videoLengthInSeconds.split(':');

    if (parseInt(videoLen[0]) < 1) {
      videoLengthInSeconds = videoLen.join(':').substring(2);
    } else if (parseInt(videoLen[0]) >= 1 && parseInt(videoLen[0]) <= 9) {
      videoLen[0] = videoLen[0].padStart(2, '0');
      videoLengthInSeconds = videoLen.join(':');
    }

    return videoLengthInSeconds;
  };

  return (
    <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
      {findVideoLength()}
    </span>
  );
};

export default VideoLength;
