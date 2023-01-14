import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Carousel } from 'antd';
import Spinner from './Spinner';

function Slider() {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchListings = async () => {
			const listingsRef = collection(db, 'listings');
			const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
			const querySnap = await getDocs(q);

			let listings = [];

			querySnap.forEach(doc => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listings);
			setLoading(false);
		};
		fetchListings();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (listings.length === 0) {
		return <></>;
	}

	return (
		listings && (
			<>
				<p className='exploreHeading'>Recommended</p>

				<Carousel
					effect='fade'
					dots
					autoplay>
					{listings.map(({ data, id }) => (
						<div
							key={id}
							onClick={() => navigate(`/category/${data.type}/${id}`)}
							style={{}}>
							<div
								style={{
									borderRadius: '14px',
									background: `url(${data.imgUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
									height: '25vh',
									color: 'white',
								}}>
								<div>
									<p
										className='carouselSlideText'
										style={{
											backgroundColor: 'rgba(0, 0, 0, 0.2)',
											borderTopLeftRadius: '14px',
											borderTopRightRadius: '14px',
											paddingInline: '40px',
											fontWeight: '600',
										}}>
										{data.name} -  
										${data.discountedPrice ?? data.regularPrice}{' '} 
										{data.type === 'rent' && '/ month'}
									</p>
									<p
										className='carouselSLidePrice'
										style={{
											backgroundColor: 'rgba(0, 0, 0, 0.2)',
										}}>
										
										
									</p>
								</div>
							</div>
						</div>
					))}
				</Carousel>
			</>
		)
	);
}

export default Slider;
