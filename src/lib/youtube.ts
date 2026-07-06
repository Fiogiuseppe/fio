type YoutubeEmbedOptions = {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
};

/** Privacy-enhanced embed with branding kept to a minimum. */
export function youtubeEmbedUrl(
  videoId: string,
  { autoplay = false, mute = false, loop = false, controls = false }: YoutubeEmbedOptions = {}
) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: mute ? '1' : '0',
    controls: controls ? '1' : '0',
    modestbranding: '1',
    rel: '0',
    iv_load_policy: '3',
    playsinline: '1',
    disablekb: '1',
    fs: '0',
    cc_load_policy: '0',
    color: 'white',
  });

  if (loop) {
    params.set('loop', '1');
    params.set('playlist', videoId);
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export const LEGO_PLAYMAKER_VIDEO_ID = '7mnI-kOeYH0';
