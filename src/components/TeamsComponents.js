import { useState, useEffect } from 'react';

const SequentialComponent = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [columnItems, setColumnItems] = useState([]);

    useEffect(() => {
        if (items != null) {
            if (currentIndex < items.length) {
                const timer = setTimeout(() => {
                    setColumnItems(prevItems => [...prevItems, items[currentIndex]]);
                    setCurrentIndex(currentIndex + 1);
                }, 10); // Промежуток времени в миллисекундах, здесь составляет 1 секунду. Можете изменить на нужное время.
                return () => clearTimeout(timer);
            }
        }
    });

    return (
        <div className={"flex flex-col gap-2 w-full items-center"} >
            {
                columnItems.map((item) => (
                    <h1 className={"text-2xl"} key={item}>{item}</h1>
                ))
            }
        </div>
    )
};

export default SequentialComponent;