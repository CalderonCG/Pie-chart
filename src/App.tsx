import { useState } from "react";
import "./App.scss";
import Chart from "./components/Chart/Chart";
import SkillList from "./components/SkillList/SkillList";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Skill from "./components/Skill/Skill";

//Types-------------------------------------------------------------------------------
export type SkillType = {
  id: string;
  skill: string;
  points: number;
  status: "AVAILABLE" | "EQUIPPED";
};

export type ColumnType = {
  id: "AVAILABLE" | "EQUIPPED";
  status: "Available" | "Equipped";
};

function App() {
  //Const--------------------------------------------------------------------------
  const columns: ColumnType[] = [
    { id: "AVAILABLE", status: "Available" },
    { id: "EQUIPPED", status: "Equipped" },
  ];
  const initialSkills: SkillType[] = [
    { id: "1", skill: "Scan", points: 10, status: "AVAILABLE" },
    { id: "2", skill: "Dodge Roll", points: 20, status: "AVAILABLE" },
    { id: "3", skill: "Guard", points: 20, status: "AVAILABLE" },
    { id: "4", skill: "Sliding Dash", points: 30, status: "AVAILABLE" },
    { id: "5", skill: "Treasure Magnet", points: 30, status: "AVAILABLE" },
    { id: "6", skill: "Combo Plus", points: 40, status: "AVAILABLE" },
    { id: "7", skill: "Air Combo Plus", points: 40, status: "AVAILABLE" },
    { id: "8", skill: "Leaf Bracer", points: 40, status: "AVAILABLE" },
    { id: "9", skill: "Second Chance", points: 40, status: "AVAILABLE" },
    { id: "10", skill: "Once More", points: 40, status: "AVAILABLE" },
    { id: "11", skill: "MP Haste", points: 30, status: "AVAILABLE" },
    { id: "12", skill: "Lucky Lucky", points: 30, status: "AVAILABLE" },
    { id: "13", skill: "Critical Plus", points: 30, status: "AVAILABLE" },
    { id: "14", skill: "Ars Arcanum", points: 50, status: "AVAILABLE" },
    { id: "15", skill: "Strike Raid", points: 50, status: "AVAILABLE" },
    { id: "16", skill: "Ragnarok", points: 50, status: "AVAILABLE" },
    { id: "17", skill: "Sonic Blade", points: 50, status: "AVAILABLE" },
    { id: "18", skill: "Glide", points: 20, status: "AVAILABLE" },
    { id: "19", skill: "High Jump", points: 20, status: "AVAILABLE" },
    { id: "20", skill: "Explosion", points: 40, status: "AVAILABLE" },
  ];
  //States--------------------------------------------------------------------
  const [skills, setSkills] = useState<SkillType[]>(initialSkills);
  const [activeSkill, setActiveSkill] = useState<SkillType | null>(null);
  console.log(activeSkill);

  //Functions --------------------------------------------------------------
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const skill = skills.find((skill) => skill.id === active.id) || null;
    setActiveSkill(skill);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
     setActiveSkill(null);

    if (!over) return;

    const skillId = active.id as string;

    const newStatus = over.id as SkillType["status"];

    setSkills(() =>
      skills.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              status: newStatus,
            }
          : skill
      )
    );
  }

  //Component-------------------------------------------------------------------

  return (
    <div className="app_container">
      <h1>Skill points</h1>
      <Chart data={skills.filter((skill) => skill.status === "EQUIPPED")} />
      <h1>Skills</h1>
      <div className="app_container_skills">
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          {columns.map((column) => (
            <SkillList
              key={column.id}
              column={column}
              skills={skills.filter((skill) => skill.status === column.id)}
            />
          ))}
                  <DragOverlay>
          
          {activeSkill ? (<div style={{ opacity: 0.8, transform: "scale(1.05)" }}> 
<Skill skill={activeSkill}  />
          </div>)  : null}
        </DragOverlay>
        </DndContext>

      </div>
    </div>
  );
}

export default App;
