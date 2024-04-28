import {Link} from 'react-router-dom'

import './index.css'

const TechItem = props => {
  const {techData} = props
  const {id, name, logoUrl} = techData

  return (
    <Link to={`/te/courses/${id}`} className="item-link">
      <li className="item-container">
        <img className="item-image" src={logoUrl} alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default TechItem
