import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import { motion } from "framer-motion";
import { useProject } from "@/context/ProjectContext";
import { BACKEND_API, ImageUrl } from "@/constants";

export default function About() {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  // Animation variants for staggered text reveal
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Split paragraph into sentences for staggered animation
  const paragraphContent = currentProject.about?.content || "";
  const sentences = paragraphContent
    .split(". ")
    .filter(Boolean)
    .map((sentence) => (sentence.endsWith(".") ? sentence : sentence + "."));
  console.log(currentProject);
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <img
          src={`${ImageUrl}/${currentProject.lightImages?.[0]}`}
          alt="Background Pattern"
          className="object-cover w-full h-full bg-fixed"
        />
      </motion.div>
      <MaxWidthWrapper className="relative z-30 text-white">
        <div className="max-w-3xl z-30 py-32">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="special-font text-5xl  mb-12"
          >
            {currentProject.title}
          </motion.h1>

          {/* Staggered paragraph reveal */}
          <div className="space-y-4">
            {sentences.map((sentence, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="leading-relaxed text-sm"
                dangerouslySetInnerHTML={{ __html: sentence }}
              />
            ))}
          </div>

          {/* Animated underline accent */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="h-px bg-cream mt-8 w-full"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
