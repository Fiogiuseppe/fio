import type { Metadata } from 'next';
import { WorkProjectsGrid } from '@/components/WorkProjectsGrid';

export const metadata: Metadata = {
  title: 'Work — Giuseppe Fioretti',
  description: 'Selected branding, campaigns, art direction and creative direction work.',
};

export default function WorkPage() {
  return <WorkProjectsGrid />;
}
