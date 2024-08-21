"use client";
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './LoggedOutBackgroundShape.module.css';

const LoggedOutBackgroundShape: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    controls1.start({
      x: mousePosition.x - 700,
      y: mousePosition.y - 600,
      transition: {
        type: 'spring',
        stiffness: 30,
        damping: 35,
        delay: 0.1,
      },
    });

    controls2.start({
      x: mousePosition.x - 700,
      y: mousePosition.y - 700,
      transition: {
        type: 'spring',
        stiffness: 20,
        damping: 50,
        delay: 0.3,
      },
    });
  }, [mousePosition, controls1, controls2]);

  const shapes = [
    { size: 700, color: 'linear-gradient(135deg, rgba(0, 136, 255, 0.7) 0%, rgba(0, 0, 136, 0.7) 30%, rgba(255, 0, 136, 0.7) 100%)', blur: 100, top: '30%', left: '40%', controls: controls1 },
    { size: 600, color: 'linear-gradient(135deg, rgba(255, 0, 136, 0.7) 0%, rgba(0, 136, 255, 0.7) 50%, rgba(255, 136, 0, 0.7) 100%)', blur: 80, top: '60%', left: '60%', controls: controls2 },
  ];

  return (
    <div className={styles.background}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={styles.shape}
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            filter: `blur(${shape.blur}px)`,
            top: shape.top,
            left: shape.left,
          }}
          animate={shape.controls}
          initial={{ x: 0, y: 0 }}
        ></motion.div>
      ))}
    </div>
  );
};

export default LoggedOutBackgroundShape;
