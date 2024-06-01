"use client";
import React, { useEffect, useState } from "react";
import ThreePointsIcon from "../icons/messenger/three-points";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/provider/ToastProvider";

export const MenuButton = ({
  title,
  icon,
  onClick,
  width = 20,
  height = 20,
}: {
  title: string;
  icon: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}) => {
  return (
    <button
      className="flex flex-row items-start justify-start text-[16px] text-[#878787] gap-2 hover:bg-[#262626] py-2 px-2 w-full rounded"
      onClick={() => onClick && onClick()}
    >
      <div className="w-6 h-6 grid place-content-center">
        <Image src={icon || ""} alt={title} height={height} width={width} />
      </div>
      <p className="lowercase">{title}</p>
    </button>
  );
};

const DropDownMenu = ({ children }: { children: React.ReactNode }) => {
  const [clickedThreePoints, setClickedThreePoints] = useState(false);
  const handleThreePoints = () => {
    setClickedThreePoints(!clickedThreePoints);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const panel = document.getElementById("tournament-menu");
      const trigger = document.getElementById("three-points-trigger");
      if (
        panel &&
        trigger &&
        !panel.contains(target) &&
        !trigger.contains(target)
      ) {
        setClickedThreePoints(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="">
      <div
        id="three-points-trigger"
        className="flex flex-col items-center"
        onClick={handleThreePoints}
      >
        <ThreePointsIcon />
      </div>
      {clickedThreePoints && (
        <div
          id="tournament-menu"
          className="z-[999] absolute top-10 right-3 rounded-md
                     bg-[#161616]  w-[200px] p-4 flex flex-col items-center justify-center gap-1"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
