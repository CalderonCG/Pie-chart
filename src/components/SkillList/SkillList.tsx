import type { SkillType } from '../../App'
import Skill from '../Skill/Skill'
import './SkillList.scss'

type ListProps={
    skills: SkillType[]
}

function SkillList({skills}: ListProps) {
  return (
    <div className='list'>
        {skills.map(skill => <Skill key={skill.skill} skill={skill}/>)}
    </div>
  )
}

export default SkillList