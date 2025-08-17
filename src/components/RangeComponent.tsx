import { useEffect, useRef, useState } from "react"

export interface RangeProps{
    limit: number,
    start: number,
    value: number,
    step: number,
    onChange?: (value: number) => void
}

export default function RangeComponent(props: RangeProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState(props.value)

    useEffect(() =>{
        setInternalValue(props.value)
    }, [props.value])


      const updateValueFromPosition = (clientX: number) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const rawValue = (x / rect.width) * (props.limit - props.start) + props.start;
        const steppedValue = Math.round(rawValue / props.step) * props.step;

        setInternalValue(steppedValue);
        props.onChange?.(steppedValue);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        updateValueFromPosition(e.clientX);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        updateValueFromPosition(e.clientX);
    };

    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        updateValueFromPosition(e.touches[0].clientX);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
        updateValueFromPosition(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
    };

    const percent = ((internalValue - props.start) / (props.limit - props.start)) * 100;


    return (
    <div 
    onMouseDown={handleMouseDown}
    onTouchStart={handleTouchStart}
    ref={sliderRef}
    className="w-full h-1 bg-light-gray-200 rounded-3xl cursor-pointer relative">
        <div 
        style={{width: `${percent}%`}}
        className="absolute h-full bg-white rounded-3xl"></div> 
        <div 
        style={{left:`${percent}%`, transform: "translate(-50%, -50%)"}}
        className="absolute size-3 rounded-full bg-white cursor-pointer top-1/2"></div> 
    </div>
  )
}
