import { useState } from 'react';
import { Plus, Trash2, Save, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PixelPlatform, setPixelConfigs, getPixelConfigs } from '@/lib/tracking';

interface PixelConfig {
  id: string;
  platform: PixelPlatform;
  pixelId: string;
  active: boolean;
}

const platformLabels: Record<PixelPlatform, string> = {
  meta: 'Meta (Facebook/Instagram)',
  google_ads: 'Google Ads',
  tiktok: 'TikTok Ads',
  ga4: 'Google Analytics 4',
  gtm: 'Google Tag Manager',
  taboola: 'Taboola',
  outbrain: 'Outbrain',
  pinterest: 'Pinterest',
  bing: 'Microsoft/Bing Ads',
};

const platformPlaceholders: Record<PixelPlatform, string> = {
  meta: 'Ex: 123456789012345',
  google_ads: 'Ex: AW-123456789',
  tiktok: 'Ex: C12345678901234',
  ga4: 'Ex: G-XXXXXXXXXX',
  gtm: 'Ex: GTM-XXXXXXX',
  taboola: 'Ex: 1234567',
  outbrain: 'Ex: 00000000-0000-0000-0000-000000000000',
  pinterest: 'Ex: 1234567890123',
  bing: 'Ex: 12345678',
};

export function PixelManager() {
  const [pixels, setPixels] = useState<PixelConfig[]>(() => {
    // Carrega pixels salvos (será substituído por Supabase)
    const saved = localStorage.getItem('pixel_configs');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });
  const { toast } = useToast();

  const addPixel = () => {
    const newPixel: PixelConfig = {
      id: crypto.randomUUID(),
      platform: 'meta',
      pixelId: '',
      active: true,
    };
    setPixels([...pixels, newPixel]);
  };

  const removePixel = (id: string) => {
    setPixels(pixels.filter(p => p.id !== id));
  };

  const updatePixel = (id: string, field: keyof PixelConfig, value: any) => {
    setPixels(pixels.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const savePixels = () => {
    // Salva localmente (será substituído por Supabase)
    localStorage.setItem('pixel_configs', JSON.stringify(pixels));
    
    // Atualiza o sistema de tracking
    setPixelConfigs(pixels.map(p => ({
      platform: p.platform,
      pixelId: p.pixelId,
      active: p.active,
    })));

    toast({
      title: 'Pixels salvos!',
      description: 'As configurações foram atualizadas com sucesso.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Gerenciador de Pixels
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure os pixels de rastreamento para suas campanhas
          </p>
        </div>
        <Button onClick={addPixel} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Pixel
        </Button>
      </div>

      {pixels.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum pixel configurado</p>
          <p className="text-sm text-muted-foreground">Clique em "Adicionar Pixel" para começar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              className="p-4 bg-card rounded-xl border border-border space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={pixel.active}
                    onCheckedChange={(checked) => updatePixel(pixel.id, 'active', checked)}
                  />
                  <span className={pixel.active ? 'text-success' : 'text-muted-foreground'}>
                    {pixel.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePixel(pixel.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plataforma</Label>
                  <Select
                    value={pixel.platform}
                    onValueChange={(value: PixelPlatform) => updatePixel(pixel.id, 'platform', value)}
                  >
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(platformLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>ID do Pixel</Label>
                  <Input
                    value={pixel.pixelId}
                    onChange={(e) => updatePixel(pixel.id, 'pixelId', e.target.value)}
                    placeholder={platformPlaceholders[pixel.platform]}
                    className="bg-secondary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pixels.length > 0 && (
        <Button onClick={savePixels} className="w-full bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      )}

      <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">Eventos disparados:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><code className="text-primary">PageView</code> - Em cada etapa do funil</li>
          <li><code className="text-primary">Lead</code> - Ao clicar em "Gerar Diagnóstico"</li>
        </ul>
      </div>
    </div>
  );
}
