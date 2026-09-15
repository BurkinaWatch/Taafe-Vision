import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  animate?: boolean;
}

export function Counter({ value, suffix = "", duration = 2, animate = true }: CounterProps) {
  const [count, setCount] = useState(animate ? 0 : value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!animate) {
      setCount(value);
      return undefined;
    }

    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) {
        return undefined;
      }

      let totalMilisecondsSecs = duration * 1000;
      let timerStep = Math.max(totalMilisecondsSecs / end, 20);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, timerStep);

      return () => clearInterval(timer);
    }

    return undefined;
  }, [value, duration, isInView, animate]);

  return <span ref={ref}>{count.toLocaleString("de-DE")}{suffix}</span>;
}
