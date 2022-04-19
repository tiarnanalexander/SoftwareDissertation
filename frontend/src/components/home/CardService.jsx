import React from 'react'

const CardService = ({id, icon, title, description }) => {
  return (
    <div className="card" id={id}>
            <img src={icon} alt="Service-icon" width={200} height={200} />
            <div className="info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
  )
}

export default CardService