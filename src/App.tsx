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
import Character from "./components/Character/Character";

//Types-------------------------------------------------------------------------------
export type SkillType = {
  id: string;
  skill: string;
  points: number;
  type: "Jump" | "Hammer" | "Utility";
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
    {
      id: "1",
      skill: "Power Jump",
      points: 5,
      type: "Jump",
      status: "AVAILABLE",
    },
    {
      id: "2",
      skill: "High Jump",
      points: 8,
      type: "Jump",
      status: "AVAILABLE",
    },
    {
      id: "3",
      skill: "Ultra Jump",
      points: 10,
      type: "Jump",
      status: "AVAILABLE",
    },
    {
      id: "4",
      skill: "Super Hammer",
      points: 7,
      type: "Hammer",
      status: "AVAILABLE",
    },
    {
      id: "5",
      skill: "Mega Hammer",
      points: 9,
      type: "Hammer",
      status: "AVAILABLE",
    },
    {
      id: "6",
      skill: "Power Smash",
      points: 6,
      type: "Hammer",
      status: "AVAILABLE",
    },
    {
      id: "7",
      skill: "Lucky Day",
      points: 3,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "8",
      skill: "HP Plus",
      points: 4,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "9",
      skill: "Defense Plus",
      points: 5,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "10",
      skill: "Fire Drive",
      points: 7,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "11",
      skill: "Power Rush",
      points: 6,
      type: "Jump",
      status: "AVAILABLE",
    },
    {
      id: "12",
      skill: "Spike Shield",
      points: 8,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "13",
      skill: "Frighten",
      points: 2,
      type: "Hammer",
      status: "AVAILABLE",
    },
    {
      id: "14",
      skill: "Flower Saver",
      points: 5,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "15",
      skill: "Sleepy Shell",
      points: 4,
      type: "Hammer",
      status: "AVAILABLE",
    },
    {
      id: "16",
      skill: "Bounce Attack",
      points: 6,
      type: "Jump",
      status: "AVAILABLE",
    },
    {
      id: "17",
      skill: "Double Dip",
      points: 3,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "18",
      skill: "Power Plus",
      points: 7,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "19",
      skill: "Ultra Defense",
      points: 9,
      type: "Utility",
      status: "AVAILABLE",
    },
    {
      id: "20",
      skill: "Quick Change",
      points: 5,
      type: "Utility",
      status: "AVAILABLE",
    },
  ];
  //States--------------------------------------------------------------------
  const [skills, setSkills] = useState<SkillType[]>(initialSkills);
  const [activeSkill, setActiveSkill] = useState<SkillType | null>(null);
  const [availablePoints, setAvaiblablePoints] = useState(40);

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
    const newList = skills.map((skill) =>
      skill.id === skillId
        ? {
            ...skill,
            status: newStatus,
          }
        : skill
    );

    const newAvailablePoints =
      40 -
      newList
        .filter((skill) => skill.status === "EQUIPPED")
        .reduce((acc, skill) => acc + skill.points, 0);

    if (newAvailablePoints >= 0) {
      setSkills(newList);
      setAvaiblablePoints(newAvailablePoints);
    } else {
      return;
    }
  }

  //Component-------------------------------------------------------------------

  return (
    <div className="app_container">
      <span className="app_container_title">Skill points</span>
      <div className="app_container_stats">
        <Character
          skills={skills.filter((skill) => skill.status === "EQUIPPED")}
        />
        <Chart
          points={availablePoints}
          data={skills.filter((skill) => skill.status === "EQUIPPED")}
        />
      </div>
      <span className="app_container_title">Skills</span>
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
            {activeSkill ? (
              <div style={{ opacity: 0.8, transform: "scale(1.05)" }}>
                <Skill skill={activeSkill} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
