export interface Stat {
  label: string;
  target: number;
  suffix?: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  dateRange: string;
  current?: boolean;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface SiteContent {
  hero: {
    heading: string;
    subtitle: string;
    tagline: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    social: { github: string; linkedin: string; email: string };
  };
  about: {
    heading: string;
    description: string;
    stats: Stat[];
  };
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  projects: Project[];
  projectsMoreUrl: string;
  footer: { name: string; tagline: string };
}

export const content: SiteContent = {
  hero: {
    heading: "Hi, I'm Justin Michael King",
    subtitle: 'ML/AI Data Operations',
    tagline:
      'Transforming data into intelligent solutions through machine learning and artificial intelligence. Passionate about creating innovative ML models and optimizing data pipelines.',
    ctaPrimary: { label: 'View My Work', href: '#projects' },
    ctaSecondary: { label: 'Learn More', href: '#about' },
    social: {
      github: 'https://github.com/Justin-MKing',
      linkedin: 'https://linkedin.com/in/justin-mking',
      email: 'mailto:justinking90@gmail.com',
    },
  },
  about: {
    heading: 'ML/AI Data Operations & Innovation Enthusiast',
    description:
      'I specialize in data preprocessing, feature engineering, model training, and production deployment. My work spans traditional machine learning to deep learning and neural networks, with a focus on building reliable, scalable systems that turn raw data into real-world impact.',
    stats: [
      { label: 'ML Models Deployed', target: 50 },
      { label: 'Data Pipelines Built', target: 100 },
      { label: 'GB Data Processed', target: 1000, suffix: '+' },
    ],
  },
  skills: [
    {
      title: 'Machine Learning',
      items: ['Python', 'TensorFlow/Keras', 'PyTorch', 'Scikit-learn'],
    },
    {
      title: 'Data Operations',
      items: ['SQL/NoSQL', 'Apache Spark', 'Docker/Kubernetes', 'AWS/GCP'],
    },
    {
      title: 'Tools & Frameworks',
      items: ['Jupyter/Pandas', 'MLflow/Kubeflow', 'Git/GitLab CI', 'Tableau/PowerBI'],
    },
  ],
  experience: [
    {
      company: 'Meta',
      role: 'Data Annotation, AI Training',
      dateRange: 'October 2025 – Present',
      current: true,
      bullets: [
        'Annotate and evaluate large-scale multimodal datasets (text, image, and video) to support training and fine-tuning of AI/ML models, ensuring strict alignment with detailed labeling guidelines and quality rubrics.',
        'Apply rigorous QA standards to flag edge cases, ambiguous data, and labeling inconsistencies, improving downstream model accuracy and reducing rework cycles.',
        'Collaborate with ML research and data science teams to refine annotation guidelines and rubrics based on observed model behavior and emerging edge-case patterns.',
        'Contribute to human feedback and preference-data collection workflows supporting responsible AI development and model alignment.',
      ],
    },
    {
      company: 'Apple Inc.',
      role: 'AI/ML Data Operations',
      location: 'Cupertino, CA',
      dateRange: 'June 2025 – October 2025',
      bullets: [
        'Designed scalable ML data pipelines and optimized preprocessing workflows.',
        'Monitored production systems for 99.9% uptime across petabyte-scale datasets.',
      ],
    },
    {
      company: 'Apple Inc.',
      role: 'Data Collection Moderator',
      dateRange: 'February 2025 – May 2025',
      bullets: [
        'Performed data validation and quality assurance in line with privacy regulations.',
      ],
    },
    {
      company: 'Transpere',
      role: 'Quality Control, Remote Desktop Support & Materials Handler',
      location: 'San Diego, CA',
      dateRange: 'March 2020 – April 2024',
      bullets: [
        'Reduced defect rates by 25% through improved quality control processes.',
        'Cut resolution time by 40% and improved accuracy by 30% in remote desktop support.',
      ],
    },
    {
      company: 'Amazon',
      role: 'Logistics Coordinator',
      location: 'San Diego, CA',
      dateRange: 'June 2016 – August 2019',
      bullets: [
        'Managed 50+ drivers daily, achieving a 15% improvement in delivery times.',
      ],
    },
  ],
  projects: [
    {
      title: 'Recycling Center App',
      description:
        'Flutter-based system using ML-powered waste classification and route optimization algorithms.',
      tech: ['Flutter', 'Python', 'TensorFlow', 'Computer Vision'],
      githubUrl: 'https://github.com/Justin-MKing/RecyclingCenterApp',
    },
    {
      title: 'ML Data Pipeline',
      description:
        'Automated ETL pipeline with real-time data processing and model retraining capabilities.',
      tech: ['Python', 'Apache Spark', 'Docker', 'AWS'],
      githubUrl: 'https://github.com/Justin-MKing',
    },
    {
      title: 'Predictive Analytics Dashboard',
      description:
        'Interactive dashboard for real-time predictive analytics with advanced visualization and anomaly detection capabilities.',
      tech: ['Python', 'Streamlit', 'Plotly', 'PostgreSQL'],
      githubUrl: 'https://github.com/Justin-MKing',
    },
  ],
  projectsMoreUrl: 'https://github.com/Justin-MKing',
  footer: {
    name: 'Justin Michael King',
    tagline: 'ML/AI Data Operations',
  },
};
