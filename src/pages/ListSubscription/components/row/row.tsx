import { useState } from 'react';
import Modal from 'react-modal';
import './row.css'

const Row = ({ nameUser, nameSinger, status, userID, singerID, num, subsList, setSubsList }: { nameUser: string, nameSinger: string, status: number, userID: number, singerID: number, num: number, subsList: any, setSubsList: any }) => {
    const [isOpenModal, setOpenModal] = useState(false);
    function closeModal() {
        setOpenModal(false);
    }

    // Status = 1 --> ACCEPTED
    // Status = 0 --> PENDING
    // Status = -1 --> REJECTED
    function reqSubs({user_id, singer_id, action}: {user_id: number, singer_id: number, action: string}) {
        // console.log(user_id, singer_id, action);
        // console.log(JSON.stringify({
        //     creator_id: user_id,
        //     subscriber_id: singer_id,
        //     status: action,
        // }));
        fetch("http://localhost:3000/subscription/update/", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                creator_id: singer_id,
                subscriber_id: user_id,
                status: action,
            }),
        })
            .then(res => res.json())
            .then(data => {
                // use request
                // console.log(data);
                setSubsList(subsList.filter((item: any) => (item.creator_id !== singer_id || item.subscriber_id !== user_id)));
            })
            .catch(err => console.log("error:", err));
    };

    return (
        <>
            <div className='row' style={{"--bgcolor": status === 1 ? "rgba(255, 0, 0, 0.3)" : status === 0 ? "rgba(255, 255, 255, 0.3)" : "rgba(30, 215, 96, 0.3)"} as React.CSSProperties} onClick={() => setOpenModal(true)}>
                <div className='rowTextLight no1'>{num}</div>
                <div className='rowTextLight no2'>{nameUser}</div>
                <div className='rowTextLight no3'>{nameSinger}</div>
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