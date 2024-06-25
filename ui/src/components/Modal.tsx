import { ReactNode } from "react";

type Props = {
    isVisible: boolean;
    handleClose: () => void;
    children: ReactNode;
}
const Modal = ({ isVisible, handleClose, children }: Props) => {
    return isVisible ? <dialog open>
        <div className="row center"> <span style={{ padding: '8px', fontSize: 24, margin: '0px 12px', cursor: 'pointer' }} onClick={handleClose}>X</span></div>
        {children}
    </dialog> : <></>
}

export default Modal