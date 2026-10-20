import Link from "next/link";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TallerSidebar } from "@/components/taller/taller-sidebar";

export default function TallerLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <TallerSidebar />
      <SidebarInset className="min-w-0">
        {/* Fija arriba: en el móvil es la única forma de abrir el menú sin volver al inicio de la página. */}
        <header className="sticky top-0 z-10 flex h-12 items-center gap-2 bg-background px-2">
          <SidebarTrigger />
          <Link href="/" className="font-bold md:hidden">
            BuildWise
          </Link>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
