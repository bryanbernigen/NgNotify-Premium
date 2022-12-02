import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './pagination.css'

const Pagination = ({ totalPage, currentPage, setCurrentPage }: { totalPage: number, currentPage: number, setCurrentPage: any }) => {
    const paginationRange = Array.from({length: totalPage}, (_, i) => i);

    const onNext = () => {
        if (currentPage !== totalPage) {
            setCurrentPage(currentPage+1);
        }
    };

    const onPrevious = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage-1);
        }
    };

    const onChangePage = ({numpg}: {numpg: number}) => {
        setCurrentPage(numpg);
    }

    return (
        <div className='paginationCt'>
            <div className="page-item">
                <div className="page-link" onClick={onPrevious}>
                    <FaAngleLeft className='pageNav'/>
                </div>
            </div>
            {paginationRange.map((_e, i) => {
                return(
                    <>
                        {   i+1 === currentPage ?
                                <div className="pageCurr" key={i} >{i+1}</div>
                            :
                                <div className="page" key={i} onClick={() => {onChangePage({numpg: i+1})}}>{i+1}</div>
                        }
                    </>
                );
            })}
            <div className="page-item">
                <div className="page-link" onClick={onNext}>
                    <FaAngleRight className='pageNav'/>
                </div>
            </div>
        </div>
    );
};

export default Pagination;