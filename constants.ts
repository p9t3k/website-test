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
    description: 'Hosted on bare metal infrastructure, P9 Nodes are always up to date with the newest available hardware, to ensure max speed and reliability.',
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
    question: "How does the NFT-gated access work?",
    answer: "Access to the P9 Nodes infrastructure is exclusively available to holders of our NFT License. You must purchase a P9 Node NFT from a secondary marketplace like Tensor or Magic Eden, or rent from our holders. Once you hold the NFT in your wallet, you can connect to our dashboard to view your private endpoints instantly."
  },
  {
    question: "What is the complete pricing structure?",
    answer: "Firstly, buy the NFT License on the secondary market (price varies based on the market). Once you own a license, a monthly renewal fee of 400 USDC is required to keep your node access active."
  },
  {
    question: "How many NFTs are circulation??",
    answer: "Our supply is limited to 99 renewal licenses and 6 lifetime licenses. We will never mint more than 105 NFTs."
  },
  {
    question: "Do you support Yellowstone gRPC (Geyser plugin)?",
    answer: "Yes, all plans include full access to Yellowstone gRPC (Geyser plugin). You can stream data and monitor addresses with a limit of up to 600 pubkeys and 3 simultaneous connections, making it perfect for high-frequency trading."
  },
  {
    question: "Do you own the infra?",
    answer: "Yes, we own most of the bare-metal servers we operate, with private colocation."
  },
    {
    question: "Is P9 Nodes staked?",
    answer: "Yes, we have exclusive and full access to a considerable amount of stake on the Solana blockchain. To ensure reliability, our stake-weighted connections are private, we don't share them with others."
  },
      {
    question: "Do you support heavy calls (GetProgramAccount, etc.)?",
    answer: "Yes, we operate indexes servers dedicated on handling all the heavy RPC Calls needed. Note: these heavy calls are highly monitored. Any abuse is going to be punished with a ban."
  },
  {
    question: "Can I resell my access?",
    answer: "Yes. Since access is tied to the NFT, you can sell your P9 Node NFT on any marketplace at any time."
  }
];