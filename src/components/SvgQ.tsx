import { motion } from "framer-motion";

const AnimatedSvgQ = () => {
  const pathOneVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2,
          ease: "easeInOut",
        },
        opacity: { duration: 0.01 },
      },
    },
  };

  const pathTwoVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2,
          ease: "easeInOut",
          delay: 1.5, // Start second path before first one completes
        },
        opacity: { duration: 0.01, delay: 1.5 },
      },
    },
  };

  const svgVariants = {
    hidden: {
      opacity: 1, // Changed to 1 to avoid flickering
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.svg
      width={870}
      height={934}
      viewBox="0 0 870 934"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <g style={{ mixBlendMode: "overlay" }} clipPath="url(#clip0_5_240)">
        <mask
          id="mask0_5_240"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x={7}
          y={0}
          width={1921}
          height={1081}
        >
          <path d="M1927.55 0.139999H7.55005V1080.14H1927.55V0.139999Z" fill="white" />
        </mask>
        <g mask="url(#mask0_5_240)">
          <mask
            id="mask1_5_240"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x={-9}
            y={-162}
            width={889}
            height={1098}
          >
            <path d="M879.14 -162H-9V935.21H879.14V-162Z" fill="white" />
          </mask>
          <g mask="url(#mask1_5_240)">
            <motion.path
              d="M569.93 -153.61C591.93 -118.98 610.4 -78.98 625.93 -32.05C668.11 95.36 675.55 234.39 648.64 393C643.19 425.1 634.09 459 621.58 493.76C598.71 557.33 563.87 607.76 517.65 644.4C523.915 644.753 530.198 644.61 536.44 643.97C614.65 635.13 681.25 602.45 734.44 546.84C851.49 424.38 892.8 275.22 857.2 103.48C836.32 2.77998 787.85 -85.01 720.86 -153.61"
              stroke="#ffff"
              strokeWidth="1.13"
              strokeMiterlimit={10}
              variants={pathOneVariants}
              initial="hidden"
              animate="visible"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              d="M0.560059 -153.61V598.83C0.560059 598.83 92.1301 751.59 329.87 745.14C561.65 738.84 547.23 931.29 690.79 933.28C692.1 933.33 693.4 933.62 694.72 933.62C695.25 933.62 695.72 933.46 696.28 933.45C698.17 933.45 699.78 933.73 701.72 933.62V932.87C727.61 931 750.88 919.59 762.05 901.99C778.47 876.11 775.05 840.33 753.22 810.83C735.55 786.94 713.55 770.47 687.86 761.9C654.8 750.9 627.3 742.25 599.4 739.81C509.86 731.96 422.06 726.61 338.4 723.89C279.45 721.96 230.4 702.42 188.33 664.12C150.76 629.89 121.06 587.12 100.05 536.96C23.7201 354.75 14.1301 165.46 71.5501 -25.63C86.2001 -74.38 105.75 -116.48 129.68 -153.63"
              stroke="#ffff"
              strokeWidth="1.13"
              strokeMiterlimit={10}
              variants={pathTwoVariants}
              initial="hidden"
              animate="visible"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5_240">
          <rect width={870} height={934} fill="white" />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export default AnimatedSvgQ;
