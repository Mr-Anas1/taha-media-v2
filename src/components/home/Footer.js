import React from "react";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Github, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Large Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[200px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[200px] opacity-10" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="text-3xl lg:text-4xl font-black tracking-tighter text-white mb-4">
                  Taha Media<span className="text-blue-400">.</span>
                </div>
                <p className="text-slate-400 leading-relaxed max-w-md">
                  Building digital experiences that inspire, engage, and convert. We're your partner in digital transformation.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail size={18} className="text-blue-400" />
                  <span>hello@tahamedia.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone size={18} className="text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={18} className="text-blue-400" />
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Services</h3>
              <ul className="space-y-3">
                {["UI/UX Design", "Web Development", "Mobile Apps", "Branding", "Digital Marketing"].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Portfolio", "Careers", "Blog", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              
              {/* Copyright */}
              <div className="text-slate-400 text-sm">
                © 2024 Taha Media. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Github, label: "GitHub" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <ArrowUp size={16} />
                <span className="text-sm font-medium">Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
