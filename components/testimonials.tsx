"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO at TechStart",
      avatar: "https://i.pravatar.cc/150?img=1",
      content:
        "This platform has transformed how we manage our business. The analytics features alone have saved us countless hours and improved our decision-making process significantly.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager at Scale Co",
      avatar: "https://i.pravatar.cc/150?img=3",
      content:
        "The integration capabilities are outstanding. We were able to connect all our existing tools seamlessly. The customer support team is also incredibly responsive and helpful.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "CTO at DataFlow",
      avatar: "https://i.pravatar.cc/150?img=5",
      content:
        "Security was our main concern when choosing a platform, and this solution exceeded our expectations. The encryption and compliance features give us complete peace of mind.",
      rating: 5,
    },
    {
      name: "Robert Taylor",
      role: "CTO at FinanceFlow",
      avatar: "https://i.pravatar.cc/150?img=15",
      content:
        "Security and compliance are critical in our industry. This platform not only meets but exceeds all our regulatory requirements.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "Director of Operations at StreamlineOps",
      avatar: "https://i.pravatar.cc/150?img=17",
      content:
        "The customer support is phenomenal. Every question gets answered quickly and thoroughly. It's like having an extended team member.",
      rating: 5,
    },
    {
      name: "Kevin Lee",
      role: "Founder at NextGen Solutions",
      avatar: "https://i.pravatar.cc/150?img=19",
      content:
        "We've tried many platforms, but this one stands out for its reliability and performance. Zero downtime in 18 months of usage.",
      rating: 5,
    },
    {
      name: "Sophie Anderson",
      role: "Product Lead at InnovateLab",
      avatar: "https://i.pravatar.cc/150?img=21",
      content:
        "The analytics dashboard gives us insights we never had before. Data-driven decisions have become our competitive advantage.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Engineering Manager at TechBridge",
      avatar: "https://i.pravatar.cc/150?img=23",
      content:
        "Migration was seamless and the onboarding process was exceptional. Our team was productive from day one.",
      rating: 5,
    },
    {
      name: "Elena Petrov",
      role: "CEO at GrowthMetrics",
      avatar: "https://i.pravatar.cc/150?img=25",
      content:
        "The platform scales beautifully with our business. From startup to enterprise, it has grown with us every step of the way.",
      rating: 5,
    },
    {
      name: "Michael Chang",
      role: "Head of Product at DataDriven",
      avatar: "https://i.pravatar.cc/150?img=27",
      content:
        "Real-time collaboration features have transformed how our remote team works together. Productivity has increased dramatically.",
      rating: 5,
    },
  ];

  const StarIcon = () => (
    <svg
      className="w-4 h-4 text-yellow-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20 flex flex-col gap-3"
        >
          <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
            Loved by Teams Worldwide
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-center">
            Join thousands of companies that trust our platform.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="break-inside-avoid mb-8"
            >
              <div className="p-6 rounded-xl bg-card border border-border transition-colors duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-sm font-medium border border-primary/20">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
