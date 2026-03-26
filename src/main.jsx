export const metadata = {
  metadataBase: new URL("https://abdullahpk.site"),
  title: "Abdullah Nadeem | Full-Stack MERN Developer & React Expert",
  description:
    "Abdullah Nadeem is a Full-Stack Web Developer specializing in MERN Stack, React.js, Next.js, and TypeScript. I build high-performance, SEO-friendly web applications with clean architecture and exceptional user experiences. Hire me for your next project.",
  keywords: [
    "Abdullah Nadeem",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "Frontend Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Portfolio",
    "Hire Web Developer",
    "Freelance Developer",
  ],
  authors: [{ name: "Abdullah Nadeem", url: "https://abdullahpk.site" }],
  creator: "Abdullah Nadeem",
  publisher: "Abdullah Nadeem",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdullahpk.site",
    siteName: "Abdullah Nadeem Portfolio",
    title: "Abdullah Nadeem | Full-Stack MERN Developer & React Expert",
    description:
      "Full-Stack Web Developer specializing in MERN Stack, React.js, and Next.js. Building high-performance web applications with clean architecture.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdullah Nadeem - Full-Stack MERN Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Nadeem | Full-Stack MERN Developer",
    description:
      "Full-Stack Web Developer specializing in MERN Stack, React.js, and Next.js. Building high-performance web applications.",
    creator: "@abdullahnadeem",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://abdullahpk.site",
  },
  category: "Technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://abdullahpk.site/#person",
      name: "Abdullah Nadeem",
      jobTitle: "Full-Stack Web Developer",
      description:
        "Full-Stack Web Developer specializing in MERN Stack, React.js, Next.js, and TypeScript. Building high-performance, scalable web applications.",
      url: "https://abdullahpk.site",
      sameAs: [
        "https://github.com/ab9898998989898",
        "https://www.linkedin.com/in/abdullah-nadeem-319560285",
        "https://www.instagram.com/abdullahx__.19",
      ],
      knowsAbout: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MERN Stack",
        "Web Development",
        "Frontend Development",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://abdullahpk.site/#website",
      url: "https://abdullahpk.site",
      name: "Abdullah Nadeem Portfolio",
      description: "Portfolio of Abdullah Nadeem - Full-Stack MERN Developer",
      publisher: {
        "@id": "https://abdullahpk.site/#person",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://abdullahpk.site/#profilepage",
      url: "https://abdullahpk.site",
      name: "Abdullah Nadeem - Full-Stack Developer Portfolio",
      isPartOf: {
        "@id": "https://abdullahpk.site/#website",
      },
      about: {
        "@id": "https://abdullahpk.site/#person",
      },
      mainEntity: {
        "@id": "https://abdullahpk.site/#person",
      },
    },
  ],
};

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Chatbot } from './components/Chatbot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Chatbot />
  </StrictMode>,
)
