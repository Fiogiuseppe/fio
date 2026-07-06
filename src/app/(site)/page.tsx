import { SpiritualDesignCover } from '@/components/SpiritualDesignCover';
import { HomeBio } from '@/components/HomeBio';
import { HomeProjectsFeed } from '@/components/HomeProjectsFeed';

export default function HomePage() {
  return (
    <>
      <SpiritualDesignCover />
      <div className="home-below-fold">
        <HomeBio />
        <HomeProjectsFeed />
      </div>
    </>
  );
}
