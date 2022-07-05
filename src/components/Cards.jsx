
import React, { useEffect, useState } from 'react'
import Card from './Card'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function Cards({ blurred, setBlur }) {
    const imgs = [
        { _id: 'img1', id: 1, img: '/img/html.png', stat: "" },
        { _id: 'img2', id: 1, img: '/img/html.png', stat: "" },
        { _id: 'img3', id: 2, img: '/img/css.png', stat: "" },
        { _id: 'img4', id: 2, img: '/img/css.png', stat: "" },
        { _id: 'img5', id: 3, img: '/img/js.png', stat: "" },
        { _id: 'img6', id: 3, img: '/img/js.png', stat: "" },
        { _id: 'img7', id: 4, img: '/img/scss.png', stat: "" },
        { _id: 'img8', id: 4, img: '/img/scss.png', stat: "" },
        { _id: 'img9', id: 5, img: '/img/react.png', stat: "" },
        { _id: 'img10', id: 5, img: '/img/react.png', stat: "" },
        { _id: 'img11', id: 6, img: '/img/vue.png', stat: "" },
        { _id: 'img12', id: 6, img: '/img/vue.png', stat: "" },
        { _id: 'img13', id: 7, img: '/img/angular.png', stat: "" },
        { _id: 'img14', id: 7, img: '/img/angular.png', stat: "" },
        { _id: 'img15', id: 8, img: '/img/nodejs.png', stat: "" },
        { _id: 'img16', id: 8, img: '/img/nodejs.png', stat: "" }
    ]
    const [items, setItems] = useState([...imgs].sort(() => Math.random() - 0.5))
    const [prev, setPrev] = useState(-1);
    const [disableInput, setDisableInput] = useState(false);
    const [confetti, setConfetti] = useState(false);

    const { width, height } = useWindowSize()

    useEffect(() => {
        setPrev(-1)
        setItems([...imgs].sort(() => Math.random() - 0.5));
        if (!blurred) {
            setConfetti(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blurred]);

    useEffect(() => {
        if (items.every(item => item.stat === 'correct')) {
            setConfetti(true)
            setBlur(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const checkIfSelectedCardisActive = (current) => {
        if (items[current].id === items[prev].id) {
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setItems([...items]);
            setPrev(-1)
        } else {
            setDisableInput(true);
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            setItems([...items]);
            setTimeout(() => {
                setDisableInput(false);
                items[current].stat = "";
                items[prev].stat = "";
                setPrev(-1)
            }, 1000);
        }
    }
    function handleClick(id) {
        if (disableInput) return false;
        if (prev > -1 && items[id]._id === items[prev]._id) return false
        if (items[id].stat === "correct") return false
        if (prev === -1) {
            items[id].stat = "active";
            setItems([...items]);
            setPrev(id)
        } else {
            checkIfSelectedCardisActive(id)
        }
    }
    return (
        <>
            {confetti && <Confetti
                width={width}
                height={height}
            />}
            <div className="wrapper">
                {confetti && <span className="congratulations">Congratulations</span>}

                <div className={`container  ${blurred ? ' blurred ' : ''}`}>
                    {!blurred && items.map((item, i) => {
                        return <Card key={i} id={i} item={item} handleClick={handleClick} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Cards
