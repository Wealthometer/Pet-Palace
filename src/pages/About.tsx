"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Zap, Users } from "lucide-react"
import Layout from "../components/layout/Layout"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Pet Wellness",
      description: "We prioritize the health and happiness of your beloved pets with quality products and expert care.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "All products are carefully vetted and sourced from trusted suppliers to ensure safety.",
    },
    {
      icon: Zap,
      title: "Quick Service",
      description: "Fast, reliable shipping and excellent customer support to get your pet's needs fulfilled quickly.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join our community of pet lovers and share experiences, tips, and stories about your pets.",
    },
  ]

  return (
    <Layout>
      <div className="bg-accent/30 py-8">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            About Happy Paws
          </motion.h1>
          <p className="text-muted-foreground">
            Dedicated to bringing joy and quality products to pet owners worldwide
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Happy Paws is dedicated to providing pet owners with exceptional products and services that enhance the
                lives of their furry, feathered, and scaly companions.
              </p>
              <p className="text-muted-foreground mb-6">
                Founded in 2023, we've grown from a small pet store to an online marketplace serving thousands of happy
                customers. Every product in our catalog is selected with care to ensure quality and safety for your
                pets.
              </p>
              <Link to="/shop">
                <Button>Start Shopping</Button>
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <p className="text-6xl mb-2">🐾</p>
                <p className="text-muted-foreground">Happy Paws Since 2023</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-heading text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}

export default About
