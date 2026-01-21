import { motion } from 'framer-motion';
import { Award, Heart, Truck, Clock, Shield, Smile } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Healthy Pets',
    description: 'All our pets are vet-checked and come with health certificates.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $50. Same-day delivery available.',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '30-day return policy on all products. 100% satisfaction guaranteed.',
  },
  {
    icon: Award,
    title: 'Premium Brands',
    description: 'We only stock trusted brands for your pets health and happiness.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our pet experts are always here to help with any questions.',
  },
  {
    icon: Smile,
    title: 'Happy Customers',
    description: 'Over 10,000 happy pet parents trust us with their fur babies.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose PetPalace?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're passionate about pets and committed to providing the best experience for both you and your furry friends.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary hover:shadow-soft transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
