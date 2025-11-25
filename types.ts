
export interface Plan {
  id: string;
  name: string;
  price: string | number; // String for 'Custom' or 'Sold Out'
  interval: 'month' | 'year' | 'lifetime';
  features: string[];
  recommended?: boolean;
  type: 'shared' | 'dedicated' | 'enterprise';
  specs: {
    tps: string;
    rps: string;
    geyser: string;
  }
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum PageState {
  HOME = 'HOME',
  CHECKOUT = 'CHECKOUT',
  SUCCESS = 'SUCCESS',
  PLANS = 'PLANS'
}
