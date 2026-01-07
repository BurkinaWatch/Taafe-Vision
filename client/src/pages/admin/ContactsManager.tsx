import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Contact } from "@shared/schema";
import { format } from "date-fns";
import Dashboard from "./Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Calendar, MessageSquare } from "lucide-react";

export default function ContactsManager() {
  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  return (
    <Dashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Messages & Contacts</h1>
          <p className="text-muted-foreground">Gérez les messages reçus via le formulaire de contact.</p>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Chargement des messages...</div>
        ) : (
          <div className="grid gap-4">
            {contacts?.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {contact.createdAt && format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                      {contact.email}
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {(!contacts || contacts.length === 0) && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-border">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun message pour le moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Dashboard>
  );
}
