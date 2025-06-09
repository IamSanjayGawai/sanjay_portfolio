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
    title: "Fake Clients - AI-Powered Client Generation",
    category: "Full-Stack Development",
    description:
      "Fake Clients is an innovative platform designed to streamline the process of generating realistic client profiles for testing and development purposes. It leverages AI technology to create diverse and dynamic client personas, making it easier for developers to simulate real-world scenarios.",
    image: "/fake-clients-hero.png",
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
];
