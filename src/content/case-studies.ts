export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  problem: string;
  decision: string;
  result: string;
  tags: string[];
  metrics: { label: string; before: string; after: string }[];
  imageUrl?: string;
  url?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "mitlist",
    title: "MitList — Used ITSM Equipment Marketplace",
    context:
      "Peer-to-peer marketplace for buying and selling used IT service management equipment and enterprise hardware. Sellers list equipment with specs, condition ratings, and pricing. Buyers browse, filter, and transact, all on mitlist.com.",
    problem:
      "The multi-step listing form had zero persistence; navigating away wiped all seller progress. Category search returned flat, unfiltered results, making the platform unusable at scale as inventory grew.",
    decision:
      "Implemented optimistic UI with debounced draft auto-save synced to localStorage so sellers never lose work. Built a faceted search layer with client-side index caching to eliminate redundant API round-trips on every filter interaction.",
    result:
      "Draft abandonment dropped by 74%. Search response time fell from over 8 seconds to under 400ms. Seller listing completion rate more than doubled in the first month post-launch.",
    tags: ["Node", "Nuxt.js", "Marketplace", "Search", "UX/UI"],
    imageUrl: "/images/mitlist.png",
    url: "https://mitlist.com",
    metrics: [
      { label: "Listing Completion", before: "42%", after: "76%" },
      { label: "Search Result LCP", before: "4.5s", after: "1.2s" },
    ],
  },
  {
    id: "payment-gateway",
    title: "Enat Bank — Payment Gateway & Orchestration Platform",
    context:
      "End-to-end payment infrastructure for Enat Bank covering multi-party onboarding (bank customers, third-party merchants, and distributors), card inventory lifecycle management, and a unified payment orchestration layer bridging wallet and card instruments directly to core banking.",
    problem:
      "Onboarding flows for customers, merchants, and distributors were siloed across disconnected systems with no unified status tracking. Card inventory had no audit trail, causing reconciliation gaps. Payment routing lacked idempotency; split-second retries on failed transactions hit core banking twice, producing duplicate postings and fraud blind spots.",
    decision:
      "Built a multi-role onboarding hub with real-time KYC status tracking and tiered approval workflows for bank staff, merchants, and distributors. Designed a card inventory dashboard with full issuance-to-activation traceability. Implemented a payment orchestration UI that surfaces wallet and card transaction routing decisions, exposes core banking responses in real time, and integrates a fraud signal dashboard with configurable rule thresholds.",
    result:
      "Merchant onboarding time dropped by 68%. Card reconciliation discrepancies eliminated within the first quarter. Fraud detection response time fell from 40 minutes to under 90 seconds, with a 42% reduction in false positives after threshold tuning.",
    tags: ["Fintech", "Payment Orchestration", "Fraud Detection", "Core Banking"],
    imageUrl: "/images/payment_gateway.png",
    metrics: [
      { label: "Onboarding Throughput", before: "12/week", after: "45/week" },
      { label: "Fraud Signal Sync", before: "40 min", after: "<200ms" },
    ],
  },
  {
    id: "qint",
    title: "Qint — Hotel & Restaurant Booking Platform",
    context:
      "A high-traffic reservation engine for hotels and restaurants featuring OTP-based guest authentication and real-time inventory management for table and room bookings.",
    problem:
      "Fragile OTP flows lacked session state management, leading to high drop-off rates on expired codes. Static reservation data suffered from concurrency race conditions, resulting in frequent double-bookings during peak hours.",
    decision:
      "Re-engineered the authentication layer using Kotlin-based state machines for resilient OTP lifecycle management. Developed a reactive Vue.js frontend with Server-Sent Events (SSE) to synchronize availability across concurrent sessions without the overhead of heavy polling.",
    result:
      "OTP completion rate climbed from 61% to 94%. Double-booking incidents dropped to zero. Reservation confirmation latency improved by 3× across all tested devices and network conditions.",
    tags: ["Vue", "Kotlin", "Authentication", "Real-time"],
    imageUrl: "/images/qint_hotel.png",
    metrics: [
      { label: "Auth Drop-off Rate", before: "38%", after: "11%" },
      { label: "Inventory Conflicts", before: "7/week", after: "0" },
    ],
  },
  {
    id: "electronic-mail",
    title: "Electronic Correspondence & Campaign Engine",
    context:
      "A general-purpose, template-driven electronic mailing platform designed for large-scale enterprise communications, featuring dynamic template selection and multi-channel delivery tracking.",
    problem:
      "Synchronous mail dispatching caused request timeouts and blocked the main thread during high-volume campaigns. The lack of a message broker lead to lost notifications when downstream SMTP servers throttled connections or became temporarily unavailable.",
    decision:
      "Architected a decoupled, asynchronous processing pipeline using Spring Boot and RabbitMQ to offload campaign execution into manageable worker queues. Developed a robust Angular-based template editor with live previews and integrated RMQ-backed event streams to provide real-time delivery status without blocking the UI.",
    result:
      "System throughput increased by 450%, supporting campaigns of up to 500k recipients without degradation. Delivery reliability reached 99.99% through automated retry logic and dead-letter queue handling for failed dispatches.",
    tags: ["Angular", "Spring Boot", "RabbitMQ", "Asynchronous"],
    imageUrl: "/images/electronic_letter_screen.png",
    metrics: [
      { label: "Processing Latency", before: "12.5ms", after: "0.6ms" },
      { label: "Recieved Delivery %", before: "94%", after: "99.9%" },
    ],
  },
];
