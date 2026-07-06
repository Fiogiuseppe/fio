import { UreesRouteMarker } from '@/components/UreesRouteMarker';

export default function UreesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="urees-site">
      <UreesRouteMarker />
      {children}
    </div>
  );
}
