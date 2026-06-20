export const project_detail = [
  {
    id: 1,
    title: "Asnaro - E-Commerce Platform",
    category: "Full-Stack Development",
    description:
      "Asnaro is a specialized Japanese e-commerce platform designed to streamline the rental and listing of industrial machines. The platform enables companies to list their equipment during off-seasons and manage high-demand orders efficiently during peak periods. Built with scalability and user experience in mind, Asnaro bridges the gap between machine owners and renters, offering a seamless interface for inventory management, booking, and logistics tailored to the needs of the Japanese market.",
    image: "/asnaro-hero.png",
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Express.js",
      "TypeScript",
      "Aws",
      "Docker",
    ],
    status: "Completed",
    liveUrl: "https://asnaro.co.jp/",
    githubUrl: "https://github.com/IamSanjayGawai/asnaro-webapp",
    features: [
      "User registration and authentication",
      "Product catalog with search and filtering",
      "User-friendly dashboard for equipment listing and availability tracking",
      "Secure payment processing",
      "Order tracking and history",
      "Admin dashboard for inventory management",
      "Responsive design for all devices",
      "Email notifications for orders",
      "Real-time chat support for users",
      "MultiVendor support for multiple machine owners",
      "Real time qoutation system seller can sent qoutation to buyer",
      "Real time pdf chat system for buyer and seller",
      "Refund and cancellation system",
      "Rating and review system for buyers and sellers",
    ],
    technologies: {
      Frontend: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Axios",
        "React Query",
        "React-Hook-Form",
        "React-Toastify",
        "Lazy Load",
        "React Router",
        "React-Dropzone",
        "Drag and Drop",
      ],
      Backend: ["Node.js", "Express", "JWT", "Bcrypt"],
      Database: ["MongoDB", "Mongoose"],
      Payment: ["GMO Payment API"],
      Deployment: ["AWS", "MongoDB Atlas", "Render", "Digital Ocean"],
      Other: ["Docker", "Git", "Postman", "VS Code", "Figma"],
    },
    challenges: [
      {
        title: "Payment Security",
        description:
          "Implementing secure payment processing while maintaining a smooth user experience.",
        solution:
          "Used GMO's secure payment APIs with proper error handling and validation.",
      },
      {
        title: "Performance Optimization",
        description:
          "Managing large product catalogs without compromising page load speeds.",
        solution:
          "Implemented lazy loading, pagination, and image optimization techniques.",
      },
    ],
    projectImages: [
      { src: "/asnaro-home.png", alt: "Home Page", name: "Home Page" },
      { src: "/asnaro-reg.png", alt: "Registration", name: "Registration" },
      { src: "/asnaro-login.png", alt: "Login Page", name: "Login Page" },
      {
        src: "/asnaro-transaction.png",
        alt: "Transaction Page",
        name: "Transaction Page",
      },
      { src: "/asnaro-refund.png", alt: "Refund Page", name: "Refund Page" },
      { src: "/asnaro-chat.png", alt: "Chat", name: "Chat" },
      {
        src: "/asnaro-company-info.png",
        alt: "Company Information",
        name: "Company Information",
      },
      {
        src: "/asnaro-qoutation.png",
        alt: "Qoutation Page",
        name: "Qoutation Page",
      },
      { src: "/asnaro-admin.png", alt: "Admin Panel", name: "Admin Panel" },
      {
        src: "/asnaro-dashboard.png",
        alt: "Seller Dashboard",
        name: "Seller Dashboard",
      },
      { src: "/asnaro-product.png", alt: "Product Page", name: "Product Page" },
      { src: "/asnaro-dashboard.png", alt: "Dashboard", name: "Dashboard" },
      {
        src: "/asnaro-terms.png",
        alt: "Terms and Conditions",
        name: "Terms and Conditions",
      },
      {
        src: "/asnaro-privacy.png",
        alt: "Privacy Policy",
        name: "Privacy Policy",
      },
      { src: "/asnaro-contact.png", alt: "Contact Us", name: "Contact Us" },
      { src: "/asnaro-about.png", alt: "About Us", name: "About Us" },
      { src: "/asnaro-review.png", alt: "FAQ", name: "FAQ" },
    ],
  },

  {
    id: 2,
    title: "Toads - Educational Platform",
    category: "Full-Stack Development",
    description:
      "Toads is an innovative educational platform designed to enhance the learning experience for students and educators. It offers a comprehensive suite of tools for course management, student engagement, and performance tracking. The platform supports various educational formats, including online courses, live classes, and interactive quizzes, making it a versatile solution for modern education needs.",
    image: "/toads-hero.png",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Hostinger",
      "Render",
    ],
    status: "Completed",
    liveUrl: "https://toadspcmc.com/",
    githubUrl: "",
    features: [
      "Smooth user interaction and animations",
      "Seamless user registration for courses",
      "Interactive quizzes and assessments",
      "Multipage website with multiple sections",
      "Delivered with a modern, responsive design",
      "Optimized for performance and SEO",
      "Added Parallax effects for visual appeal",
      "Integrated Google Maps for location-based services",
    ],
    technologies: {
      Frontend: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      Backend: ["Node.js", "Express"],
      Database: ["MongoDB", "Mongoose"],
      Deployment: ["Hostinger", "Render"],
    },
    challenges: [
  {
    title: 'Responsive Design Across Devices',
    description: 'Creating a consistent and intuitive UI for various screen sizes was a major hurdle, especially when components broke on tablets or smaller phones.',
    solution: 'Adopted mobile-first design using Tailwind CSS and implemented a flexible grid system with breakpoints and percentage-based layouts.'
  },
  {
    title: 'UI Performance Optimization',
    description: 'Heavy animations and too many DOM nodes caused slow rendering and janky scroll behavior, especially on low-end devices.',
    solution: 'Optimized animations with Framer Motion and GSAP, used lazy-loading for components, and minimized unnecessary re-renders using `React.memo` and `useCallback`.'
  },
    ],
    projectImages: [
      { src: "/toads-home.png", alt: "Home Page", name: "Home Page" },
      { src: "/toads-reg.png", alt: "Registration", name: "Registration" },
      { src: "/toads-courses.png", alt: "Courses", name: "Courses" },
      {
        src: "/toads-courses-detail.png",
        alt: "Courses Detail",
        name: "Courses Detail",
      },
      { src: "/toads-award.png", alt: "Awards", name: "Awards" },
      { src: "/toads-partners.png", alt: "Partners", name: "Partners" },
    ],
  },

  {
    id: 3,
    title: "BrandWave - Design and Digital Agency",
    category: "Landing Page",
    description:
      "Designing & Digital Agency ",
    image: "brandwave.png",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Typescript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Hostinger",
      "Render",
    ],
    status: "Completed",
    liveUrl: "https://brandwave-cyan.vercel.app/",
    githubUrl: "",
    features: [
      "Smooth user interaction and animations",
      "Seamless user registration for courses",
      "Interactive quizzes and assessments",
      "Multipage website with multiple sections",
      "Delivered with a modern, responsive design",
      "Optimized for performance and SEO",
      "Added Parallax effects for visual appeal",
      "Integrated Google Maps for location-based services",
    ],
    technologies: {
      Frontend: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      Backend: ["Node.js", "Express"],
      Database: ["MongoDB", "Mongoose"],
      Deployment: ["Hostinger", "Render"],
    },
    challenges: [
  {
    title: 'Mobile Responsiveness',
    description: 'Users reported poor experience on mobile devices due to layout issues and slow load times.',
    solution: 'Redesigned the frontend using Tailwind CSS and mobile-first design principles, improving UX across screen sizes.'
  },
  {
    title: 'Deployment Challenges',
    description: 'During initial deployment to platforms like Render, issues like environment variables, start commands, and build scripts caused repeated downtime.',
    solution: 'Streamlined deployment with proper `.env` handling, fallback defaults, and standardized `start`/`build` scripts in `package.json`.'
  }
    ],
    projectImages: [
      { src: "/brandwave-hero.png", alt: "Home Page", name: "Home Page" },


    ],
  },
  
  {
    id: 4,
    title: "Fake Clients - AI-Powered Client Generation",
    category: "Full-Stack Development",
    description:
      "Fake Clients is an innovative platform designed to streamline the process of generating realistic client profiles for testing and development purposes. It leverages AI technology to create diverse and dynamic client personas, making it easier for developers to simulate real-world scenarios.",
    image: "/fake-client.png",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Hostinger",
      "Render",
    ],
    status: "In Development",
    liveUrl: "#",
    githubUrl: "",
    features: [
      "Smooth user interaction and animations",
      "Seamless user registration for courses",
      "Interactive quizzes and assessments",
      "Multipage website with multiple sections",
      "Delivered with a modern, responsive design",
      "Optimized for performance and SEO",
      "Added Parallax effects for visual appeal",
      "Integrated Google Maps for location-based services",
    ],
    technologies: {
      Frontend: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      Backend: ["Node.js", "Express"],
      Database: ["MongoDB", "Mongoose"],
      Deployment: ["Hostinger", "Render"],
    },
    challenges: [
  {
    title: 'Mobile Responsiveness',
    description: 'Users reported poor experience on mobile devices due to layout issues and slow load times.',
    solution: 'Redesigned the frontend using Tailwind CSS and mobile-first design principles, improving UX across screen sizes.'
  },
  {
    title: 'Deployment Challenges',
    description: 'During initial deployment to platforms like Render, issues like environment variables, start commands, and build scripts caused repeated downtime.',
    solution: 'Streamlined deployment with proper `.env` handling, fallback defaults, and standardized `start`/`build` scripts in `package.json`.'
  }
    ],
    projectImages: [
      { src: "/toads-home.png", alt: "Home Page", name: "Home Page" },
      { src: "/toads-reg.png", alt: "Registration", name: "Registration" },
      { src: "/toads-courses.png", alt: "Courses", name: "Courses" },
      {
        src: "/toads-courses-detail.png",
        alt: "Courses Detail",
        name: "Courses Detail",
      },
      { src: "/toads-award.png", alt: "Awards", name: "Awards" },
      { src: "/toads-partners.png", alt: "Partners", name: "Partners" },
    ],
  },

  {
    id: 5,
    title: "FunZo - Live Streaming & Social Media Platform",
    category: "Full-Stack Development",
    description:
      "FunZo is a cutting-edge live streaming and social media platform that combines entertainment, social interaction, and gamification. The platform features live streaming capabilities, interactive battles, party rooms, and a comprehensive admin panel for managing users, streamers, revenue, and platform analytics. Built with modern technologies, FunZo provides a seamless experience for both content creators and viewers.",
    image: "/funzo-hero.png",
    tags: [
      "React",
      "React Native",
      "Node.js",
      "MongoDB",
      "Express.js",
      "TypeScript",
      "Tailwind CSS",
      "Socket.io",
      "WebRTC",
      "AWS",
    ],
    status: "Completed",
    liveUrl: "#",
    githubUrl: "",
    features: [
      "Live streaming with real-time video broadcasting",
      "Interactive battle system for streamers",
      "Party room feature for group interactions",
      "User management system with profiles and followers",
      "Streamer management dashboard",
      "Coins & revenue tracking system",
      "Withdrawal request management",
      "Leaderboard system with rankings",
      "Reports & analytics dashboard",
      "Real-time chat and messaging",
      "Notification system",
      "Mobile app for iOS and Android",
      "Admin panel with comprehensive controls",
      "Secure payment integration",
      "Content moderation tools",
    ],
    technologies: {
      Frontend: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "React Router",
        "Framer Motion",
        "Axios",
        "React Query",
      ],
      Mobile: [
        "React Native",
        "Expo",
        "Native Base",
        "React Navigation",
      ],
      Backend: [
        "Node.js",
        "Express.js",
        "Socket.io",
        "JWT",
        "Bcrypt",
        "Multer",
      ],
      Database: [
        "MongoDB",
        "Mongoose",
        "Redis",
      ],
      Streaming: [
        "WebRTC",
        "RTMP",
        "HLS",
      ],
      Deployment: [
        "AWS",
        "EC2",
        "S3",
        "CloudFront",
      ],
      Other: [
        "Docker",
        "Git",
        "Postman",
        "VS Code",
      ],
    },
    challenges: [
      {
        title: "Real-time Streaming Performance",
        description:
          "Implementing low-latency live streaming with high-quality video while maintaining smooth performance across different network conditions.",
        solution:
          "Utilized WebRTC for peer-to-peer connections and implemented adaptive bitrate streaming with HLS fallback for better compatibility and performance.",
      },
      {
        title: "Scalability for Concurrent Users",
        description:
          "Handling thousands of concurrent live streams and viewers without performance degradation or server overload.",
        solution:
          "Implemented Redis for caching, load balancing with AWS, and optimized database queries with proper indexing. Used Socket.io rooms for efficient real-time communication.",
      },
      {
        title: "Mobile App Performance",
        description:
          "Ensuring smooth video playback and real-time interactions on mobile devices with varying hardware capabilities.",
        solution:
          "Optimized React Native components, implemented lazy loading, used native video players, and added proper error handling and retry mechanisms for network issues.",
      },
    ],
    projectImages: [
      { src: "/funzo-mobile-home.png", alt: "FunZo Mobile App - Home Screen", name: "FunZo Mobile App" },
      { src: "/funzo-mobile-live.png", alt: "FunZo Mobile App - Live Streaming", name: "FunZo Mobile App - Live" },
      { src: "/funzo-website.png", alt: "FunZo Website", name: "FunZo Website" },
      { src: "/funzo-admin-dashboard.png", alt: "FunZo Admin Panel - Dashboard", name: "FunZo Admin Panel" },
      { src: "/funzo-admin-users.png", alt: "FunZo Admin Panel - User Management", name: "FunZo Admin Panel - Users" },
      { src: "/funzo-admin-streamers.png", alt: "FunZo Admin Panel - Streamer Management", name: "FunZo Admin Panel - Streamers" },
      { src: "/funzo-admin-revenue.png", alt: "FunZo Admin Panel - Revenue Dashboard", name: "FunZo Admin Panel - Revenue" },
    ],
  },

  {
    id: 6,
    title: "Trustline Fintech - Financial Consultancy Platform",
    category: "Full-Stack Development",
    description:
      "Trustline Fintech is a comprehensive financial consultancy platform that connects borrowers with lenders, offering quick loan processing with minimal documentation. The platform features a modern desktop website for marketing and partner acquisition, along with a mobile application for channel partners to manage loan applications, track earnings, and interact with customers. Built to handle low CIBIL score cases and provide seamless financial solutions.",
    image: "/trustline-hero.png",
    tags: [
      "React",
      "React Native",
      "Node.js",
      "MongoDB",
      "Express.js",
      "TypeScript",
      "Tailwind CSS",
      "AWS",
      "Payment Gateway",
    ],
    status: "Completed",
    liveUrl: "#",
    githubUrl: "",
    features: [
      "Responsive desktop website with modern UI/UX",
      "Mobile app for channel partners",
      "Loan application management system",
      "Customer management dashboard",
      "Earnings tracking (current month & lifetime)",
      "Product catalog management",
      "KYC document management",
      "EMI calculator and tracking",
      "Search functionality for loan applications",
      "Partner registration and onboarding",
      "Real-time application status updates",
      "Revenue and commission tracking",
      "Secure document upload and storage",
      "Multi-lender integration",
      "Notification system",
    ],
    technologies: {
      Frontend: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "React Router",
        "Framer Motion",
        "Axios",
        "React Query",
        "React Hook Form",
      ],
      Mobile: [
        "React Native",
        "Expo",
        "React Navigation",
        "AsyncStorage",
      ],
      Backend: [
        "Node.js",
        "Express.js",
        "JWT",
        "Bcrypt",
        "Multer",
        "Nodemailer",
      ],
      Database: [
        "MongoDB",
        "Mongoose",
      ],
      Payment: [
        "Razorpay",
        "Payment Gateway API",
      ],
      Deployment: [
        "AWS",
        "EC2",
        "S3",
        "Vercel",
      ],
      Other: [
        "Git",
        "Postman",
        "VS Code",
        "Figma",
      ],
    },
    challenges: [
      {
        title: "Multi-lender Integration",
        description:
          "Integrating with multiple lenders' APIs while maintaining a unified user experience and handling different response formats and requirements.",
        solution:
          "Created a unified API abstraction layer that normalizes different lender responses, implemented proper error handling, and used a queue system for processing applications to multiple lenders simultaneously.",
      },
      {
        title: "Document Security & Compliance",
        description:
          "Ensuring secure storage and handling of sensitive financial documents while maintaining compliance with financial regulations.",
        solution:
          "Implemented encrypted file storage on AWS S3, added role-based access control, implemented audit logging, and ensured all data transmission uses HTTPS with proper authentication.",
      },
      {
        title: "Low CIBIL Score Processing",
        description:
          "Creating a system that can handle loan applications with low CIBIL scores and match them with appropriate lenders.",
        solution:
          "Developed a smart matching algorithm that considers multiple factors beyond CIBIL score, including income, employment history, and alternative credit data. Implemented a lender preference system that routes applications to lenders more likely to approve low CIBIL cases.",
      },
    ],
    projectImages: [
      { src: "/trustline-mobile-dashboard.png", alt: "Trustline Mobile App - Dashboard", name: "Trustline Mobile App" },
      { src: "/trustline-mobile-earnings.png", alt: "Trustline Mobile App - Earnings", name: "Trustline Mobile App - Earnings" },
      { src: "/trustline-mobile-products.png", alt: "Trustline Mobile App - Products", name: "Trustline Mobile App - Products" },
      { src: "/trustline-mobile-customers.png", alt: "Trustline Mobile App - Customers", name: "Trustline Mobile App - Customers" },
      { src: "/trustline-mobile-kyc.png", alt: "Trustline Mobile App - KYC", name: "Trustline Mobile App - KYC" },
      { src: "/trustline-desktop-hero.png", alt: "Trustline Website - Home Page", name: "Trustline Website" },
      { src: "/trustline-admin-dashboard.png", alt: "Trustline Admin Panel - Dashboard", name: "Trustline Admin Panel" },
    ],
  },

  {
    id: 7,
    title: "FunZo Landing Page - Marketing Website",
    category: "Frontend Development",
    description:
      "A modern, responsive landing page for FunZo platform designed to attract users and showcase the platform's features. Built with React and modern UI/UX principles, featuring smooth animations, interactive elements, and optimized for conversions.",
    image: "/funzo-website.png",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive Design",
    ],
    status: "Completed",
    liveUrl: "#",
    githubUrl: "",
    features: [
      "Modern and responsive design",
      "Smooth animations and transitions",
      "Interactive hero section",
      "Feature showcase sections",
      "Call-to-action optimization",
      "SEO optimized",
      "Fast loading performance",
      "Mobile-first approach",
    ],
    technologies: {
      Frontend: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
      ],
      Deployment: ["Vercel", "AWS"],
      Other: ["Git", "VS Code", "Figma"],
    },
    challenges: [
      {
        title: "Performance Optimization",
        description:
          "Ensuring fast load times while maintaining rich animations and interactive elements.",
        solution:
          "Implemented code splitting, lazy loading, and optimized images. Used CSS animations where possible and minimized JavaScript bundle size.",
      },
    ],
    projectImages: [
      { src: "/funzo-website-hero.png", alt: "FunZo Landing Page - Hero Section", name: "FunZo Landing Page" },
      { src: "/funzo-website-features.png", alt: "FunZo Landing Page - Features", name: "FunZo Landing Page - Features" },
      { src: "/funzo-website-about.png", alt: "FunZo Landing Page - About", name: "FunZo Landing Page - About" },
    ],
  },

  {
    id: 8,
    title: "FunZo Admin Panel - Management Dashboard",
    category: "Full-Stack Development",
    description:
      "Comprehensive admin panel for managing the FunZo platform, including user management, streamer oversight, revenue tracking, withdrawal requests, leaderboards, and detailed analytics. Built with React and Redux Toolkit for efficient state management.",
    image: "/funzo-admin-dashboard.png",
    tags: [
      "React",
      "Redux Toolkit",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Chart.js",
    ],
    status: "Completed",
    liveUrl: "#",
    githubUrl: "",
    features: [
      "Comprehensive dashboard with key metrics",
      "User management system",
      "Streamer management and oversight",
      "Coins & revenue tracking",
      "Withdrawal request management",
      "Leaderboard system",
      "Reports & analytics dashboard",
      "Real-time data updates",
      "Role-based access control",
      "Export functionality for reports",
    ],
    technologies: {
      Frontend: [
        "React",
        "Redux Toolkit",
        "TypeScript",
        "Tailwind CSS",
        "Chart.js",
        "React Query",
        "Axios",
      ],
      Backend: [
        "Node.js",
        "Express.js",
        "JWT",
        "Socket.io",
      ],
      Database: [
        "MongoDB",
        "Mongoose",
      ],
      Other: ["Git", "Postman", "VS Code"],
    },
    challenges: [
      {
        title: "Real-time Data Updates",
        description:
          "Keeping admin dashboard data synchronized with live platform activities in real-time.",
        solution:
          "Implemented Socket.io for real-time updates and React Query for efficient data fetching and caching.",
      },
      {
        title: "Complex State Management",
        description:
          "Managing complex state for multiple admin features including filters, pagination, and data updates.",
        solution:
          "Used Redux Toolkit for centralized state management with proper action creators and reducers for each feature module.",
      },
    ],
    projectImages: [
      { src: "/funzo-admin-dashboard.png", alt: "FunZo Admin Panel - Dashboard", name: "FunZo Admin Panel" },
      { src: "/funzo-admin-users.png", alt: "FunZo Admin Panel - User Management", name: "FunZo Admin Panel - Users" },
      { src: "/funzo-admin-streamers.png", alt: "FunZo Admin Panel - Streamer Management", name: "FunZo Admin Panel - Streamers" },
      { src: "/funzo-admin-revenue.png", alt: "FunZo Admin Panel - Revenue Dashboard", name: "FunZo Admin Panel - Revenue" },
      { src: "/funzo-admin-withdrawals.png", alt: "FunZo Admin Panel - Withdrawals", name: "FunZo Admin Panel - Withdrawals" },
      { src: "/funzo-admin-leaderboard.png", alt: "FunZo Admin Panel - Leaderboard", name: "FunZo Admin Panel - Leaderboard" },
      { src: "/funzo-admin-analytics.png", alt: "FunZo Admin Panel - Analytics", name: "FunZo Admin Panel - Analytics" },
    ],
  },

  {
    id: 9,
    title: "Trustline Admin Panel - Financial Management",
    category: "Full-Stack Development",
    description:
      "Admin panel for Trustline Fintech platform enabling comprehensive management of loan applications, customer data, partner activities, KYC documents, and financial transactions. Features role-based access for different admin levels.",
    image: "/trustline-admin-dashboard.png",
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    status: "Completed",
    liveUrl: "#",
    githubUrl: "",
    features: [
      "Loan application management",
      "Customer data management",
      "Partner activity tracking",
      "KYC document verification",
      "Financial transaction oversight",
      "Role-based access control",
      "Multi-lender management",
      "Reports and analytics",
      "Document management system",
      "Audit logging",
    ],
    technologies: {
      Frontend: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Query",
      ],
      Backend: [
        "Node.js",
        "Express.js",
        "JWT",
        "Argon2",
      ],
      Database: [
        "MongoDB",
        "Mongoose",
      ],
      Other: ["Git", "Postman", "VS Code"],
    },
    challenges: [
      {
        title: "Document Security",
        description:
          "Ensuring secure handling and storage of sensitive financial documents while maintaining compliance.",
        solution:
          "Implemented encrypted file storage on AWS S3 with role-based access control and comprehensive audit logging.",
      },
      {
        title: "Multi-role Management",
        description:
          "Managing different admin roles (Admin, ASM, RM) with varying access levels and permissions.",
        solution:
          "Created a flexible role-based access control system with granular permissions for each role and feature.",
      },
    ],
    projectImages: [
      { src: "/trustline-admin-dashboard.png", alt: "Trustline Admin Panel - Dashboard", name: "Trustline Admin Panel" },
      { src: "/trustline-admin-loans.png", alt: "Trustline Admin Panel - Loan Management", name: "Trustline Admin Panel - Loans" },
      { src: "/trustline-admin-customers.png", alt: "Trustline Admin Panel - Customer Management", name: "Trustline Admin Panel - Customers" },
      { src: "/trustline-admin-partners.png", alt: "Trustline Admin Panel - Partner Management", name: "Trustline Admin Panel - Partners" },
    ],
  },
  {
    id: 10,
    title: "DhanSource Capital — Channel Partner App",
    category: "Mobile App Development · Fintech",
    description:
      "DhanSource Capital is a fintech company providing loan distribution services through channel partners. I built the Channel Partner mobile app using React Native (Expo), enabling partners to onboard customers, submit KYC documents, generate dynamic loan agreements as PDFs, and track loan disbursement status in real time. The app streamlines the entire loan lifecycle from lead capture to document signing and disbursement tracking.",
    image: "/dhansource/dhansource-1.jpeg",
    tags: [
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "pdf-lib",
      "AWS S3",
    ],
    status: "Live on Play Store",
    liveUrl: "https://play.google.com/store/apps/details?id=com.dhansourcecapital.partner&pcampaignid=web_share",
    websiteUrl: "https://dhansourcecapital.com/Home",
    githubUrl: "",
    features: [
      "Channel partner registration & onboarding flow",
      "Customer lead capture with document upload (Aadhaar, PAN, etc.)",
      "Automated KYC verification pipeline",
      "Dynamic PDF agreement generation using pdf-lib with e-signature support",
      "Real-time loan status tracking and notifications via Socket.IO",
      "Admin panel for managing partners, leads, and disbursements",
      "Multi-level role-based access control (Partner, RM, Admin)",
      "Push notifications for loan status changes",
      "Document storage & retrieval via AWS S3",
      "Analytics dashboard for partner performance metrics",
    ],
    technologies: {
      "Mobile App": [
        "React Native (Expo)",
        "Expo Router",
        "React Hook Form",
        "AsyncStorage",
        "Expo Document Picker",
        "Expo Camera",
      ],
      Backend: [
        "Node.js",
        "Express.js",
        "JWT Authentication",
        "Socket.IO",
        "pdf-lib (PDF generation)",
        "Multer (File uploads)",
      ],
      Database: ["MongoDB", "Mongoose"],
      Cloud: ["AWS S3 (Document Storage)", "Firebase Cloud Messaging"],
      Other: ["Git", "Postman", "Google Play Console", "VS Code"],
    },
    challenges: [
      {
        title: "Dynamic PDF Generation with E-Signatures",
        description:
          "Generating legally compliant loan agreement PDFs dynamically with partner and customer details pre-filled, including signature fields.",
        solution:
          "Used pdf-lib to programmatically construct PDF documents from templates, embedding dynamic text, images (signatures), and QR codes. The PDFs are generated server-side and stored on AWS S3 with secure access links.",
      },
      {
        title: "Automated KYC Pipeline",
        description:
          "Building a reliable KYC document verification pipeline that handles multiple document types with validation and status tracking.",
        solution:
          "Implemented a multi-step KYC flow with document type validation, image quality checks, and status state machine (Pending → Under Review → Approved/Rejected) with real-time Socket.IO notifications to partners.",
      },
      {
        title: "Offline-First Data Handling",
        description:
          "Partners often work in areas with poor connectivity, requiring the app to handle form data and document uploads gracefully offline.",
        solution:
          "Used AsyncStorage for local form data persistence and implemented a queue-based upload system that syncs documents when connectivity is restored, with conflict resolution for concurrent updates.",
      },
    ],
    projectImages: [
      { src: "/dhansource/dhansource-1.jpeg", alt: "DhanSource Partner App - Login", name: "Partner Login" },
      { src: "/dhansource/dhansource-2.jpeg", alt: "DhanSource Partner App - Dashboard", name: "Partner Dashboard" },
      { src: "/dhansource/dhansource-3.jpeg", alt: "DhanSource Partner App - KYC Flow", name: "KYC Document Flow" },
      { src: "/dhansource/dhansource-4.jpeg", alt: "DhanSource Partner App - Loan Tracking", name: "Loan Status Tracking" },
    ],
  },
  {
    id: 11,
    title: "RingBuzz - Social Economy Platform",
    category: "Mobile App Development · WebRTC · FinTech",
    description:
      "RingBuzz is an innovative social economy platform built around a dual-token virtual ledger system and real-time communication. It allows users to connect via high-quality WebRTC 1-on-1 audio and video calls, exchange virtual gifts, and participate in a micro-economy. The platform secures all transactions through robust database-level constraints and Row-Level Security (RLS) triggers, ensuring absolute ledger integrity across recharge, gifting, and withdrawal operations.",
    image: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.56 PM.jpeg",
    tags: [
      "React Native",
      "PostgreSQL",
      "WebRTC",
      "Redis",
      "Supabase",
      "GetStream SDK",
    ],
    status: "Completed",
    liveUrl: "#",
    githubUrl: "",
    features: [
      "1-on-1 audio and video calling powered by WebRTC and GetStream SDK",
      "Dual-token virtual ledger economy for secure in-app transactions",
      "Virtual gifting system during live interactions",
      "Real-time ledger updates with transactions logged on Supabase",
      "Row-Level Security (RLS) policies to prevent transaction fraud",
      "Recharge and wallet management module",
      "Streamlined withdrawal flow for content creators",
      "Interactive and smooth UI built with React Native",
      "High-performance messaging and notification system",
    ],
    technologies: {
      "Mobile App": [
        "React Native",
        "Expo",
        "TypeScript",
        "Tailwind CSS",
        "GetStream SDK",
      ],
      Backend: [
        "Node.js",
        "Express.js",
        "Supabase (Serverless)",
        "PostgreSQL RLS Triggers",
      ],
      Database: [
        "PostgreSQL (Supabase)",
        "Redis (Caching & Sessions)",
      ],
      "Real-Time": [
        "WebRTC",
        "Socket.IO",
      ],
      Other: [
        "Git",
        "Postman",
        "VS Code",
      ],
    },
    challenges: [
      {
        title: "Transaction Integrity & Fraud Prevention",
        description:
          "Preventing double-spending or unauthorized balance modifications in the dual-token virtual ledger.",
        solution:
          "Implemented database-level Row-Level Security (RLS) triggers on PostgreSQL, combined with transactional database queries, ensuring that every debit has a corresponding credit and no balance updates can bypass the API layer.",
      },
      {
        title: "Low-Latency Real-Time Calling",
        description:
          "Ensuring low-latency, stable audio/video calls under varying network conditions on mobile devices.",
        solution:
          "Used GetStream SDK alongside native WebRTC capabilities to optimize connection routing and adapt video/audio quality dynamically based on client bandwidth.",
      },
      {
        title: "Real-Time Ledger Updates",
        description:
          "Reflecting gift transactions and wallet updates instantly during calls without blocking the UI.",
        solution:
          "Utilized Redis for lightweight session caching and instant Pub/Sub notifications, ensuring wallet states update sub-100ms in active rooms.",
      },
    ],
    projectImages: [
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.56 PM.jpeg", alt: "RingBuzz - Splash", name: "Splash Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.56 PM (1).jpeg", alt: "RingBuzz - Login", name: "Login Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.58 PM.jpeg", alt: "RingBuzz - Feed", name: "Feed Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.58 PM (1).jpeg", alt: "RingBuzz - Profile", name: "Profile Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.58 PM (2).jpeg", alt: "RingBuzz - Search", name: "Search Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.59 PM.jpeg", alt: "RingBuzz - Video Call", name: "Video Call Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.59 PM (1).jpeg", alt: "RingBuzz - Audio Call", name: "Audio Call Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.06.00 PM.jpeg", alt: "RingBuzz - Wallet", name: "Wallet Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.06.00 PM (1).jpeg", alt: "RingBuzz - Gifting", name: "Gifting Screen" },
      { src: "/ringbuzz/WhatsApp Image 2026-06-19 at 4.06.00 PM (2).jpeg", alt: "RingBuzz - History", name: "Transaction History" },
    ],
  },
];

