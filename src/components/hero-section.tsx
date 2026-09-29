"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProjectItem {
  id: string;
  client: string;
  headline: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
}

const projects: ProjectItem[] = [
  {
    id: "supersolid",
    client: "Supersolid",
    headline: "Supersolid launches campaign for Fujifilm Australia and Ubank",
    category: "CLIENT NEWS",
    year: "2026",
    image:
      "/assets/AVIF/6aa6abc0c7138d528ee9af33_Bendito_Mockup-CO-MacBook-05.avif",
    imageAlt:
      "Supersolid laptop mockup on green velvet armchair with art books",
  },
  {
    id: "oh-architecture",
    client: "OH Architecture",
    headline: "OH Architecture saved 20+ hours a month from qualifying leads",
    category: "CLIENT NEWS",
    year: "2026",
    image: "/assets/AVIF/6aa67feb5b2d3f7f3cb4adb1_Featured OH.avif",
    imageAlt: "OH Architecture curved concrete residence courtyard and lawn",
  },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(isMuted ? 640 : 380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        isMuted ? 880 : 220,
        ctx.currentTime + 0.12,
      );

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      return;
    }
  };

  const handleSoundToggle = () => {
    playClickSound();
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isHovered]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-nav", {
        y: -25,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          ".hero-watermark",
          {
            opacity: 0,
            x: -40,
            duration: 1.4,
            ease: "power2.out",
          },
          "-=0.7",
        )
        .from(
          ".hero-title-line",
          {
            y: 45,
            opacity: 0,
            stagger: 0.1,
            duration: 0.95,
          },
          "-=1.1",
        )
        .from(
          ".hero-intro-text",
          {
            y: 25,
            opacity: 0,
            duration: 0.85,
          },
          "-=0.75",
        )
        .from(
          ".hero-intro-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.65",
        )
        .from(
          ".hero-visual-card",
          {
            scale: 0.96,
            opacity: 0,
            y: 35,
            duration: 1.1,
          },
          "-=0.85",
        )
        .from(
          ".hero-badge-tab",
          {
            x: -20,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
          },
          "-=0.6",
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#ddddd8] text-[#141414] overflow-hidden flex flex-col justify-between selection:bg-[#141414] selection:text-[#ddddd8]"
    >
      <div className="hero-watermark pointer-events-none absolute left-0 top-0 h-full w-[300px] sm:w-[380px] lg:w-[440px] xl:w-[480px] select-none z-0 overflow-hidden opacity-[0.085]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 499 2114"
          className="svg-7 h-auto w-full object-contain text-[#141414]"
        >
          <path d="M3.2769 1982.75C3.2769 1945.04 16.943 1913.35 39.902 1889.85C62.861 1866.35 95.6595 1852.14 133.378 1852.14L279.878 1852.14C317.596 1852.14 350.395 1866.35 373.354 1889.85C396.313 1913.35 409.979 1945.04 409.979 1982.75L409.979 1983.3C409.979 2021.01 396.313 2052.71 373.354 2076.2C350.395 2099.7 317.596 2113.91 279.878 2113.91L271.678 2113.91L271.678 2045.6L279.878 2045.6C298.464 2045.6 313.77 2039.04 324.703 2028.11C336.182 2016.64 342.195 2001.33 342.195 1983.3L342.195 1982.75C342.195 1964.72 336.182 1949.42 324.703 1937.94C313.77 1927.01 298.464 1920.45 279.878 1920.45L133.378 1920.45C114.792 1920.45 99.486 1927.01 88.5532 1937.94C77.0737 1949.42 71.0606 1964.72 71.0606 1982.75L71.0606 1983.3C71.0606 2001.33 77.0737 2016.64 88.5532 2028.11C99.486 2039.04 114.792 2045.6 133.378 2045.6L159.617 2045.6L159.617 1983.3L227.4 1983.3L227.4 2113.91L133.378 2113.91C95.6595 2113.91 62.861 2099.7 39.902 2076.2C16.943 2052.71 3.2769 2021.01 3.2769 1983.3L3.2769 1982.75Z" />
          <path d="M249.386 1841.48C216.942 1841.48 185.779 1837.25 155.909 1828.79C126.395 1820.69 99.826 1808.53 76.2297 1792.3C52.9484 1776.39 34.3277 1756.75 20.4064 1733.4C6.78077 1710.28 0.000367637 1683.85 -8.55966e-07 1654.21C9.14896e-07 1613.7 14.0077 1582.12 42.2388 1559.95C70.6926 1538.27 109.57 1527.59 158.429 1527.59C190.493 1527.59 221.458 1531.63 251.314 1539.72C281.186 1548.18 307.791 1560.35 331.023 1576.22C354.674 1592.49 373.317 1612.32 386.876 1635.7C400.859 1659.16 407.82 1685.76 407.821 1715.4C407.821 1755.92 393.616 1787.32 365.002 1809.13L362.34 1811.13C334.485 1831.48 296.719 1841.48 249.386 1841.48Z" />
          <path d="M9.28595 1297.19L403.962 1297.19L403.962 1365.51L113.148 1365.51C101.669 1365.51 92.9222 1369.33 86.9092 1375.34C80.8961 1381.36 77.0696 1390.1 77.0696 1401.58L77.0696 1519.07L9.28594 1519.07L9.28595 1297.19Z" />
          <path d="M76.7737 1045.41L76.7737 1194.68L336.272 1194.68L336.272 1045.41L76.7737 1045.41ZM351.512 1210.42L351.512 1265.42L61.5389 1265.42L61.5389 1210.42L6.59115 1210.42L6.59116 1029.68L61.5389 1029.68L61.5389 974.678L351.512 974.678L351.512 1029.68L406.46 1029.68L406.46 1210.42L351.512 1210.42Z" />
          <path d="M9.28595 673.948L403.962 673.948L403.962 763.575L194.051 849.922C187.491 852.654 183.118 855.387 183.118 862.491C183.118 869.596 187.491 874.514 196.238 874.514L403.962 874.514L403.962 942.281L9.28594 942.281L9.28594 852.654L219.197 766.307C225.756 763.574 230.129 760.842 230.129 753.737C230.129 746.633 225.756 741.714 217.01 741.714L9.28594 741.714L9.28595 673.948Z" />
          <path d="M491.83 677.619C497.87 652.985 499.613 628.141 497.037 603.126C494.316 576.695 487.897 551.043 477.804 526.187C468.114 501.776 455.343 478.367 439.508 455.968C424.131 434.061 406.824 414.235 387.585 396.511L382.39 390.765C374.434 384.404 367.077 378.523 359.538 373.131C351.914 367.414 344.285 361.884 336.655 356.545C334.245 355.154 332.544 354.21 330.844 353.266C329.142 352.321 327.439 351.377 325.738 350.432C322.223 348.48 318.372 346.551 314.196 344.644C304.189 338.89 294.314 334.06 284.579 330.167C281.749 329.033 278.918 327.898 277.869 327.561C271.644 325.617 264.37 323.024 257.096 320.43C251.098 318.693 245.246 317.329 239.052 316.162C219.437 311.562 202.157 309.889 187.424 311.484C177.422 312.284 167.777 314.084 158.506 316.904C149.052 320.333 140.864 325.395 133.531 332.117C127.859 335.16 122.668 336.68 117.892 336.961C92.5953 336.379 72.9483 339.742 55.156 347.783C39.4083 354.412 27.0783 364.516 18.5533 378.153C10.7404 391.312 5.6788 405.514 3.2572 420.847C0.856942 436.045 0.861147 451.601 3.2388 467.471C5.57133 483.406 9.09149 497.93 13.843 510.993C24.7564 539.829 40.0868 566.967 59.8171 592.494C79.7666 617.815 100.675 640.258 122.59 659.862C138.341 673.689 154.984 686.884 172.569 699.496C190.712 712.227 209.387 723.385 228.644 733.011C248.286 743.018 268.509 751.117 289.326 757.292C310.369 763.915 331.827 767.815 353.669 768.985C368.66 769.774 383.302 768.786 397.576 766.011C411.997 763.208 425.307 758.191 437.448 750.934C450.074 743.991 460.889 734.796 469.843 723.403C479.265 711.894 486.136 698.258 490.542 682.64L491.83 677.619Z" />
          <path d="M9.28601 4.46429e-06L403.962 2.17161e-05L403.962 107.114L211.544 140.997C204.984 142.09 200.611 145.916 200.611 152.474C200.611 159.032 204.984 162.857 211.544 163.95L403.962 197.834L403.962 304.948L9.286 304.948L9.286 238.275L199.518 238.275C207.171 238.275 212.09 233.356 212.09 226.798C212.09 219.694 207.171 215.868 201.157 214.775L9.286 180.892L9.286 124.056L201.157 90.1728C207.171 89.0798 212.09 85.2542 212.09 78.1497C212.09 71.5917 207.171 66.6732 199.518 66.6732L9.28601 66.6732L9.28601 4.46429e-06Z" />
        </svg>
      </div>

      <header className="hero-nav sticky top-0 z-40 w-full px-6 py-6 sm:px-10 lg:px-14">
        <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-[#141414] hover:opacity-80 transition-opacity"
            aria-label="Monolog home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 986 233"
              className="h-[21px] w-auto fill-current"
            >
              <path d="M924.823 230.784C907.234 230.784 892.449 224.411 881.488 213.705C870.527 202.999 863.9 187.705 863.9 170.116V101.801C863.9 84.2125 870.527 68.9181 881.488 58.2121C892.449 47.506 907.234 41.1333 924.823 41.1333H925.077C942.666 41.1333 957.451 47.506 968.412 58.2121C979.373 68.9181 986 84.2125 986 101.801V105.625H954.137V101.801C954.137 93.1343 951.078 85.9969 945.98 80.8987C940.627 75.5457 933.489 72.7417 925.077 72.7417H924.823C916.411 72.7417 909.273 75.5457 903.92 80.8987C898.822 85.9969 895.763 93.1343 895.763 101.801V170.116C895.763 178.783 898.822 185.92 903.92 191.018C909.273 196.371 916.411 199.175 924.823 199.175H925.077C933.489 199.175 940.627 196.371 945.98 191.018C951.078 185.92 954.137 178.783 954.137 170.116V157.881H925.077V126.272H986V170.116C986 187.705 979.373 202.999 968.412 213.705C957.451 224.411 942.666 230.784 925.077 230.784H924.823Z" />
              <path d="M771.576 230.852C753.056 230.852 738.784 224.472 728.76 211.713C718.905 198.781 713.978 181.022 713.978 158.435C713.978 143.606 715.847 129.295 719.585 115.502C723.493 101.708 729.1 89.466 736.406 78.7759C743.882 67.9133 752.972 59.3785 763.676 53.1713C774.38 46.7917 786.528 43.6019 800.121 43.6019C818.641 43.6019 832.828 50.0677 842.682 62.9993C852.537 75.7585 857.464 93.4317 857.464 116.019C857.464 131.02 855.51 145.417 851.602 159.211C847.865 172.832 842.258 185.074 834.782 195.936C827.476 206.626 818.471 215.161 807.767 221.541C797.232 227.748 785.169 230.852 771.576 230.852ZM774.125 205.247C783.13 205.247 791.116 202.747 798.082 197.747C805.048 192.746 810.825 186.108 815.412 177.832C820.17 169.383 823.738 160.245 826.116 150.417C828.495 140.417 829.685 130.502 829.685 120.674C829.685 103.949 826.966 91.2764 821.529 82.6554C816.092 73.8619 808.106 69.4651 797.572 69.4651C788.567 69.4651 780.581 71.9652 773.615 76.9655C766.649 81.9657 760.787 88.6039 756.03 96.8801C751.272 105.156 747.704 114.295 745.326 124.295C742.947 134.296 741.758 144.21 741.758 154.038C741.758 170.59 744.561 183.263 750.168 192.057C755.775 200.85 763.761 205.247 774.125 205.247Z" />
              <path d="M605.055 227.982V43.9392H636.918V179.55C636.918 184.903 638.702 188.981 641.506 191.785C644.31 194.589 648.389 196.373 653.742 196.373H708.547V227.982H605.055Z" />
              <path d="M458.291 200.064V71.9503H483.946V200.064H458.291ZM483.946 225.686V200.064H560.909V225.686H483.946ZM483.946 71.9503V46.3276H560.909V71.9503H483.946ZM560.909 200.064V71.9503H586.563V200.064H560.909Z" />
              <path d="M314.352 227.982V43.9392H356.157L396.432 141.823C397.706 144.882 398.981 146.921 402.295 146.921C405.609 146.921 407.903 144.882 407.903 140.804V43.9392H439.511V227.982H397.707L357.431 130.098C356.157 127.039 354.882 125 351.568 125C348.255 125 345.96 127.039 345.96 131.117V227.982H314.352Z" />
              <path d="M317.378 7.21109C324.248 9.14881 330.149 12.1435 335.081 16.1951C340.014 20.0705 343.977 24.7387 346.972 30.1996C350.143 35.4843 352.345 41.2975 353.578 47.6391C354.811 53.9808 355.251 60.4986 354.899 67.1925C354.37 77.0573 352.609 86.746 349.614 96.2584C346.796 105.771 343.096 115.019 338.516 124.003C334.112 132.811 329.004 141.355 323.191 149.634C317.378 157.737 311.3 165.4 304.958 172.622C295.974 182.663 285.669 192.264 274.043 201.424C262.417 210.408 250.086 217.366 237.05 222.299C231.237 224.413 224.719 225.998 217.497 227.055C210.45 228.112 203.58 228.112 196.886 227.055C190.192 225.998 184.027 223.796 178.39 220.449C172.753 216.926 168.525 211.817 165.706 205.123C162.183 197.373 160.686 188.741 161.214 179.228C161.214 178.348 161.126 177.643 160.95 177.115C160.774 174.12 159.805 171.037 158.044 167.866C155.049 164.695 152.847 161.172 151.438 157.297C150.205 153.245 149.412 149.017 149.06 144.614C148.355 138.272 149.06 130.609 151.173 121.625C151.702 118.807 152.318 116.164 153.023 113.698C153.904 111.232 154.785 108.766 155.665 106.299V106.035C156.018 105.154 156.282 104.362 156.458 103.657C156.81 102.776 157.163 101.895 157.515 101.015C159.277 96.6108 161.479 92.1188 164.121 87.5387C165.002 85.6009 165.882 83.8394 166.763 82.254C167.644 80.6685 168.525 79.0831 169.406 77.4977C171.872 73.9746 174.426 70.4514 177.068 66.9283C179.711 63.229 182.617 59.6178 185.788 56.0946C185.964 55.9185 186.052 55.7423 186.052 55.5662C186.229 55.39 186.405 55.2139 186.581 55.0377C186.933 54.8616 187.286 54.5973 187.638 54.245C195.741 45.4372 204.813 37.5101 214.854 30.4638C225.071 23.2414 235.729 17.4282 246.827 13.0243C258.101 8.44419 269.727 5.5376 281.706 4.30451C293.684 3.0714 305.575 4.04026 317.378 7.21109ZM320.548 120.568C323.367 115.636 326.009 110.175 328.475 104.186C330.942 98.02 332.967 91.7664 334.553 85.4248C336.138 78.907 337.019 72.4772 337.195 66.1356C337.371 59.7939 336.579 53.7165 334.817 47.9033C333.936 45.6133 332.967 43.5875 331.91 41.8259C330.854 39.8882 329.708 37.9505 328.475 36.0128C322.662 30.0234 316.232 25.7956 309.186 23.3295C302.14 20.6871 294.829 19.454 287.255 19.6302C279.856 19.6302 272.369 20.7752 264.795 23.0652C257.22 25.3553 249.997 28.1738 243.127 31.5208C233.086 36.4531 224.014 42.1783 215.911 48.6961C207.808 55.2139 200.409 62.5244 193.715 70.6276C191.425 73.4461 189.311 76.3527 187.374 79.3474C185.612 82.342 183.851 85.5129 182.089 88.8598C179.094 94.4969 176.188 100.927 173.369 108.149C170.727 115.195 169.053 122.33 168.349 129.552C168.701 131.314 169.406 132.547 170.463 133.251C171.696 133.78 173.545 133.339 176.012 131.93C177.421 131.049 178.742 129.464 179.975 127.174C181.384 124.884 182.617 123.034 183.674 121.625C185.612 119.159 187.462 116.781 189.223 114.491C191.161 112.024 193.275 109.646 195.565 107.356C208.072 92.383 221.284 81.197 235.2 73.7984C240.661 70.8038 246.298 68.2495 252.111 66.1356C257.925 63.8456 263.914 62.2601 270.079 61.3794C272.369 61.027 274.571 61.027 276.685 61.3794C278.975 61.7317 281.001 62.2602 282.763 62.9648C284.172 63.4932 285.317 64.2859 286.198 65.3429C287.255 66.3998 288.135 67.5449 288.84 68.7779C289.545 69.8349 289.985 70.8918 290.161 71.9488C290.514 72.8296 290.778 73.358 290.954 73.5342C291.482 74.415 291.394 75.56 290.69 76.9693C289.985 78.3785 288.928 78.907 287.519 78.5547C283.996 77.1454 280.385 76.4408 276.685 76.4408C272.986 76.2646 269.287 76.5289 265.587 77.2335C254.137 80.2282 242.511 86.9221 230.708 97.3154C219.082 107.532 207.984 120.92 197.415 137.479C196.005 139.945 194.948 142.323 194.244 144.614C193.891 145.494 193.451 146.727 192.923 148.313C192.394 149.722 192.306 150.867 192.658 151.748C193.011 153.157 193.891 154.302 195.301 155.183C196.886 156.064 198.383 156.504 199.793 156.504C202.435 156.328 205.077 155.799 207.72 154.919C210.538 154.038 213.269 152.893 215.911 151.484C216.792 151.131 217.496 150.779 218.025 150.427C218.73 149.898 219.434 149.458 220.139 149.106C224.367 146.287 228.242 143.204 231.765 139.857C235.288 136.334 238.283 132.547 240.749 128.495C241.63 127.086 242.511 125.501 243.392 123.739C244.449 121.801 245.682 120.392 247.091 119.511C250.086 117.75 252.552 117.838 254.489 119.775C256.603 121.713 258.013 123.915 258.717 126.381C259.598 130.081 259.422 133.604 258.189 136.951C257.132 140.122 255.37 143.204 252.904 146.199C250.086 149.898 246.65 153.333 242.599 156.504C238.547 159.675 234.408 162.493 230.18 164.96C225.247 168.307 220.051 171.213 214.59 173.679C209.129 176.146 203.58 177.995 197.943 179.228C196.358 179.757 194.508 180.285 192.394 180.814C189.223 181.871 186.933 183.368 185.524 185.306C184.291 187.067 183.586 189.005 183.41 191.119C183.41 193.233 183.851 195.435 184.731 197.725C185.788 199.839 187.197 201.776 188.959 203.538C189.311 203.89 189.664 204.243 190.016 204.595C190.544 204.947 190.985 205.3 191.337 205.652C195.565 208.647 199.793 210.496 204.02 211.201C208.424 211.729 213.181 211.553 218.289 210.672C222.693 209.968 228.859 207.766 236.786 204.067C244.889 200.367 253.697 194.906 263.209 187.684C272.898 180.461 282.763 171.389 292.804 160.468C302.845 149.37 312.093 136.07 320.548 120.568Z" />
              <path d="M0 227.982V43.9392H49.9617L65.7659 133.666C66.2757 136.725 68.0601 138.764 71.1189 138.764C74.1778 138.764 75.9622 136.725 76.472 133.666L92.2762 43.9392H142.238V227.982H111.139V139.274C111.139 135.706 108.845 133.411 105.786 133.411C102.472 133.411 100.688 135.706 100.178 138.51L84.3741 227.982H57.8638L42.0596 138.51C41.5498 135.706 39.7654 133.411 36.4516 133.411C33.3928 133.411 31.0986 135.706 31.0986 139.274V227.982H0Z" />
            </svg>
          </Link>

          <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-[13.5px] font-medium tracking-normal text-[#141414]">
            <a href="#about" className="hover:opacity-60 transition-opacity">
              About
            </a>
            <a href="#work" className="hover:opacity-60 transition-opacity">
              Work
            </a>
            <a href="#services" className="hover:opacity-60 transition-opacity">
              Services
            </a>
            <a href="#process" className="hover:opacity-60 transition-opacity">
              Process
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSoundToggle}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="group flex h-8 w-8 items-center justify-center rounded border border-black/20 bg-black/4 hover:bg-black/10 transition-colors text-[#141414]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 26"
                className="h-4 w-4 stroke-current transition-transform duration-200 group-hover:scale-105"
                fill="none"
              >
                <path
                  d="M17 10.002C17.6491 10.8674 18 11.9201 18 13.002C18 14.0838 17.6491 15.1365 17 16.002"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={
                    isMuted ? "opacity-0" : "opacity-100 transition-opacity"
                  }
                />
                <path
                  d="M20.364 6.63794C21.1998 7.47367 21.8627 8.46583 22.315 9.55776C22.7673 10.6497 23.0001 11.82 23.0001 13.0019C23.0001 14.1838 22.7673 15.3542 22.315 16.4461C21.8627 17.5381 21.1998 18.5302 20.364 19.3659"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={
                    isMuted ? "opacity-0" : "opacity-100 transition-opacity"
                  }
                />
                {isMuted && (
                  <>
                    <path
                      d="M23 10.002L17 16.002"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 10.002L23 16.002"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
                <path
                  d="M12 5.70398C11.9998 5.56469 11.9583 5.42859 11.8809 5.31284C11.8034 5.19709 11.6934 5.10688 11.5647 5.05361C11.436 5.00033 11.2944 4.98637 11.1577 5.01349C11.0211 5.04061 10.8956 5.10759 10.797 5.20598L7.413 8.58898C7.2824 8.72036 7.12703 8.82451 6.95589 8.89541C6.78475 8.9663 6.60124 9.00252 6.416 9.00198H4C3.73478 9.00198 3.48043 9.10734 3.29289 9.29487C3.10536 9.48241 3 9.73676 3 10.002V16.002C3 16.2672 3.10536 16.5216 3.29289 16.7091C3.48043 16.8966 3.73478 17.002 4 17.002H6.416C6.60124 17.0014 6.78475 17.0377 6.95589 17.1086C7.12703 17.1795 7.2824 17.2836 7.413 17.415L10.796 20.799C10.8946 20.8978 11.0203 20.9651 11.1572 20.9924C11.2941 21.0196 11.436 21.0057 11.5649 20.9522C11.6939 20.8988 11.804 20.8083 11.8815 20.6922C11.959 20.5761 12.0002 20.4396 12 20.3V5.70398Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <a
              href="https://cal.com/byhuy/project-intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 items-center gap-1.5 rounded bg-[#141414] px-3.5 text-xs font-semibold text-[#ddddd8] hover:bg-black/85 transition-all active:scale-[0.98] shadow-sm"
            >
              <span>Start a project</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                className="h-2.5 w-2.5 fill-current"
              >
                <path d="M8.90954 9.09046L9 3L2.90954 3.09046L2.90213 4.32367L6.86437 4.25391L2.55914 8.55914L3.44086 9.44086L7.74609 5.13563L7.68708 9.10862L8.90954 9.09046Z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-between pt-2 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 xl:gap-x-16 items-start">
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between h-full pt-2 lg:pt-14">
            <div className="max-w-[340px] xl:max-w-[360px]">
              <p className="hero-intro-text text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.38] font-medium text-[#141414] tracking-normal">
                We help ambitious B2B companies whose presence hasn&apos;t
                caught up to what they&apos;ve built through change-making
                websites and brand systems.
              </p>

              <div className="hero-intro-btn mt-6 sm:mt-7">
                <a
                  href="https://cal.com/byhuy/project-intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded bg-[#141414] px-4 py-2.5 text-xs sm:text-[13px] font-semibold text-[#ddddd8] hover:bg-black/85 transition-all shadow-sm active:scale-[0.98]"
                >
                  <span>Schedule an intro call</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    className="h-2.5 w-2.5 fill-current transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M8.90954 9.09046L9 3L2.90954 3.09046L2.90213 4.32367L6.86437 4.25391L2.55914 8.55914L3.44086 9.44086L7.74609 5.13563L7.68708 9.10862L8.90954 9.09046Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero-scroll-indicator hidden lg:block pt-24 xl:pt-36">
              <span className="text-xs sm:text-[13px] text-black/60 font-normal tracking-tight select-none">
                (scroll to explore)
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 xl:col-span-8 flex flex-col pt-1 sm:pt-2">
            <h1 className="hero-heading max-w-4xl text-[2.75rem] sm:text-[4rem] md:text-[4.75rem] lg:text-[5.5rem] xl:text-[6.25rem] font-extrabold tracking-[-0.035em] leading-[1.0] sm:leading-[0.96] text-[#141414] mb-10 sm:mb-14 lg:mb-16 select-none">
              <span className="hero-title-line block pb-2 sm:pb-3">
                Anti-normal design that lives up to your ambition
              </span>
            </h1>

            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="hero-visual-card relative w-full aspect-16/10 sm:aspect-16/9.5 rounded-2xl sm:rounded-3xl overflow-hidden border border-black/15 shadow-xl bg-[#c5c4bd]"
            >
              {projects.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activeIndex
                      ? "opacity-100 z-10 scale-100"
                      : "opacity-0 z-0 scale-[1.03]"
                  }`}
                  style={{ transitionProperty: "opacity, transform" }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 68vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              ))}

              <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 flex flex-col gap-2.5 max-w-[92%] sm:max-w-[350px]">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveIndex(1);
                  }}
                  className={`hero-badge-tab flex items-center gap-3.5 p-2 sm:p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 text-left border ${
                    activeIndex === 1
                      ? "bg-[#ddddd8]/92 sm:bg-white/90 text-[#141414] border-black/10 shadow-lg scale-[1.01]"
                      : "bg-[#141414]/55 text-white/90 border-white/10 hover:bg-[#141414]/70"
                  }`}
                >
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded bg-[#141414] p-1.5 shadow-sm">
                    <svg
                      viewBox="0 0 351 351"
                      className="h-full w-full fill-[#E8E8E3]"
                    >
                      <path d="M185.855 116.299H211.343V163.799H258.347V116.299H284V234.636H258.347V184.984H211.343V234.636H185.855V116.299Z" />
                      <path d="M116.424 237.118C104.397 237.118 93.97 234.47 85.143 229.174C76.4264 223.878 69.6958 216.596 64.9513 207.327C60.3171 197.949 58 187.301 58 175.385C58 163.468 60.3171 152.876 64.9513 143.608C69.6958 134.229 76.4264 126.947 85.143 121.761C93.97 116.465 104.397 113.816 116.424 113.816C128.34 113.816 138.712 116.465 147.539 121.761C156.366 126.947 163.096 134.229 167.731 143.608C172.475 152.876 174.847 163.468 174.847 175.385C174.847 187.301 172.475 197.949 167.731 207.327C163.096 216.596 156.366 223.878 147.539 229.174C138.712 234.47 128.34 237.118 116.424 237.118ZM116.424 216.099C124.037 216.099 130.216 214.334 134.96 210.803C139.815 207.162 143.291 202.307 145.387 196.238C147.594 190.17 148.697 183.219 148.697 175.385C148.697 167.661 147.594 160.765 145.387 154.696C143.291 148.628 139.815 143.828 134.96 140.297C130.216 136.656 124.037 134.836 116.424 134.836C108.81 134.836 102.576 136.656 97.7215 140.297C92.977 143.828 89.5565 148.628 87.4601 154.696C85.3637 160.655 84.3155 167.551 84.3155 175.385C84.3155 183.219 85.3637 190.17 87.4601 196.238C89.5565 202.307 92.977 207.162 97.7215 210.803C102.576 214.334 108.81 216.099 116.424 216.099Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-[13px] font-semibold leading-snug line-clamp-2">
                      OH Architecture saved 20+ hours a month from qualifying
                      leads
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[9.5px] font-mono tracking-wider opacity-65">
                      <span>CLIENT NEWS</span>
                      <span>•</span>
                      <span>2026</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveIndex(0);
                  }}
                  className={`hero-badge-tab flex items-center gap-3.5 p-2 sm:p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 text-left border ${
                    activeIndex === 0
                      ? "bg-[#ddddd8]/92 sm:bg-white/90 text-[#141414] border-black/10 shadow-lg scale-[1.01]"
                      : "bg-[#141414]/55 text-white/90 border-white/10 hover:bg-[#141414]/70"
                  }`}
                >
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded bg-[#141414] p-1.5 shadow-sm">
                    <svg
                      viewBox="0 0 351 351"
                      className="h-full w-full fill-[#E8E8E3]"
                    >
                      <path d="M80.8633 208.609C92.2969 208.89 104.573 208.674 116.103 208.683L177.324 208.82L199.617 208.865C208.73 208.894 217.879 209.036 226.838 210.335C239.034 212.104 250.997 216.51 250.369 230.92C250.162 235.67 248.707 240.282 245.11 243.702C234.487 252.972 215.015 252.631 201.711 252.627C197.043 252.625 192.498 252.748 187.994 252.69C186.29 252.198 179.645 252.398 177.438 252.405L163.413 252.412L154.336 252.441C153.206 252.449 151.182 252.36 150.153 252.485L150.066 252.718C145.841 252.935 140.534 252.797 136.26 252.788L114.589 252.809L93.8293 252.844C90.594 252.85 86.5236 253.02 83.3738 252.839C82.1771 252.034 81.5523 251.216 80.8633 250.008V235.799C84.5041 235.58 89.6626 235.745 93.4843 235.734L118.79 235.693L186.383 235.402L204.34 235.379C207.656 235.371 210.948 235.328 214.262 235.283C218.347 235.228 223.192 234.913 225.351 230.79C225.253 229.247 225.166 228.434 224.079 227.173C222.884 225.787 219.598 224.74 217.788 224.549C211.406 223.875 204.877 223.808 198.477 223.788L176.104 223.74L112.787 223.71L92.2485 223.708C88.5279 223.709 84.5611 223.793 80.8633 223.679V208.609Z" />
                      <path d="M270 140.187C262.985 140.38 254.931 140.175 247.851 140.166L204.282 140.141L171.383 140.115C164.903 140.148 158.423 140.112 151.944 140.008C140.33 139.899 127.661 139.621 116.353 136.665C114.245 136.114 111.131 134.727 109.214 133.665C99.9328 128.524 99.5069 112.56 107.396 106.072C112.244 102.086 118.884 100.332 124.95 99.3473C138.889 97.478 153.191 97.8362 167.227 97.8321L219.25 97.8979L252.152 97.9055L260.978 97.894C263.021 97.8767 265.232 97.7748 267.246 97.9349C268.636 98.7867 269.217 99.3457 270 100.729V114.824C259.702 115.044 248.681 114.825 238.309 114.824L175.371 114.826L151.36 114.826C145.477 114.822 138.62 114.645 132.829 115.475C123.723 116.781 125.92 123.846 133.843 124.279C141.391 125.086 148.699 125.019 156.257 125.028L182.5 125.044L270 125.161V140.187Z" />
                      <path d="M270 169.191C266.538 169.072 262.576 169.163 259.08 169.167L238.069 169.211L173.574 169.295L153.775 169.319C144.478 169.315 135.041 169.163 125.839 167.857C119.636 166.976 112.131 164.975 107.305 160.999C102.931 157.394 100.96 151.468 100.714 145.994C100.685 145.339 100.576 145.223 100.954 144.77C101.622 144.643 107.201 144.742 108.233 144.744C114.014 144.769 119.794 144.75 125.574 144.687C125.545 149.714 130.219 151.168 134.469 151.68C141.514 152.528 148.781 152.308 155.876 152.311L183.772 152.307L244.488 152.135C252.944 152.094 261.563 152.202 270 152.056V169.191Z" />
                      <path d="M80.8633 181.319C92.9347 181.452 105.007 181.489 117.079 181.43L177.053 181.472L199.467 181.505C203.812 181.514 208.08 181.499 212.422 181.702C229.216 182.486 249.236 184.358 249.352 205.799C247.465 206.065 243.851 205.889 241.812 205.923C236.107 206.019 230.137 205.724 224.445 205.928C224.296 204.131 223.924 202.497 222.447 201.305C220.481 199.717 217.064 198.894 214.586 198.727C207.203 198.233 199.675 198.38 192.285 198.385L157.06 198.367L106.85 198.351L90.2209 198.345C87.2603 198.344 83.7816 198.263 80.8633 198.386V181.319Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-[13px] font-semibold leading-snug line-clamp-2">
                      Supersolid launches campaign for Fujifilm Australia and
                      Ubank
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[9.5px] font-mono tracking-wider opacity-65">
                      <span>CLIENT NEWS</span>
                      <span>•</span>
                      <span>2026</span>
                    </div>
                  </div>
                </button>
              </div>

              <div className="absolute right-3.5 bottom-3.5 sm:right-6 sm:bottom-6 z-20">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveIndex((prev) => (prev + 1) % projects.length);
                  }}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/75 backdrop-blur-md border border-black/15 shadow-md hover:scale-110 active:scale-95 transition-all text-[#e25442]"
                  aria-label="Next project"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-none stroke-current stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 z-20">
                <div
                  key={activeIndex}
                  className="h-full bg-[#141414] transition-all"
                  style={{
                    animation: isHovered
                      ? "none"
                      : "heroProgress 6s linear infinite",
                  }}
                />
              </div>
            </div>

            <div className="lg:hidden mt-8 text-center">
              <span className="text-xs text-black/60 font-normal tracking-tight">
                (scroll to explore)
              </span>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes heroProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
