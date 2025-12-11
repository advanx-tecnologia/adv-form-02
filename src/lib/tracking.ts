// Sistema de Tracking Multi-Plataforma
// Suporte para: Meta, Google Ads, TikTok, GA4, GTM, Taboola, Outbrain, Pinterest, Bing

export type PixelPlatform = 
  | 'meta' 
  | 'google_ads' 
  | 'tiktok' 
  | 'ga4' 
  | 'gtm' 
  | 'taboola' 
  | 'outbrain' 
  | 'pinterest' 
  | 'bing';

export type TrackingEvent = 'PageView' | 'Lead';

interface PixelConfig {
  platform: PixelPlatform;
  pixelId: string;
  active: boolean;
}

// Armazenamento local temporário (será substituído por Supabase)
let pixelConfigs: PixelConfig[] = [];
const firedEvents = new Set<string>();

export function setPixelConfigs(configs: PixelConfig[]) {
  pixelConfigs = configs;
}

export function getPixelConfigs(): PixelConfig[] {
  return pixelConfigs;
}

// Gera uma chave única para evitar eventos duplicados
function getEventKey(event: TrackingEvent, step: number): string {
  return `${event}_step_${step}_${Date.now()}`;
}

// Verifica se o evento já foi disparado nesta sessão
function hasEventFired(event: TrackingEvent, step: number): boolean {
  const sessionKey = `${event}_step_${step}`;
  return firedEvents.has(sessionKey);
}

function markEventFired(event: TrackingEvent, step: number): void {
  const sessionKey = `${event}_step_${step}`;
  firedEvents.add(sessionKey);
}

// Dispara evento para Meta (Facebook/Instagram)
function fireMetaEvent(pixelId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackSingle', pixelId, event);
    console.log(`[Meta] Event fired: ${event} for pixel ${pixelId}`);
  }
}

// Dispara evento para Google Ads
function fireGoogleAdsEvent(conversionId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    if (event === 'Lead') {
      (window as any).gtag('event', 'conversion', {
        'send_to': conversionId,
      });
    }
    console.log(`[Google Ads] Event fired: ${event} for ${conversionId}`);
  }
}

// Dispara evento para TikTok
function fireTikTokEvent(pixelId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.instance(pixelId).track(event);
    console.log(`[TikTok] Event fired: ${event} for pixel ${pixelId}`);
  }
}

// Dispara evento para GA4
function fireGA4Event(measurementId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.toLowerCase(), {
      'send_to': measurementId,
    });
    console.log(`[GA4] Event fired: ${event} for ${measurementId}`);
  }
}

// Dispara evento para GTM (via dataLayer)
function fireGTMEvent(event: TrackingEvent, data?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: event,
      ...data,
    });
    console.log(`[GTM] Event pushed: ${event}`);
  }
}

// Dispara evento para Taboola
function fireTaboolaEvent(accountId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any)._tfa) {
    if (event === 'Lead') {
      (window as any)._tfa.push({ notify: 'event', name: 'lead', id: accountId });
    } else {
      (window as any)._tfa.push({ notify: 'event', name: 'page_view', id: accountId });
    }
    console.log(`[Taboola] Event fired: ${event} for ${accountId}`);
  }
}

// Dispara evento para Outbrain
function fireOutbrainEvent(pixelId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).obApi) {
    if (event === 'Lead') {
      (window as any).obApi('track', 'Lead');
    }
    console.log(`[Outbrain] Event fired: ${event} for ${pixelId}`);
  }
}

// Dispara evento para Pinterest
function firePinterestEvent(tagId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).pintrk) {
    if (event === 'Lead') {
      (window as any).pintrk('track', 'lead');
    } else {
      (window as any).pintrk('track', 'pagevisit');
    }
    console.log(`[Pinterest] Event fired: ${event} for ${tagId}`);
  }
}

// Dispara evento para Bing/Microsoft
function fireBingEvent(tagId: string, event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).uetq) {
    if (event === 'Lead') {
      (window as any).uetq.push('event', 'submit_lead_form', {});
    }
    console.log(`[Bing] Event fired: ${event} for ${tagId}`);
  }
}

// Função principal para disparar eventos em todas as plataformas configuradas
export function trackEvent(event: TrackingEvent, step: number, additionalData?: Record<string, any>) {
  // Previne eventos duplicados
  if (hasEventFired(event, step)) {
    console.log(`[Tracking] Event ${event} for step ${step} already fired, skipping...`);
    return;
  }

  markEventFired(event, step);

  // Sempre dispara para GTM se houver dataLayer
  fireGTMEvent(event, { step, ...additionalData });

  // Dispara para cada pixel configurado e ativo
  pixelConfigs
    .filter(config => config.active && config.pixelId)
    .forEach(config => {
      switch (config.platform) {
        case 'meta':
          fireMetaEvent(config.pixelId, event);
          break;
        case 'google_ads':
          fireGoogleAdsEvent(config.pixelId, event);
          break;
        case 'tiktok':
          fireTikTokEvent(config.pixelId, event);
          break;
        case 'ga4':
          fireGA4Event(config.pixelId, event);
          break;
        case 'taboola':
          fireTaboolaEvent(config.pixelId, event);
          break;
        case 'outbrain':
          fireOutbrainEvent(config.pixelId, event);
          break;
        case 'pinterest':
          firePinterestEvent(config.pixelId, event);
          break;
        case 'bing':
          fireBingEvent(config.pixelId, event);
          break;
      }
    });

  console.log(`[Tracking] Event ${event} fired for step ${step}`, additionalData);
}

// Reseta os eventos disparados (útil para testes)
export function resetFiredEvents() {
  firedEvents.clear();
}
