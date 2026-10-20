import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TallerSidebar } from "@/components/taller/taller-sidebar";

export default function TallerLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <TallerSidebar />
      <SidebarInset className="min-w-0">
        <SidebarTrigger className="m-2" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
