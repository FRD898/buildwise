import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TallerSidebar } from "@/components/taller/taller-sidebar";

export default function TallerLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <TallerSidebar />
      <SidebarInset>
        <SidebarTrigger className="m-2" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
