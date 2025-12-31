import { NavBar, SideBaar } from "@/webcomponent/ui";

export default async function AdminLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full ">
      <aside className="hidden md:flex md:flex-col md:w-64 shadow-md">
        <SideBaar />
      </aside>
        <main className="flex-1 overflow-auto max-md:px-4 lg:px-6 px-2">
          {children}
        </main>    
    </div>
  );
}
