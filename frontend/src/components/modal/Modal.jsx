import "../../styles/model/modeloverlay.css"

export default function Modal({isOpen,onClose,children}){
   if(!isOpen)return null;

   return(
    <div
    className="modal-overlay"
    onClick={onClose}
>

    <div
        className="modal"
        onClick={(e)=>e.stopPropagation()}
    >

        <button
            className="close-btn"
            onClick={onClose}
        >
            ×
        </button>

        {children}

    </div>

</div>
   );
}