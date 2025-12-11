import { useState, useEffect } from 'react';
import { Users, TrendingUp, BarChart3, Filter, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Lead {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  instagram: string;
  businessStructure: string;
  revenue: string;
  city: string;
  state: string;
  currentStep: number;
  createdAt: string;
}

// Dados mock para demonstração (será substituído por Supabase)
const mockLeads: Lead[] = [
  {
    id: '1',
    fullName: 'João Silva',
    email: 'joao@escritorio.com.br',
    whatsapp: '(11) 99999-1234',
    instagram: 'joaosilva_adv',
    businessStructure: 'Escritório há 5 anos, 500 clientes, área trabalhista',
    revenue: '20-50k',
    city: 'São Paulo',
    state: 'SP',
    currentStep: 6,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    fullName: 'Maria Santos',
    email: 'maria@advocacia.com',
    whatsapp: '(21) 98888-5678',
    instagram: 'mariasantos.adv',
    businessStructure: 'Início recente, buscando crescer',
    revenue: '5-10k',
    city: 'Rio de Janeiro',
    state: 'RJ',
    currentStep: 6,
    createdAt: '2024-01-15T14:20:00Z',
  },
  {
    id: '3',
    fullName: 'Carlos Oliveira',
    email: 'carlos@law.com.br',
    whatsapp: '(31) 97777-9012',
    instagram: '',
    businessStructure: 'Grande escritório, 20 advogados',
    revenue: '100k+',
    city: 'Belo Horizonte',
    state: 'MG',
    currentStep: 5,
    createdAt: '2024-01-15T16:45:00Z',
  },
];

const revenueLabels: Record<string, string> = {
  '0-5k': 'R$ 0 - 5 mil',
  '5-10k': 'R$ 5 - 10 mil',
  '10-20k': 'R$ 10 - 20 mil',
  '20-50k': 'R$ 20 - 50 mil',
  '50-100k': 'R$ 50 - 100 mil',
  '100k+': 'R$ +100 mil',
};

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [revenueFilter, setRevenueFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRevenue = revenueFilter === 'all' || lead.revenue === revenueFilter;
    
    return matchesSearch && matchesRevenue;
  });

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'WhatsApp', 'Instagram', 'Cidade', 'Estado', 'Faturamento', 'Data'];
    const rows = filteredLeads.map(lead => [
      lead.fullName,
      lead.email,
      lead.whatsapp,
      lead.instagram || '-',
      lead.city,
      lead.state,
      revenueLabels[lead.revenue] || lead.revenue,
      new Date(lead.createdAt).toLocaleDateString('pt-BR'),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_advanx_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Leads Capturados
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredLeads.length} leads encontrados
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome, email ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-secondary"
          />
        </div>
        <Select value={revenueFilter} onValueChange={setRevenueFilter}>
          <SelectTrigger className="w-full md:w-[200px] bg-secondary">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Faturamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {Object.entries(revenueLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Cidade/UF</TableHead>
              <TableHead className="hidden md:table-cell">Faturamento</TableHead>
              <TableHead className="hidden md:table-cell">Etapa</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/30">
                <TableCell>
                  <div>
                    <p className="font-medium">{lead.fullName}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {lead.city}, {lead.state}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {revenueLabels[lead.revenue] || lead.revenue}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead.currentStep === 6 
                      ? 'bg-success/10 text-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {lead.currentStep}/6
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Lead</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{selectedLead.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{selectedLead.whatsapp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <p className="font-medium">{selectedLead.instagram || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cidade/UF</p>
                  <p className="font-medium">{selectedLead.city}, {selectedLead.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Faturamento</p>
                  <p className="font-medium">{revenueLabels[selectedLead.revenue]}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estrutura do Negócio</p>
                <p className="p-3 bg-secondary rounded-lg text-sm">
                  {selectedLead.businessStructure}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
