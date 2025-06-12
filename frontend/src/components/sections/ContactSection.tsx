import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2'

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post("http://localhost:4000/api/contact", data);
  
//       Swal.fire({
//   title: "Success",
//   text: "Your message has been sent successfully!",
//   icon: "success"
// });
//     alert(res.data.message);
//       reset();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to send message.");
//     }
//   };


  const onSubmit = async (data) => {
  try {
    const { data: response } = await axios.post("https://sanjay-portfolio-bcl4.onrender.com/api/contact", data);

    Swal.fire({
      title: "Message Sent!",
      text: response.message || "Your message has been sent successfully!",
      icon: "success",
      confirmButtonText: "OK"
    });

    reset(); // resets the form fields from react-hook-form
  } catch (error) {
    const message = error.response?.data?.message || "Failed to send your message. Please try again.";

    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "Close"
    });
  }
};

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact form animation
      gsap.fromTo(
        ".contact-form",
        { opacity: 0, x: -100, rotationY: -15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Contact info animation
      gsap.fromTo(
        ".contact-info",
        { opacity: 0, x: 100, rotationY: 15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    {
      Icon: Linkedin,
      name: "linkedin",
      href: "#",
      color: "text-blue-600",
    },
    {
      Icon: Github,
      name: "github",
      href: "#",
      color: "text-white", // fix typo `white-800` → `white`
    },
    {
      Icon: Twitter,
      name: "twitter",
      href: "#",
      color: "text-sky-500",
    },
    {
      Icon: Instagram,
      name: "instagram",
      href: "#",
      color: "text-pink-500",
    },
  ];

  return (
  <div ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4  relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-reveal text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Let's Work Together
          </h2>
          <p className="text-reveal text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it and discuss how we
            can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="contact-form">
            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg"
                    placeholder="Your name"
                  />
                  {errors.name?.message &&
                    typeof errors.name.message === "string" && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                </motion.div>

                <motion.div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                      },
                    })}
                    type="email"
                    className={`w-full px-4 py-3 bg-card border border-border rounded-lg`}
                    placeholder="your@email.com"
                  />
                  {errors.email?.message &&
                    typeof errors.email.message === "string" && (
                      <p className="text-red-500 text-sm mt-1 ml-1">
                        {errors.email.message}
                      </p>
                    )}
                </motion.div>
              </div>

              <motion.div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  type="text"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg"
                  placeholder="Project inquiry"
                />
                {errors.subject?.message &&
                  typeof errors.subject.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.subject.message}
                    </p>
                  )}
              </motion.div>

              <motion.div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={6}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg"
                  placeholder="Tell me about your project..."
                ></textarea>
                {errors.message?.message &&
                  typeof errors.message.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>
          </div>

          <div className="contact-info space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary">📧</span>
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground">
                    sanjaygawai2022@gmail.com
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary">📱</span>
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-muted-foreground">+91 7720990081</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary">📍</span>
                </div>
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-muted-foreground">
                    Maharashtra, India
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="pt-8">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socials.map(({ Icon, name, href, color }) => (
                  <motion.a
                    key={name}
                    href={href}
                    className="w-10 h-10 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className={`w-6 h-6 ${color}`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
