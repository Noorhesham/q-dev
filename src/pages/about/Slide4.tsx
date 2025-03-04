"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import { useNav } from "@/context/NavContext";

const Slide4 = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const team = [
    {
      name: "Eng. Samy Abdelrahim",
      role: "Board Member of Q Developments",
      image: "/Rectangle 7 (3).png",
      details: `• Over 15 years of experience in real estate development, construction and business management.
      • Graduated as a Civil Engineer.
      • Proven track record in managing and executing large-scale projects with total investments exceeding EGP 2B.
      • Built the reputation of a trusted expert in Real Estate development and construction.
      • Extensive knowledge in project planning and execution.`,
    },
    {
      name: "Eng. Mohamed Gaber",
      role: "Board Member of Q Developments",
      image: "/Rectangle 7 (2).png",
      details: `• Over 15 years of experience in real estate development and project management.
      • Civil Engineering background with extensive expertise.
      • Successfully managed projects worth over EGP 1.5B.
      • Known for innovative solutions and strategic planning.`,
    },
    {
      name: "Eng. Abdullah Ahmed",
      role: "Board Member of Q Developments",
      image: "/Rectangle 7 (3).png",
      details: `• 12+ years in real estate and construction management.
      • Architectural engineering expertise.
      • Led projects valued at EGP 2B+.
      • Specializes in sustainable development practices.`,
    },
  ];
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Board Members");
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}{" "}
      <div className="absolute h-full left-0 top-0 z-20 w-full bg-main2 mix-blend-multiply"></div>
      <div className="absolute inset-0">
        <img src="/Rectangle 3 (2).png" alt="Background Pattern" className="object-cover z-10 bg-fixed" />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative">
        <div className="pt-24 pb-16">
          <div className="grid grid-cols-3 gap-8 mt-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative aspect-square h-[22rem] rounded-[32px] overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Non-hover overlay with fade out */}
                  <motion.div
                    className="absolute bottom-5 left-0 right-0 w-[80%]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: hoveredMember === index ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start">
                      <img src="/Vector (18).png" alt="Q" className="w-[44px]  h-auto" />
                      <div className=" rounded-full px-4 py-[1px] rounded-l-none bg-main2 flex-col">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-nowrap text-cream/80">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Hover overlay with fade in */}
                  <motion.div
                    className="absolute w-full bg-transparent left-0 h-full top-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredMember === index ? 1 : 0,
                      y: hoveredMember === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start h-full">
                      <div className=" rounded-3xl px-4 py-3 h-full rounded-l-none bg-main2/80 flex-col">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-nowrap text-cream/80">{member.role}</p>{" "}
                        <div className="text-sm text-cream/90 space-y-4">
                          {member.details.split("\n").map((detail, i) => (
                            <p key={i} className="leading-relaxed pl-4 relative">
                              <span className="absolute left-0">•</span>
                              {detail.trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide4;
