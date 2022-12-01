import { useState } from 'react';
import Modal from 'react-modal';
import './row.css'

const Row = ({ nameUser = "User", nameSinger = "Singer", status = 1, userID = 1, singerID = 1, num }: { nameUser: string, nameSinger: string, status: number, userID: number, singerID: number, num: number }) => {
    const [isOpenModal, setOpenModal] = useState(false);
    function closeModal() {
        setOpenModal(false);
    }

    // Status = 1 --> ACCEPTED
    // Status = 0 --> PENDING
    // Status = -1 --> REJECTED
    function reqSubs({user_id, singer_id, action}: {user_id: number, singer_id: number, action: string}) {
        console.log(user_id, singer_id, action);
        fetch("http://localhost:3000/subscription/update/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                creator_id: user_id,
                subscriber_id: singer_id,
                action: action,
            }),
        })
            .then(res => res.json())
            .then(data => {
                // use request
                console.log(data);
            })
            .catch(err => console.log("error:", err));
    };

    return (
        <>
            <div className='row' style={{"--bgcolor": status === 1 ? "rgba(30, 215, 96, 0.5)" : status === 0 ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 0, 0, 0.5)"} as React.CSSProperties} onClick={() => setOpenModal(true)}>
                <div className='rowTextLight no1'>{num}</div>
                <div className='rowTextBold no2'>{nameUser}</div>
                <div className='rowTextBold no3'>{nameSinger}</div>
            </div>
            <Modal isOpen={isOpenModal} onRequestClose={closeModal} className="mymodal" overlayClassName="myoverlay">
                <div className='modalText'>What to do with this subscription request?</div>
                <div className='modalButtons'>
                    <div className='modalButton' onClick={() => reqSubs({user_id: userID, singer_id: singerID, action: "ACCEPTED"})}>Approve</div>
                    <div className='modalButton' onClick={() => reqSubs({user_id: userID, singer_id: singerID, action: "REJECTED"})}>Reject</div>
                </div>
            </Modal>
        </>
    );
};

export default Row;