import { Plan, ServiceFeature, FAQItem } from './types';

export const PLANS: Plan[] = [
  {
    id: 'nft-access',
    name: 'P9 Node License',
    price: 400,
    interval: 'month',
    recommended: true,
    type: 'dedicated',
    specs: {
      tps: '300',
      rps: '1500',
      geyser: 'Max 600 Pubkeys'
    },
    features: [
      '2x Full RPC/gRPC Endpoints (FRA & NYC)',
      '4x Decoded Shreds Locations',
      'Zero-Latency Octopus Routing',
      'MEV-Protected Transaction Stream',
      'Yellowstone gRPC & Geyser Support',
      'Global Private Hardware Access'
    ]
  }
];

export const FEATURES: ServiceFeature[] = [
  {
    id: 'hardware',
    title: 'Private Hardware',
    description: 'Hosted on private metal in Frankfurt and NYC. Lowest average ping to validators worldwide.',
    icon: 'Server'
  },
  {
    id: 'octopus',
    title: 'Octopus Mode',
    description: 'P9 Nodes performances are enhanced by Octopus Mode to minimize transactions landing time.',
    icon: 'Octopus'
  },
  {
    id: 'shreds',
    title: 'Decoded Shreds',
    description: 'Access raw data straight from the Turbine protocol. We intercept shreds and decode them instantly.',
    icon: 'Zap'
  },
  {
    id: 'parsing',
    title: 'Smart Parsing',
    description: 'Pre-parsed data structures ready for your bot logic. Zero-copy parsing for maximum speed.',
    icon: 'Activity'
  }
];

export const SYSTEM_INSTRUCTION = "You are NexusBot, an advanced AI assistant for P9 Nodes. Your purpose is to assist users with technical inquiries about Solana RPC nodes, Octopus Mode architecture, and pricing. You are knowledgeable, concise, and professional. P9 Nodes provides high-performance private infrastructure in Frankfurt and NYC.";

export const FAQS: FAQItem[] = [
  {
    question: "How do I access the node?",
    answer: "Access is token-gated. You must purchase a P9 Node NFT from a secondary marketplace (Tensor or Magic Eden). Holding the NFT allows you to subscribe to the monthly service."
  },
  {
    question: "What is the total cost?",
    answer: "The cost consists of the one-time market price of the NFT (variable) plus a monthly renewal fee of 400 USDC to maintain active node access."
  },
  {
    question: "What is Octopus Mode?",
    answer: "Octopus Mode is our proprietary architectural framework designed to minimize transaction landing times on Solana. It functions like a specialized CDN for the blockchain."
  },
  {
    question: "Where are your servers located?",
    answer: "We own and operate private hardware in Frankfurt and New York City to ensure optimal latency to the majority of the validator network."
  }
];