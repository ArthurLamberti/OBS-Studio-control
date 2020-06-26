import React from 'react';
import './style.css'

interface Props { 
  title: String,
  click: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Option: React.FC<Props> = ({title, click}) => {
  return (
    <button className="square" onClick={click}>{title}</button>
  )
}

export default Option