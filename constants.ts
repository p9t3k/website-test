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
    title: 'Premium quality hardware',
    description: 'Hosted on bare metal infrastructure, our nodes capitalize on the lowest average ping to validators worldwide, thanks to our tailor made network.',
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
    description: 'Stream decoded data straight from our shreds sources.',
    icon: 'Zap'
  },
  {
    id: 'parsing',
    title: 'Index Data',
    description: 'Heavy calls are fully supported. Low reponse times, no matter your demands.',
    icon: 'Activity'
  }
];

export const SYSTEM_INSTRUCTION = "You are NexusBot, an advanced AI assistant for P9 Nodes. Your purpose is to assist users with technical inquiries about Solana RPC nodes, Octopus Mode architecture, and pricing. You are knowledgeable, concise, and professional. P9 Nodes provides high-performance private infrastructure in Frankfurt and NYC.";

export const FAQS: FAQItem[] = [
  {
    question: "How does the token-gated access work?",
    answer: "Access to the P9 Nodes infrastructure is exclusively available to holders of our NFT License. You must purchase a P9 Node NFT from a secondary marketplace like Tensor or Magic Eden. Once you hold the NFT in your wallet, you can connect to our dashboard to view your private endpoints instantly. No setup required."
  },
  {
    question: "What is the complete pricing structure?",
    answer: "The cost is twofold: First, the one-time acquisition cost of the NFT License on the secondary market (price varies based on supply and demand). Second, a monthly renewal fee of 400 USDC is required to keep your node access active. This fee covers hardware maintenance and bandwidth costs."
  },
  {
    question: "What makes Octopus Mode faster than standard RPCs?",
    answer: "Octopus Mode acts as a specialized blockchain CDN. Instead of sending transactions directly to the current leader (who might be overwhelmed), our architecture routes your traffic through our internal high-speed private network directly to the next scheduled leaders and key validators. This minimizes jitter and significantly increases the probability of landing in the next block."
  },
  {
    question: "Do you support Yellowstone gRPC and Geyser?",
    answer: "Yes, all plans include full access to Yellowstone gRPC and Geyser plugins. You can subscribe to account updates, slot updates, and transaction streams with a limit of up to 600 pubkeys and 3 simultaneous connections, making it perfect for trading bots and indexers."
  },
  {
    question: "Why use private hardware over cloud providers?",
    answer: "Cloud providers (AWS, GCP) often introduce virtualization latency and 'noisy neighbor' issues. We own and operate bare-metal servers in Frankfurt and NYC—strategically located next to major validator clusters. This physical proximity ensures the lowest possible ping times to the network backbone."
  },
  {
    question: "Can I resell my access?",
    answer: "Yes. Since access is tied to the NFT, you can sell your P9 Node NFT on any marketplace at any time. The new owner will inherit the right to access the infrastructure, though they will need to maintain the monthly renewal fee."
  }
];