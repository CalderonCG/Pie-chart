import { useDraggable } from "@dnd-kit/core";
import type { SkillType } from "../../App";
import "./Skill.scss";

type SkillProps = {
  skill: SkillType;
};

function Skill({ skill }: SkillProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({ id: skill.id });
  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  }: undefined
  
  return (
    <div className="skill" ref={setNodeRef}
    {...listeners} {...attributes} 
    >
      <p>{skill.skill}</p>
      <p>{skill.points} SP</p>
    </div>
  );
}

export default Skill;
