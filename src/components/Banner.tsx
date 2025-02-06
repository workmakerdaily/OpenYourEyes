import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
    // ✅ 연기 위치를 상태값으로 저장 (클라이언트에서만 랜덤값 생성)
    const [smokePositions, setSmokePositions] = useState<{ top: string; left: string }[]>([]);

    useEffect(() => {
        // 클라이언트에서만 실행되도록 랜덤 위치 설정
        const positions = [...Array(4)].map(() => ({
            top: `${Math.random() * 50 + 20}%`,
            left: `${Math.random() * 80 + 10}%`,
        }));
        setSmokePositions(positions);
    }, []);

    // 🎭 연기 애니메이션 설정
    const smokeVariants = {
        initial: { opacity: 0, y: 50, x: 0, scale: 1 },
        animate: {
            opacity: [0.3, 0.6, 0.1],
            y: [-50, -150, -300],
            x: [-20, 20, -40, 40],
            scale: [1, 1.2, 1.5],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            }
        }
    };

    // ✅ 타이핑 효과 적용 (Letter Reveal)
    const title = "OPEN YOUR EYES";
    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
        })
    };

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
                <Image
                    src="/images/banner-image.png"
                    alt="Dramatic Theater Scene"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-50"
                />
            </div>

            {/* 🎭 연기 효과 */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {/* 랜덤한 연기 위치 적용 */}
                {smokePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-48 h-48 bg-white opacity-10 blur-3xl rounded-full"
                        style={{ top: pos.top, left: pos.left }}
                        variants={smokeVariants}
                        initial="initial"
                        animate="animate"
                    />
                ))}
            </motion.div>

            {/* 텍스트 컨텐츠 */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center"
            >
                {/* 🎭 타이핑 효과 (Letter Reveal) 적용 */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-widest uppercase">
                    {title.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </h1>
                <p className="mt-4 text-lg md:text-xl font-light">
                    전례 없는 공연 예술의 세계를 경험해 보세요.
                </p>
            </motion.div>
        </section>
    );
}
