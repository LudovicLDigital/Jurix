import React, {useMemo} from 'react';
import {View} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const YoutubeVideo = ({videoUrl}: {videoUrl: string}) => {
  const getVideoId = useMemo(() => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return match && match[7].length == 11 ? match[7] : '';
  }, [videoUrl]);

  return (
    <View>
      <YoutubeIframe height={300} videoId={getVideoId} />
    </View>
  );
};

export default YoutubeVideo;
