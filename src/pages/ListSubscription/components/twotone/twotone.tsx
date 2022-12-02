import { useState } from 'react';
import Modal from 'react-modal';
import './twotone.css';

const Twotone = ({ picUser, picSinger, nameUser = "User", nameSinger = "Singer", status = 1, userID = 1, singerID = 1 }: { picUser: string, picSinger: string, nameUser: string, nameSinger: string, status: number, userID: number, singerID: number }) => {
    const [isOpenModal, setOpenModal] = useState(false);
    function closeModal() {
        setOpenModal(false);
    }

    // Status = 1 --> ACCEPTED
    // Status = 0 --> PENDING
    // Status = -1 --> REJECTED
    function reqSubs({user_id, singer_id, action}: {user_id: number, singer_id: number, action: number}) {
        // console.log(user_id, singer_id, action);
        // setup request
        // let bodyContent = JSON.stringify({
        //     user_id: user_id,
        //     singer_id: singer_id,
        //     action: action,
        // });
        // make request
        // fetch("", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: bodyContent
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // use request
        //         console.log(data);
        //         setSubsList(data);
        //     })
        //     .catch(err => console.log("error:", err));
    }

    return (
        <>
            <div className='twotone' style={{"--bordercolor": status === 1 ? "#1ED760" : status === 0 ? "#FFFFFF" : "#FF0000"} as React.CSSProperties} onClick={() => setOpenModal(true)}>
                <div className="circle" style={{"--b1": picUser, "--b2": picSinger} as React.CSSProperties}></div>
                <div className='twotoneTextBold'>{nameUser}</div>
                <div className='twotoneTextLight'>asks for</div>
                <div className='twotoneTextBold'>{nameSinger}</div>
            </div>
            <Modal isOpen={isOpenModal} onRequestClose={closeModal} className="mymodal" overlayClassName="myoverlay">
                <div className='modalText'>What to do with this subscription request?</div>
                <div className='modalButtons'>
                    <div className='modalButton' onClick={() => reqSubs({user_id: userID, singer_id: singerID, action: 1})}>Approve</div>
                    <div className='modalButton' onClick={() => reqSubs({user_id: userID, singer_id: singerID, action: -1})}>Reject</div>
                </div>
            </Modal>
        </>
        
    );
};

export default Twotone;