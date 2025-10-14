import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import ClientSidebar from "@/components/client/ClientSidebar";
import ClientHeader from "@/components/client/ClientHeader";

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ClientLayout({ children, params }: Props) {
  const session = await auth();
  const { id } = await params;

  if (!session) {
    redirect("/auth/login");
  }

  // Clients can only access their own dashboard
  if (session.user.role === "CLIENT") {
    const client = await prisma.client.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!client || client.id !== id) {
      redirect("/auth/login");
    }
  }

  // Fetch client data
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      package: true,
    },
  });

  if (!client) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-cream">
      <ClientSidebar clientId={id} clientName={client.name} />
      
      <div className="lg:pl-64">
        <ClientHeader 
          clientName={client.name}
          email={client.user.email}
        />
        
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

