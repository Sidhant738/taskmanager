import CardContainer from "./CardContainer";

export default function EmptyCard({onClick}){
    return(
        <CardContainer className="Empty" onClick={onClick}>+</CardContainer>
    );
}