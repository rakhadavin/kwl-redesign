import PageMenuBar from "@/components/ui/PageMenuBar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageMenuBar />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}