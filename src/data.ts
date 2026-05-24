import { ResumeData } from './types';

export const resumeData: ResumeData = {
  basics: {
    name: "Richa Rameshkrishna",
    title: "Software Engineer | Backend & Full-Stack | ML Systems",
    summary: "Software engineer with experience building scalable systems, APIs, and production applications across healthcare, enterprise, and travel tech. Proven expertise in full-stack development (backend & frontend), cloud infrastructure, big data processing, and ML systems integration. Delivered a RAG-powered chatbot serving 500 users, built data pipelines processing 2,410 datasets with 99% accuracy, and optimized systems handling 5,000 daily requests. Strong in problem-solving, system design, cross-functional collaboration, and shipping features that drive measurable impact.",
    location: "Chicago, IL (open to relocation)",
    email: "richaramesh0220@gmail.com", // Alternate format: richaramesh2002@gmail.com is also captured!
    phone: "+1 (872) 368-3552",
    linkedin: "https://www.linkedin.com/in/richa-ramesh",
    github: "https://github.com/richa-ramesh"
  },
  experience: [
    {
      company: "Rush University Medical Center",
      role: "Software Developer",
      dates: "Aug 2025 \u2013 Present",
      location: "Chicago, IL",
      category: "industry",
      bullets: [
        "Built and shipped a data ingestion service that automated pre-processing and validation of 2,410 patient datasets, replacing a manual workflow and improving data accuracy by 50%. (Also implemented inside a Java-based workflow).",
        "Designed and deployed a REST API integrating a PyTorch LSTM model (99.3% reconstruction accuracy) with clinical dashboards, delivering real-time predictions to downstream consumers with sub-second response times.",
        "Built an automated testing framework with custom JUnit 5 assertion libraries and compliance validators, cutting manual QA time by 60% and enforcing data integrity standards across the pipeline.",
        "Architected with a modular backend with clearly separated ingestion, inference, and reporting layers, enabling new data sources to be onboarded without changes to core business logic."
      ]
    },
    {
      company: "University of Illinois Chicago",
      role: "Graduate Hourly - Teaching Assistant",
      dates: "Jan 2026 \u2013 May 2026",
      location: "Chicago, IL",
      category: "academic",
      bullets: [
        "Served as Graduate Hourly Teaching Assistant for Course - MGMT 460 Managing Globally."
      ]
    },
    {
      company: "University of Illinois Chicago",
      role: "Graduate Hourly - Capsim Coach",
      dates: "Jan 2025 \u2013 May 2026",
      location: "Chicago, IL",
      category: "academic",
      bullets: [
        "Gained proficiency in the CAPSIM business simulation platform within 2 weeks to support instructional delivery.",
        "Managed and maintained Blackboard course content, ensuring accurate and up-to-date resources for students.",
        "Held regular office hours to assist approximately 50 student groups with simulation strategy, decision-making, and performance analysis.",
        "Provided one-on-one and group-based guidance to clarify CAPSIM concepts, strategies, and technical troubleshooting.",
        "Created and delivered customized presentations, supporting faculty across various departments in effectively implementing the CAPSIM component."
      ]
    },
    {
      company: "University of Illinois Chicago",
      role: "Graduate Hourly - Teaching Assistant",
      dates: "Aug 2025 \u2013 Dec 2025",
      location: "Chicago, IL",
      category: "academic",
      bullets: [
        "Served as Graduate Hourly Teaching Assistant for Course - IDS 532 - Intro to Operations Management.",
        "Managed grading and academic coordination for a 90+ student MBA course.",
        "Maintained centralized gradebooks and communication via Blackboard.",
        "Provided consistent student support and course administration throughout the term."
      ]
    },
    {
      company: "Tata Consultancy Services",
      role: "Software Engineer",
      dates: "Jul 2025 \u2013 Aug 2025",
      location: "Chicago, IL",
      category: "industry",
      bullets: [
        "Built a full-stack enterprise chatbot using a Spring Boot backend with RESTful APIs, React frontend, and LangChain-powered RAG architecture, reducing support wait times by 40% for 500 internal users.",
        "Developed Spring Boot microservices to handle document ingestion, embedding generation, and query routing, integrating FAISS vector search with Gemini embeddings for sub-2-second response times across 10,000 documents.",
        "Implemented Spring Security for role-based access control and JWT token authentication across chatbot API endpoints, enforcing least-privilege access for different user tiers.",
        "Wrote comprehensive JUnit 5 and Mockito test suites achieving 85% code coverage across service and controller layers, reducing regression bugs in production by 30%."
      ]
    },
    {
      company: "Tata Consultancy Services",
      role: "Data Scientist Intern",
      dates: "Jan 2024 \u2013 May 2024",
      location: "Bengaluru, Karnataka, India",
      category: "internship",
      bullets: [
        "Implemented production-grade time-series forecasting system using Python (SARIMAX, ARIMAX, Holt-Winters) with automated hyperparameter tuning via grid search, achieving 95% forecast accuracy.",
        "Built intelligent chatbot using LangChain, StableLM, and custom retrieval pipeline, reducing manual document lookup time by 70% for internal teams.",
        "Developed multi-format document parser and FAISS-based indexing system, automating information retrieval across heterogeneous data sources.",
        "Optimized retrieval accuracy by 20% through embedding fine-tuning and systematic performance benchmarking."
      ]
    },
    {
      company: "iNube Software Solutions Pvt Limited",
      role: "Summer Intern",
      dates: "Jun 2022 \u2013 Jul 2022",
      location: "Bengaluru, Karnataka, India",
      category: "internship",
      bullets: [
        "Developed interactive data visualization dashboard using React.js and Google Charts, implementing drill-down functionality, custom animations, and dynamic trendlines.",
        "Built reusable React components with custom styling (colors, scales, labels) and responsive layouts for business analytics application.",
        "Collaborated with cross-functional team to deliver client requirements, ensuring on-time project completion."
      ]
    },
    {
      company: "SAM Tours and Travel",
      role: "Software Developer",
      dates: "Aug 2020 \u2013 Aug 2024",
      location: "Bangalore, India",
      category: "industry",
      bullets: [
        "Designed and developed a Spring Boot backend for the company's core booking and inventory management platform, supporting real-time availability checks across 200 tour packages with sub-second response times.",
        "Built RESTful APIs using Spring MVC consumed by both the customer-facing React web app and internal operations dashboard, handling 5,000 daily API calls with 99.5% uptime via connection pooling and caching with Redis.",
        "Implemented Hibernate/JPA ORM layer over a MySQL database, designing normalized schemas for bookings, customers, and inventory, and writing complex JPQL queries reducing report generation time by 45%.",
        "Developed an automated notification service using multithreading and a message queue to dispatch booking confirmations and reminders, processing 1,000 events per day without blocking the main request thread.",
        "Containerized the Spring Boot application using Docker, configured deployment on AWS EC2, and set up an S3 pipeline for static asset delivery, cutting deployment time from hours to under 15 minutes.",
        "Refactored legacy procedural codebase into a layered architecture (Controller / Service / Repository), improving maintainability and enabling the team to onboard new features 3x faster.",
        "Integrated Apache Spark for batch processing of booking analytics and tour performance reports, aggregating data across 200 packages from an HBase store, reducing end-of-day reporting latency by 60%."
      ]
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "RAG Support Efficiency",
      metric: "40%",
      context: "Reduced support wait times for 500 internal enterprise users using Spring Boot and LangChain chatbot.",
      type: "efficiency"
    },
    {
      id: "ach-2",
      title: "Patient Data Pipeline Accuracy",
      metric: "99%",
      context: "Successfully automated preprocessing and validation pipelines for 2,410 patient datasets, increasing data accuracy by 50%.",
      type: "accuracy"
    },
    {
      id: "ach-3",
      title: "LSTM Reconstruction Accuracy",
      metric: "99.3%",
      context: "Achieved maximum precision integrating custom PyTorch model for clinical dashboards under sub-second latency.",
      type: "accuracy"
    },
    {
      id: "ach-4",
      title: "Manual QA Reduction",
      metric: "60%",
      context: "Cut operational testing overhead with automated JUnit 5 and compliance validators running pre-deployment.",
      type: "efficiency"
    },
    {
      id: "ach-5",
      title: "Forecasting Precision",
      metric: "95%",
      context: "Achieved via production-grade SARIMAX, ARIMAX, and Holt-Winters timeseries forecasting models using Python.",
      type: "accuracy"
    },
    {
      id: "ach-6",
      title: "Report Generation Latency",
      metric: "60%",
      context: "Reduced end-of-day analytics reporting latency by aggregating 200 packages with Apache Spark and HBase.",
      type: "efficiency"
    },
    {
      id: "ach-7",
      title: "API Platform Scale",
      metric: "5,000",
      context: "Handled daily API calls with 99.5% uptime via Redis connection pooling for SAM Tours & Travel.",
      type: "growth"
    },
    {
      id: "ach-8",
      title: "Document Retrieval Time",
      metric: "\u003C2s",
      context: "Sub-2-second queries over 10,000 enterprise documents utilizing FAISS vector search and Gemini embeddings.",
      type: "efficiency"
    }
  ],
  publications: [
    {
      title: "Latent NeuroNet: A Text-Conditioned Stable Diffusion Framework for Reconstructing Visual Stimuli from fMRI",
      subtitle: "Published in major AI/ML conferences (IEEE/Springer) - Focused on interpreting fMRI visual stimulus using latent diffusion."
    },
    {
      title: "Revolutionizing Healthcare: A Review Unveiling the Transformative power of Digital Twins",
      subtitle: "Published in major AI/ML conferences (IEEE/Springer) - Detailed survey analyzing the landscape of real-time clinical modeling."
    },
    {
      title: "Leukaemia: A comparative analysis of deep learning models using ALL dataset",
      subtitle: "Published in major AI/ML conferences (IEEE/Springer) - Rigorous neural benchmark for automatic cancer cell classification."
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Java", "Python", "JavaScript", "C/C++", "SQL", "R"]
    },
    {
      category: "Backend & Cloud",
      skills: ["Microservices", "RESTful APIs", "Flask", "FastAPI", "Node.js", "Express.js", "AWS (EC2, S3, Lambda)", "Docker", "Kubernetes", "Git", "CI/CD", "Apache Spark", "Spring Boot", "Spring MVC", "Spring Security", "Hibernate/JPA", "JPQL"]
    },
    {
      category: "Frontend & Databases",
      skills: ["React", "HTML/CSS", "Bootstrap", "PostgreSQL", "MySQL", "MongoDB", "Redis", "HBase"]
    },
    {
      category: "ML / AI",
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "LangChain", "FAISS", "Pandas", "NumPy", "Gemini Embeddings", "StableLM"]
    }
  ],
  education: [
    {
      institution: "University of Illinois Chicago (UIC)",
      degree: "MS, Computer Science",
      dates: "Aug 2024 \u2013 May 2026",
      gpa: "3.88",
      location: "Chicago, IL",
      extraDetails: "Additional positions held: Graduate Hourly - Teaching Assistant (MGMT 460 & IDS 532), Capsim Graduate Coach."
    },
    {
      institution: "PES University",
      degree: "BTech, Computer Science & Engineering",
      dates: "Aug 2020 \u2013 May 2024",
      gpa: "3.79",
      location: "Bangalore, India",
    },
    {
      institution: "Deeksha Center for Learning",
      degree: "Pre-University, PCMC",
      dates: "June 2018 \u2013 March 2020",
      location: "India"
    },
    {
      institution: "The Brigade School @ JP Nagar",
      degree: "Schooling",
      dates: "2008 \u2013 March 2018",
      location: "India"
    }
  ],
  extra: [
    "Alternative Contact Email: richaramesh2002@gmail.com",
    "Open to remote positions or relocation roles."
  ]
};
