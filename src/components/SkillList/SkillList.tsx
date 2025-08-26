import { useDroppable } from '@dnd-kit/core';
import type { ColumnType, SkillType } from '../../App'
import Skill from '../Skill/Skill'
import './SkillList.scss'

type ListProps={
    column: ColumnType;
    skills: SkillType[];
}

function SkillList({skills,column}: ListProps) {
    const {setNodeRef}=useDroppable({
        id: column.id
    })

  return (
    <div className='list' ref={setNodeRef}>
        {skills.map(skill => <Skill key={skill.skill} skill={skill}/>)}
    </div>
  )
}

export default SkillList