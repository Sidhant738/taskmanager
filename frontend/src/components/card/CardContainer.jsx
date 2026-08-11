import "../../styles/cards/card.css";

export default function CardContainer({
    children,
    className = "",
    onClick
}) {

    return (

        <div
            className={`${className} Card`}
            onClick={(e) => {

                e.stopPropagation();

                if (onClick) {
                    onClick(e);
                }

            }}
        >

            {children}

        </div>

    );
}