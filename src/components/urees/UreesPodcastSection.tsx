import Image from 'next/image';

type UreesPodcastSectionProps = {
  title: string;
  body: string;
  note: string;
  image: string;
  spotifyUrl: string;
};

export function UreesPodcastSection({
  title,
  body,
  note,
  image,
  spotifyUrl,
}: UreesPodcastSectionProps) {
  return (
    <section className="urees-section urees-section--soft" id="podcast">
      <div className="urees-page-width urees-podcast">
        <div className="urees-podcast__media">
          <Image
            src={image}
            alt="Revive & Thrive podcast"
            width={800}
            height={800}
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="urees-podcast__content">
          <h2 className="urees-section__title urees-podcast__title">{title}</h2>
          <p>{body}</p>
          <p className="urees-note">
            <em>{note}</em>
          </p>
          <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="urees-button">
            Spotify
          </a>
        </div>
      </div>
    </section>
  );
}
