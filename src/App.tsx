import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// === IMPORT ALL IMAGES FROM src/assets/ (ALL .png) ===
import heroImg from './assets/hero.png';
import project1 from './assets/project1.png';
import project2 from './assets/project2.png';
import project3 from './assets/project3.png';
import project4 from './assets/project4.png';

// Certifications (5)
import certJava from './assets/cert-java.png';
import certAWS from './assets/cert-aws.png';
import certAzure from './assets/cert-azure.png';
import certGenAI from './assets/cert-genai.png';
import certMongoDB from './assets/cert-mongodb.png';

// Internships (2)
import internWeb from './assets/intern-web.png';
import internAI from './assets/intern-ai.png';

type Illustration = { src: string; alt: string };

const illustrations: Illustration[] = [
  { src: 'https://picsum.photos/id/43/1280/831', alt: 'Illustration 1' },
  { src: 'https://picsum.photos/id/180/2400/1600', alt: 'Illustration 2' },
  { src: 'https://picsum.photos/id/63/5000/2813', alt: 'Illustration 3' },
  { src: 'https://picsum.photos/id/237/3500/2095', alt: 'Illustration 4' },
];

const projects = [
  {
    title: 'Queue-Based Simulation System',
    desc: 'A simulation model to optimize emergency department operations with efficient queue handling.',
    img: project1,
    github: 'https://github.com/Chiyamaladevi9790/bus-ticket-booking-system',
  },
  {
    title: 'CGPA Calculator',
    desc: 'Python-based tool to calculate and track students’ Cumulative Grade Point Average.',
    img: project2,
    github: 'https://github.com/Chiyamaladevi9790/bus-ticket-booking-system',
  },
  {
    title: 'Budget Calculator',
    desc: 'Java Swing desktop app for efficient personal finance management.',
    img: project3,
    github: 'https://github.com/Chiyamaladevi9790/bus-ticket-booking-system',
  },
  {
    title: 'Bus Ticket Booking System',
    desc: 'Web app with real-time seat availability, UPI/QR/Card payments, and booking confirmations.',
    img: project4,
    github: 'https://github.com/Chiyamaladevi9790/bus-ticket-booking-system',
  },
];

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function StickyFlow({ items }: { items: Illustration[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total === 0 ? 0 : scrolled / total;
      const current = Math.min(
        items.length - 1,
        Math.max(0, Math.floor(p * items.length))
      );
      setIndex(current);
      el.style.setProperty('--progress', p.toString());
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items.length]);

  return (
    <section className="flow-wrap" ref={wrapRef}>
      <div className="flow-sticky">
        {items.map((it, i) => (
          <div
            key={i}
            className={`flow-image ${i === index ? 'active' : ''}`}
            style={{ zIndex: items.length - i }}
            aria-hidden={i !== index}
          >
            <img src={it.src} alt={it.alt} />
          </div>
        ))}
        <div className="flow-caption">
          <span>Scroll to see my illustrations flow through the page</span>
        </div>
      </div>
      <div className="flow-spacer" />
    </section>
  );
}

