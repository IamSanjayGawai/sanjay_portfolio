import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation with better timing
      gsap.utils.toArray(".split-text").forEach((text: any) => {
        const chars = text.textContent.split("");
        text.innerHTML = chars
          .map(
            (char: string) =>
              `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
          )
          .join("");

        gsap.fromTo(
          text.querySelectorAll(".char"),
          { opacity: 0, y: 30, rotationX: -45 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Skills animation with section-based triggering
      gsap.utils.toArray(".skill-item").forEach((skill: any, index: number) => {
        gsap.fromTo(
          skill,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            rotationY: index % 2 === 0 ? -20 : 20,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    "React & TypeScript",
    "Node.js & Express",
    "Python & Django",
    "PostgreSQL & MongoDB",
    "AWS & Docker",
    "UI/UX Design",
  ];

  return (
    <div ref={sectionRef} className="min-h-screen py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-reveal text-4xl md:text-6xl font-bold mb-6 text-gradient split-text">
            About Me
          </h2>
          <p className="text-reveal text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate developer with 1.7+ years of experience creating
            innovative digital solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="text-reveal">

              {/* change below paragrapgh details in like  in best way that looks like profesional like color change hihlights  font size small icrease */}
     <p className="text-base sm:text-lg leading-relaxed mb-6 text-muted-foreground">
  <span className="text-primary font-semibold">Full-Stack Developer</span> with <span className="text-accent-foreground font-medium">1.7+ years</span> of experience building scalable web applications using <span className="text-accent-foreground">MERN Stack</span>, <span className="text-accent-foreground">TypeScript</span>, and modern technologies. I focus on developing <span className="text-primary font-medium">real-world solutions</span> with clean, efficient code and intuitive user experiences.
  <br /><br />
  From <span className="text-accent-foreground">e-commerce platforms</span> to <span className="text-accent-foreground">AI-powered tools</span>, I've built full-featured projects including <span className="text-primary">real-time chat</span>, <span className="text-primary">secure payments</span>, <span className="text-primary">admin dashboards</span>, and more. Constantly learning and evolving, I strive to turn ideas into impactful digital products.
</p>

            </div>
          </div>

          <div className="flex justify-center items-center gap-6">
            <img
              src="profile-img.png"
              alt="Sanjay Gawai"
              className="rounded-lg  w-80 h-80 object-contain "
            />
          </div>
        </div>

        <div className="space-y-10 mt-10 flex flex-col items-start">
          <span className="font-semibold text-xl">My Approach:</span>
          <ul className="text-lg leading-relaxed  flex  gap-5 flex-wrap">
            <li className="border border-primary p-4 skill-item">
              🚀 Performance & Scalability
            </li>
            <li className="border border-primary p-4 skill-item">
              🎨 User Experience
            </li>
            <li className="border border-primary p-4 skill-item">
              🤖 AI & Automation
            </li>
            <li className="border border-primary p-4 skill-item">
              🧠 Problem-Solving
            </li>
            <li className="border border-primary p-4 skill-item">
              💡 Continuous Learning
            </li>
          </ul>
        </div>
      </div>

      
    </div>
  );
};

export default AboutSection;
