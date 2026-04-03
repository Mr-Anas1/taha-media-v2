"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Sparkles, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import gsap from "gsap";

const ContactPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const formRef = useRef(null);
  const formItemsRef = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    // Reset form when popup opens
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSubmitStatus(null);

    // Initial states
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(contentRef.current, { scale: 0.95, opacity: 0, y: 20 });
    gsap.set(formItemsRef.current, { y: 20, opacity: 0 });
    gsap.set(popupRef.current, { display: "flex" });

    // Animation timeline
    const tl = gsap.timeline();
    tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
      .to(contentRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.out"
      }, "-=0.2")
      .to(formItemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out"
      }, "-=0.3");

    return () => {
      if (popupRef.current) {
        const closeTl = gsap.timeline();
        closeTl.to(contentRef.current, {
          scale: 0.95,
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power2.in"
        })
          .to(overlayRef.current, {
            opacity: 0,
            duration: 0.3
          }, "-=0.2")
          .call(() => {
            gsap.set(popupRef.current, { display: "none" });
          });
      }
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (typeof window.emailjs !== 'undefined') {
        const result = await window.emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_email: 'hello@tahamedia.com'
          },
          'YOUR_PUBLIC_KEY'
        );

        if (result.status === 200) {
          setSubmitStatus('success');
          setFormData({ name: "", email: "", phone: "", message: "" });
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } else {
        console.log('Form submitted:', formData);
        setSubmitStatus('success');
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Added colSpan to map inputs into a grid layout
  const formFields = [
    { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe', required: true, colSpan: 'col-span-1' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true, colSpan: 'col-span-1' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', required: false, colSpan: 'col-span-1 md:col-span-2' },
    { name: 'message', label: 'Your Message', type: 'textarea', placeholder: 'Tell us about your project...', required: true, colSpan: 'col-span-1 md:col-span-2' }
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center p-4 sm:p-6"
    >
      {/* Blurred Overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Content - WIDER (max-w-2xl) and NON-SCROLLABLE (overflow-hidden) */}
      <div
        ref={contentRef}
        className="relative bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 z-10"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Clean Header */}
        <div className="px-8 pt-10 pb-6 border-b border-slate-50 flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            Get in Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-3">
            Let's start <span className="text-blue-600">a conversation.</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-8 flex-1 flex flex-col">
          {/* Changed to a CSS Grid to save vertical space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {formFields.map((field, index) => (
              <div
                key={field.name}
                ref={(el) => (formItemsRef.current[index] = el)}
                className={`space-y-2 ${field.colSpan}`}
              >
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {field.label} {field.required && <span className="text-blue-600">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={3} // Reduced rows to fit non-scrollable height
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:bg-blue-50/50 focus:outline-none transition-all duration-200 resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:bg-blue-50/50 focus:outline-none transition-all duration-200"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle size={18} className="text-green-600" />
              <p className="text-green-800 font-medium text-sm">
                Message sent successfully! We'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle size={18} className="text-red-600" />
              <p className="text-red-800 font-medium text-sm">
                Failed to send message. Please try again.
              </p>
            </div>
          )}

          {/* Submit Button & Footer Wrapper to stick to bottom */}
          <div className="mt-auto pt-6">
            <div ref={(el) => (formItemsRef.current[formFields.length] = el)}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Quick contact:</strong> Reach us directly at{' '}
                <a href="mailto:hello@tahamedia.com" className="text-blue-600 font-bold hover:underline">
                  hello@tahamedia.com
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;