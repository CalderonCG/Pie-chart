import { useDraggable } from "@dnd-kit/core";
import type { SkillType } from "../../App";
import "./Skill.scss";
import clsx from "clsx";

type SkillProps = {
  skill: SkillType;
};

function Skill({ skill }: SkillProps) {
  const {attributes, listeners, setNodeRef} = useDraggable({ id: skill.id });

  
  return (
    <div className={clsx('skill',{active: skill.status=== 'EQUIPPED'})} ref={setNodeRef}
    {...listeners} {...attributes} 
    >
      <img src={`/images/${skill.type}.png`} 
      className={clsx('skill_icon', {active_icon: skill.status=== 'EQUIPPED'})} alt="icon" />
      <p className="skill_name">{skill.skill}</p>
      <p className="skill_cost">{skill.points} BP</p>
    </div>
  );
}

export default Skill;
