"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import { useNav } from "@/context/NavContext";
import { BACKEND_API, ImageUrl } from "@/constants";

interface Member {
  title: string;
  jobTitle: string;
  photo: string;
  content: string;
  _id: string;
}

interface BoardMembersData {
  pageTitle: string;
  background: string;
  members: Member[];
}

const Slide4 = ({ data }: { data?: BoardMembersData }) => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const { setTitle } = useNav();

  useEffect(() => {
    setTitle(data?.pageTitle || "Board Members");
  }, [data?.pageTitle]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute h-full left-0 top-0 z-20 w-full bg-main2 mix-blend-multiply"></div>
      <div className="absolute !w-full !h-full inset-0">
        <img
          src={`${ImageUrl}/${data?.background}`}
          alt="Background Pattern"
          className="object-cover w-full h-full z-10 bg-fixed"
        />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative">
        <div className="pt-24 pb-16">
          <div className="grid grid-cols-3 gap-8 mt-16">
            {data?.members.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative aspect-square h-[22rem] rounded-[32px] overflow-hidden">
                  <motion.img
                    src={`${ImageUrl}/${member.photo}`}
                    alt={member.title}
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
                      <img src="/Vector (18).png" alt="Q" className="w-[44px] h-auto" />
                      <div className="rounded-full px-4 py-[1px] rounded-l-none bg-main2 flex-col">
                        <h3 className="text-lg font-semibold">{member.title}</h3>
                        <p className="text-sm text-nowrap text-cream/80">{member.jobTitle}</p>
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
                      <div className="rounded-3xl px-4 py-3 h-full rounded-l-none bg-main2/80 flex-col">
                        <h3 className="text-lg font-semibold">{member.title}</h3>
                        <p className="text-sm text-nowrap text-cream/80">{member.jobTitle}</p>
                        <div
                          className="text-xs text-cream/90 space-y-4 mt-4"
                          dangerouslySetInnerHTML={{ __html: member.content }}
                        />
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
