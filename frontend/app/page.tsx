"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Film, Ticket, Clapperboard, Popcorn, Video, Glasses } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const slideUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Projector Glow Behind Title */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      {/* Spotlight Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary)/10,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,theme(colors.accent)/10,transparent_50%)]" />

      {/* Floating Movie-Themed Icons */}
      <motion.div
        className="absolute top-20 left-[10%] text-primary/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Film size={64} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-[15%] text-accent/30"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <Popcorn size={56} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[15%] text-primary/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay: 2,
        }}
      >
        <Clapperboard size={60} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-[10%] text-accent/30"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <Ticket size={52} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 left-[8%] text-primary/20"
        animate={{
          y: [0, -12, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1.5,
        }}
      >
        <Video size={48} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-[12%] text-accent/40"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          delay: 0.8,
        }}
      >
        <Glasses size={72} strokeWidth={1.5} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-8 max-w-5xl">
          {/* Heading with Glow Effect */}
          <motion.div variants={fadeInFromTop} className="relative">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary drop-shadow-2xl">
              Welcome to FlimX
            </h1>
            {/* Title Glow */}
            <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-primary via-accent to-primary -z-10" />
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={slideUpVariant}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Your one-stop platform to manage shows and book movie tickets
            effortlessly.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={slideUpVariant}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            {/* For Cine Users Button */}
            <motion.button
              onClick={() => router.push("/book")}
              className="group relative px-10 py-5 bg-gradient-to-r from-primary to-accent text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 overflow-hidden min-w-[240px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Ticket size={24} />
                For Cine Users
              </span>
            </motion.button>

            {/* For Cine Admin Button */}
            <motion.button
              onClick={() => router.push("/admin")}
              className="group relative px-10 py-5 bg-gradient-to-r from-accent to-primary text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(232,121,249,0.5)] transition-all duration-300 overflow-hidden min-w-[240px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Film size={24} />
                For Cine Admin
              </span>
            </motion.button>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-12"
          />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-10 pb-6 pt-4 text-center text-gray-500 text-sm bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm"
      >
  © 2025 FlimX. All Rights Reserved.
      </motion.footer>
    </div>
  );
}
