import { useEffect, useState } from "react";
import type { SkillType } from "../../App";
import './Character.scss'
type CharacterProps = {
  skills: SkillType[];
};

function Character({ skills }: CharacterProps) {
  const points = skills.reduce<Record<string, number>>((acc, skill) => {
    acc[skill.type] = (acc[skill.type] || 0) + skill.points;
    return acc;
  }, {});

  const [type, setType] = useState<"Empty" | "Hammer" | "Jump" | "Utility">(
    "Empty"
  );

  useEffect(() => {
    const maxType = Object.keys(points).reduce((maxKey, key) => {
      if (!maxKey || points[key] > points[maxKey]) return key;
      return maxKey;
    }, "" as string) as "Empty" | "Hammer" | "Jump" | "Utility";

    setType(maxType || "Empty"); 
  }, [points]);

  return (
    <div className="character">
      <img className="character_image" src={`/images/${type}Char.png`} alt="" />
    </div>
  );
}

export default Character;
