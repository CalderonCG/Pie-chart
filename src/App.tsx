import { useState } from "react";
import "./App.scss";
import Chart from "./components/Chart/Chart";
import SkillList from "./components/SkillList/SkillList";

export type SkillType = {
  skill: string;
  points: number;
};

function App() {
  const [storage, setStorage] = useState<SkillType[]>([]);
  const skills = [
    { skill: "Scan", points: 10 },
    { skill: "Dodge Roll", points: 20 },
    { skill: "Guard", points: 20 },
    { skill: "Sliding Dash", points: 30 },
    { skill: "Treasure Magnet", points: 30 },
    { skill: "Combo Plus", points: 40 },
    { skill: "Air Combo Plus", points: 40 },
    { skill: "Leaf Bracer", points: 40 },
    { skill: "Second Chance", points: 40 },
    { skill: "Once More", points: 40 },
    { skill: "MP Haste", points: 30 },
    { skill: "Lucky Lucky", points: 30 },
    { skill: "Critical Plus", points: 30 },
    { skill: "Ars Arcanum", points: 50 },
    { skill: "Strike Raid", points: 50 },
    { skill: "Ragnarok", points: 50 },
    { skill: "Sonic Blade", points: 50 },
    { skill: "Glide", points: 20 },
    { skill: "High Jump", points: 2 },
    { skill: "Explosion", points: 40 },
  ];

  return (
    <div className="app_container">
      <h1>Skill points</h1>
      <Chart data={storage} />
      <h1>Skills</h1>
      <div className="app_container_skills">
        <SkillList skills={skills} />
        <SkillList skills={storage} />
      </div>
    </div>
  );
}

export default App;
