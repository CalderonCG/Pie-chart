import type { SkillType } from '../../App'
import './Skill.scss'

type SkillProps={
    skill : SkillType
}

function Skill({skill} : SkillProps) {
  return (
    <div className='skill'>
        <p>{skill.skill}</p>
        <p>{skill.points} SP</p>
    </div>
  )
}

export default Skill