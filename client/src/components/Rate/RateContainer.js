import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import rate from '../../assets/images/rate.png'
import Pagination from '../common/Pagination';
import RateItem from './RateItem';
import RatePost from './RatePost';
import ViewAllReviewHook from '../../hooks/review/view-all-review-hook';
import { useParams } from 'react-router-dom';
const RateContainer = ({ rateAvg, rateQty }) => {
    const { id } = useParams()
    const [allReview, onPress] = ViewAllReviewHook(id)

    return (
        <div className=''>
            <div className="flex items-center gap-2 mb-4">
                    <div className="text-[#1A3F60] font-extrabold text-lg">التقيمات</div>
                    <img src={rate} alt="" height="16px" width="16px" />
                    <div className="bg-[#1A3F60] text-white text-xs font-bold px-2.5 py-1 rounded-full">{rateAvg || 0}</div>
                    <div className="text-gray-500 text-xs font-bold">({`${rateQty || 0} تقييم`})</div>
            </div>

            <div className="bg-[#F2F8FD] rounded-2xl border border-[#DAEBF7] p-3 mb-4">
                <RatePost />
            </div>

            <div className="space-y-3">
            {allReview.data ? (allReview.data.map((review, index) => {
                return (<div key={index} className="bg-white rounded-2xl border border-[#DAEBF7] p-3 shadow-sm"><RateItem review={review} /></div>)
            })) : <div className="text-center text-gray-500 text-sm py-6 bg-[#F2F8FD] rounded-2xl border border-dashed border-[#DAEBF7]">لا يوجد تقييمات الآن</div>}
            </div>


            {
                allReview.paginationResult && allReview.paginationResult.numberOfPages >= 2 ? (<div className="mt-4"><Pagination pageCount={allReview.paginationResult ? allReview.paginationResult.numberOfPages : 0} onPress={onPress} /></div>) : null
            }
        </div>
    )
}

export default RateContainer
