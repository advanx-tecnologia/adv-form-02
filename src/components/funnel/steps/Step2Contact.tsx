import { useState } from 'react';
import { User, Mail, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CelebrationCheck } from '../CelebrationCheck';
import { formatPhone, isValidPhone, extractDDD, getLocationByDDD } from '@/lib/ddd-mapping';
import { FunnelFormData } from '@/hooks/useFunnelForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Step2ContactProps {
  formData: FunnelFormData;
  updateFormData: (field: keyof FunnelFormData, value: string) => void;
  onNext: () => void;
}

export function Step2Contact({ formData, updateFormData, onNext }: Step2ContactProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [fieldCompleted, setFieldCompleted] = useState({
    fullName: false,
    email: false,
    whatsapp: false,
  });

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    updateFormData('whatsapp', formatted);

    // Extrai DDD e localização
    const ddd = extractDDD(value);
    if (ddd && ddd.length === 2) {
      const location = getLocationByDDD(ddd);
      if (location) {
        updateFormData('ddd', ddd);
        updateFormData('city', location.city);
        updateFormData('state', location.state);
        updateFormData('stateCode', location.stateCode);
      }
    }

    // Verifica se completou o telefone
    if (isValidPhone(formatted) && !fieldCompleted.whatsapp) {
      setFieldCompleted(prev => ({ ...prev, whatsapp: true }));
    }
  };

  const handleFieldBlur = (field: 'fullName' | 'email') => {
    if (formData[field] && !fieldCompleted[field]) {
      setFieldCompleted(prev => ({ ...prev, [field]: true }));
    }
  };

  const handleSubmit = () => {
    if (isValidPhone(formData.whatsapp)) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    onNext();
  };

  const isFormValid = formData.fullName && formData.email && isValidPhone(formData.whatsapp);

  return (
    <div className="animate-slide-up space-y-8 w-full max-w-md mx-auto px-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          Vamos começar! 🚀
        </h2>
        <p className="text-muted-foreground">
          Preencha seus dados para garantir sua vaga
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Qual é o seu nome completo?
          </Label>
          <div className="relative">
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => updateFormData('fullName', e.target.value)}
              onBlur={() => handleFieldBlur('fullName')}
              placeholder="Digite seu nome completo"
              className="pr-10 bg-secondary border-border focus:border-primary transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CelebrationCheck show={fieldCompleted.fullName} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Qual o é o seu melhor email?
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              onBlur={() => handleFieldBlur('email')}
              placeholder="seu@email.com"
              className="pr-10 bg-secondary border-border focus:border-primary transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CelebrationCheck show={fieldCompleted.email} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Qual o seu WhatsApp?
          </Label>
          <div className="relative">
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(00) 00000-0000"
              className="pr-10 bg-secondary border-border focus:border-primary transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CelebrationCheck show={fieldCompleted.whatsapp} />
            </div>
          </div>
          {formData.city && (
            <p className="text-xs text-primary animate-fade-in">
              📍 {formData.city}, {formData.stateCode}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 transition-all"
      >
        Garantir Minha Vaga
      </Button>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Confirme seu WhatsApp
            </DialogTitle>
            <DialogDescription>
              Verifique se o número está correto para recebermos seu contato:
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-2xl font-bold text-primary">{formData.whatsapp}</p>
              {formData.city && (
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.city}, {formData.stateCode}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Corrigir
            </Button>
            <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
              <Check className="w-4 h-4 mr-2" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
