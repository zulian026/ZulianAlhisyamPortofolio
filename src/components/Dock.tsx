import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
  type SpringOptions,
} from "motion/react";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

type DockItemData = {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

type DockProps = {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
};

type DockItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
};

type InjectedHoverProps = {
  isHovered?: MotionValue<number>;
};

function DockItem({
  children,
  className = "",
  onClick,
  href,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      left: 0,
      width: baseItemSize,
    };

    return val - rect.left - rect.width / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );

  const size = useSpring(targetSize, spring);

  const content = (
    <>
      {Children.map(children, (child) => {
        if (!child) return null;
        return cloneElement(child as ReactElement<InjectedHoverProps>, {
          isHovered,
        });
      })}
    </>
  );

  const sharedProps = {
    ref,
    style: {
      width: size,
      height: size,
    },
    onHoverStart: () => isHovered.set(1),
    onHoverEnd: () => isHovered.set(0),
    onFocus: () => isHovered.set(1),
    onBlur: () => isHovered.set(0),
    className: `relative inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-colors ${className}`,
  };

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        aria-label={href}
        className={`${sharedProps.className} cursor-pointer`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...sharedProps}
      type="button"
      onClick={onClick}
      className={`${sharedProps.className} cursor-pointer`}
      aria-label="Dock item"
    >
      {content}
    </motion.button>
  );
}

function DockLabel({
  children,
  className = "",
  isHovered,
}: {
  children: ReactNode;
  className?: string;
  isHovered?: MotionValue<number>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6, x: "-50%" }}
          animate={{ opacity: 1, y: -8, x: "-50%" }}
          exit={{ opacity: 0, y: 4, x: "-50%" }}
          transition={{ duration: 0.18 }}
          className={`absolute left-1/2 -top-10 whitespace-nowrap rounded-xl border border-white/10 bg-black/80 px-2.5 py-1 text-[11px] text-white shadow-xl ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.12, stiffness: 180, damping: 14 },
  magnification = 72,
  distance = 140,
  panelHeight = 68,
  dockHeight = 220,
  baseItemSize = 52,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + 40),
    [dockHeight, magnification],
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-end justify-center"
    >
      <motion.div
        onMouseMove={(e) => {
          isHovered.set(1);
          mouseX.set(e.pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`pointer-events-auto mb-4 flex items-end gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 pb-2 pt-3 shadow-2xl backdrop-blur-2xl ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Portfolio dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            href={item.href}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon className="text-white">
              <div className="flex flex-col items-center justify-center">
                {item.icon}
              </div>
            </DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
