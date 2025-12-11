import { Users, TrendingUp, Target, CheckCircle2, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Funnel,
  FunnelChart,
  LabelList
} from 'recharts';

// Dados mock (será substituído por Supabase)
const funnelData = [
  { name: 'Página Inicial', value: 1000, fill: 'hsl(28, 100%, 50%)' },
  { name: 'Contato', value: 650, fill: 'hsl(28, 100%, 55%)' },
  { name: 'Instagram', value: 520, fill: 'hsl(28, 100%, 60%)' },
  { name: 'Negócio', value: 380, fill: 'hsl(28, 100%, 65%)' },
  { name: 'Faturamento', value: 320, fill: 'hsl(28, 100%, 70%)' },
  { name: 'Diagnóstico', value: 280, fill: 'hsl(28, 100%, 75%)' },
];

const revenueData = [
  { name: '0-5k', value: 45, fill: '#ff7a01' },
  { name: '5-10k', value: 38, fill: '#ff9a3c' },
  { name: '10-20k', value: 62, fill: '#ffb366' },
  { name: '20-50k', value: 85, fill: '#ffd699' },
  { name: '50-100k', value: 35, fill: '#ffe6b3' },
  { name: '+100k', value: 15, fill: '#fff2d9' },
];

const weeklyData = [
  { day: 'Seg', leads: 42 },
  { day: 'Ter', leads: 38 },
  { day: 'Qua', leads: 55 },
  { day: 'Qui', leads: 48 },
  { day: 'Sex', leads: 62 },
  { day: 'Sáb', leads: 28 },
  { day: 'Dom', leads: 15 },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, icon }: MetricCardProps) {
  return (
    <div className="p-6 bg-card rounded-xl border border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
              {change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span>{Math.abs(change)}% vs semana passada</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function DashboardMetrics() {
  const totalLeads = 280;
  const conversionRate = ((280 / 1000) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Visão Geral</h2>
        <p className="text-muted-foreground text-sm">Métricas do funil de captação</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Leads"
          value={totalLeads}
          change={12}
          icon={<Users className="w-6 h-6 text-primary" />}
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${conversionRate}%`}
          change={5}
          icon={<Target className="w-6 h-6 text-primary" />}
        />
        <MetricCard
          title="Leads Completos"
          value={280}
          change={8}
          icon={<CheckCircle2 className="w-6 h-6 text-primary" />}
        />
        <MetricCard
          title="Média Diária"
          value={41}
          change={-3}
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <div className="p-6 bg-card rounded-xl border border-border">
          <h3 className="font-semibold mb-4">Funil de Conversão</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="p-6 bg-card rounded-xl border border-border">
          <h3 className="font-semibold mb-4">Distribuição por Faturamento</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Performance */}
        <div className="p-6 bg-card rounded-xl border border-border lg:col-span-2">
          <h3 className="font-semibold mb-4">Performance Semanal</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
