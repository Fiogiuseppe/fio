type UreesVideoSectionProps = {
  mp4: string;
  poster: string;
};

export function UreesVideoSection({ mp4, poster }: UreesVideoSectionProps) {
  return (
    <section className="urees-video-section">
      <div className="urees-page-width">
        <video
          className="urees-video-section__player"
          controls
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={mp4} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