export default function App() {
  useRevealOnScroll();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      console.log('Message sent:', formData);
      setFormData({ name: '', email: '', message: '' });
      setIsSending(false);
      alert('Message sent successfully!');
    }, 1000);
  };

  return (
    <div className="site">
      {/* DASHBOARD */}
      <nav className="dashboard">
        <ul className="dashboard-nav">
          <li><a href="#hero" className="dashboard-link">Home</a></li>
          <li><a href="#projects" className="dashboard-link">Projects</a></li>
          <li><a href="#skills" className="dashboard-link">Skills</a></li>
          <li><a href="#certifications" className="dashboard-link">Certifications</a></li>
          <li><a href="#internships" className="dashboard-link">Internships</a></li>
          <li><a href="#contact" className="dashboard-link">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <header id="hero" className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="title reveal-on-scroll">
              I’m <span className="accent">Chiyamala Devi Chandrasekaran</span>
            </h1>
            <p className="tagline reveal-on-scroll">
              <strong>
                Web developer focused on front-end design and development, turning ideas into impactful digital solutions.
              </strong>
            </p>
            <a href="#projects" className="hero-cta reveal-on-scroll">
              View my projects
            </a>
          </div>
          <div className="hero-image reveal-on-scroll">
            <img src={heroImg} alt="Chiyamala Devi Portrait" />
          </div>
        </div>
      </header>

      {/* STICKY ILLUSTRATION FLOW */}
      <StickyFlow items={illustrations} />

      {/* PROJECTS */}
      <main id="projects" className="projects">
        <h2 className="section-title reveal-on-scroll">Projects</h2>
        <div className="project-grid">
          {projects.map((p, i) => (
            <article key={i} className="project-card reveal-on-scroll">
              <div className="project-media">
                <img src={p.img} alt={p.title} />
                <div className="img-overlay"></div>
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-actions">
                  <a
                    className="btn ghost"
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* SKILLS SECTION */}
      <section id="skills" className="skills">
        <h2 className="section-title reveal-on-scroll">Skills</h2>
        <div className="skills-container">
          <div className="skills-column reveal-on-scroll">
            <h3 className="skills-category">Technical Skills</h3>
            <div className="skill-item">
              <span className="skill-name">Artificial Intelligence (AI)</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '70%', backgroundColor: '#FFD700' }}></div>
              </div>
              <span className="skill-percentage">70%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Web Development</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '85%', backgroundColor: '#2196F3' }}></div>
              </div>
              <span className="skill-percentage">85%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">CSS</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '90%', backgroundColor: '#FFC107' }}></div>
              </div>
              <span className="skill-percentage">90%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Computer Architecture</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '70%', backgroundColor: '#E91E63' }}></div>
              </div>
              <span className="skill-percentage">70%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Data Science</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '65%', backgroundColor: '#9C27B0' }}></div>
              </div>
              <span className="skill-percentage">65%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Java</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '90%', backgroundColor: '#FF5722' }}></div>
              </div>
              <span className="skill-percentage">90%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Data Structures (C)</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '75%', backgroundColor: '#3F51B5' }}></div>
              </div>
              <span className="skill-percentage">75%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">C</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '60%', backgroundColor: '#009688' }}></div>
              </div>
              <span className="skill-percentage">60%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Python</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '60%', backgroundColor: '#4CAF50' }}></div>
              </div>
              <span className="skill-percentage">60%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">HTML</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '90%', backgroundColor: '#795548' }}></div>
              </div>
              <span className="skill-percentage">90%</span>
            </div>
          </div>
          <div className="skills-column reveal-on-scroll">
            <h3 className="skills-category">Soft Skills</h3>
            <div className="skill-item">
              <span className="skill-name">Problem Solving</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '85%', backgroundColor: '#9C27B0' }}></div>
              </div>
              <span className="skill-percentage">85%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Communication</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '80%', backgroundColor: '#E91E63' }}></div>
              </div>
              <span className="skill-percentage">80%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Leadership</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '75%', backgroundColor: '#FF5722' }}></div>
              </div>
              <span className="skill-percentage">75%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Teamwork</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '90%', backgroundColor: '#3F51B5' }}></div>
              </div>
              <span className="skill-percentage">90%</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Adaptability</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '70%', backgroundColor: '#2196F3' }}></div>
              </div>
              <span className="skill-percentage">70%</span>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="certifications">
        <h2 className="section-title reveal-on-scroll">Certifications</h2>
        <div className="certification-header reveal-on-scroll">
          <h3 className="certification-sub-title">Top Certifications</h3>
          <h3 className="certification-sub-title">Online Courses</h3>
        </div>
        <div className="certification-grid">
          <article className="certification-card reveal-on-scroll">
            <div className="certification-media">
              <img src={certJava} alt="Java Certification" />
            </div>
            <div className="certification-body">
              <h3>Java Certification</h3>
              <p>Comprehensive Java course covering basics to advanced topics.</p>
            </div>
          </article>
          <article className="certification-card reveal-on-scroll">
            <div className="certification-media">
              <img src={certAWS} alt="AWS Certification" />
            </div>
            <div className="certification-body">
              <h3>AWS Certification</h3>
              <p>Cloud computing fundamentals with AWS services.</p>
            </div>
          </article>
          <article className="certification-card reveal-on-scroll">
            <div className="certification-media">
              <img src={certAzure} alt="Azure Fundamentals" />
            </div>
            <div className="certification-body">
              <h3>Azure Fundamentals</h3>
              <p>Introduction to Microsoft Azure cloud platform.</p>
            </div>
          </article>
          <article className="certification-card reveal-on-scroll">
            <div className="certification-media">
              <img src={certGenAI} alt="GenAI Certification" />
            </div>
            <div className="certification-body">
              <h3>GenAI Certification</h3>
              <p>Introduction to generative AI and its applications.</p>
            </div>
          </article>
          <article className="certification-card reveal-on-scroll">
            <div className="certification-media">
              <img src={certMongoDB} alt="MongoDB Certification" />
            </div>
            <div className="certification-body">
              <h3>MongoDB Certification</h3>
              <p>Database management with MongoDB NoSQL.</p>
            </div>
          </article>
        </div>
      </section>

      {/* INTERNSHIPS SECTION */}
      <section id="internships" className="internships">
        <h2 className="section-title reveal-on-scroll">Internships</h2>
        <div className="internship-grid">
          <article className="internship-card reveal-on-scroll">
            <div className="internship-media">
              <img src={internWeb} alt="Web Development Internship" />
            </div>
            <div className="internship-body">
              <h3>Web Development Intern at Skillcraft Technology</h3>
              <p>Completed a web development internship at Skillcraft Technology, where I contributed to front-end development projects using HTML, CSS, and JavaScript. Gained experience in building responsive websites and collaborating in a team environment. The internship focused on practical skills in modern web technologies and agile methodologies.</p>
            </div>
          </article>
          <article className="internship-card reveal-on-scroll">
            <div className="internship-media">
              <img src={internAI} alt="AI Internship" />
            </div>
            <div className="internship-body">
              <h3>AI Intern at Skillintern Bangalore</h3>
              <p>Completed an AI internship at Skillintern Bangalore, involving work on machine learning models and data analysis. Learned to implement AI algorithms in Python and contributed to real-world AI applications. The experience included hands-on training in data science tools and AI ethics.</p>
            </div>
          </article>
        </div>
      </section>

      {/* MINI FLOW */}
      <section className="mini-flow">
        <div className="mini-flow-content reveal-on-scroll">
          <h2>Design x Code</h2>
          <p>
            I love blending strong visuals with clean, performant code. Swap my
            placeholders with your Webflow illustrations to make this section
            truly yours.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <footer id="contact" className="contact">
        <h2 className="section-title reveal-on-scroll">Let’s Connect</h2>
        <form className="contact-container reveal-on-scroll" onSubmit={handleSubmit}>
          <div className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            ></textarea>
            <button type="submit" className="btn" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
        <p className="footer-note">
          © {new Date().getFullYear()} @chiyamala | Made with smartness and passion by Chiyamala Devi Chandrasekaran
        </p>
      </footer>
    </div>
  );
}