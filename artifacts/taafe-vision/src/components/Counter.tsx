import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      let totalMilisecondsSecs = duration * 1000;
      let timerStep = Math.max(totalMilisecondsSecs / end, 20);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, timerStep);

      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}
