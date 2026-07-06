type UreesRichContentProps = {
  html: string;
  className?: string;
};

export function UreesRichContent({ html, className }: UreesRichContentProps) {
  if (!html) return null;

  return (
    <div
      className={className ?? 'urees-rich-content'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
