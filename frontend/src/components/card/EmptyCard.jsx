import CardContainer from "./CardContainer";
import "../../styles/cards/emptycard.css"
export default function EmptyCard({onClick}){
    return(
        <CardContainer className="Empty" onClick={onClick}>+</CardContainer>
    );
}