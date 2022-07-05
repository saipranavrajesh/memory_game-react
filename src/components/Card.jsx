import React from 'react'

export default function Card({ item, id, blurred, handleClick }) {
    const itemClass = item.stat ? " active " + item.stat : "";

    return (
        <div className={'card' + itemClass} onClick={() => handleClick(id)}>
            <img src={item.img} id={id} alt="" />
        </div>
    )
}
