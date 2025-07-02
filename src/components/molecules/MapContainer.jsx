import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Rating from '@/components/atoms/Rating';
import Badge from '@/components/atoms/Badge';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (verified = false) => {
  const iconHtml = `
    <div style="
      background: ${verified ? '#10b981' : '#3b82f6'};
      border: 3px solid white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
      <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    className: 'custom-marker'
  });
};

const TutorMapContainer = ({ tutors, onViewProfile, onBookNow, height = '500px', center = null, zoom = 6 }) => {
  useEffect(() => {
    // Prevent map from being focusable
    const mapContainer = document.querySelector('.leaflet-container');
    if (mapContainer) {
      mapContainer.setAttribute('tabindex', '-1');
    }
  }, []);

  // Calculate center and zoom based on tutors if not provided
  const getMapCenter = () => {
    if (center) return center;
    if (tutors.length === 0) return [30.3753, 69.3451]; // Pakistan center
    if (tutors.length === 1) return [tutors[0].latitude, tutors[0].longitude];
    
    // Calculate center from all tutors
    const latSum = tutors.reduce((sum, tutor) => sum + tutor.latitude, 0);
    const lngSum = tutors.reduce((sum, tutor) => sum + tutor.longitude, 0);
    return [latSum / tutors.length, lngSum / tutors.length];
  };

  const getMapZoom = () => {
    if (zoom !== 6) return zoom;
    if (tutors.length <= 1) return 12;
    if (tutors.length <= 5) return 8;
    return 6;
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <MapContainer
        center={getMapCenter()}
        zoom={getMapZoom()}
        style={{ height, width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {tutors.length > 1 ? (
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            iconCreateFunction={(cluster) => {
              const count = cluster.getChildCount();
              return L.divIcon({
                html: `<div style="
                  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                  border: 3px solid white;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: 14px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                ">${count}</div>`,
                className: 'custom-cluster-icon',
                iconSize: [40, 40],
              });
            }}
          >
            {tutors.map((tutor) => (
              <Marker
                key={tutor.Id}
                position={[tutor.latitude, tutor.longitude]}
                icon={createCustomIcon(tutor.verified)}
              >
                <Popup className="tutor-popup" maxWidth={280}>
                  <div className="p-2">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-semibold text-lg">
                          {tutor.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{tutor.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Rating rating={tutor.rating} size="sm" />
                          <span className="text-sm text-gray-600">({tutor.reviewCount})</span>
                        </div>
                        {tutor.verified && (
                          <Badge variant="success" className="text-xs">
                            <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                        {tutor.city}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
                        {tutor.experience} years experience
                      </div>
                      <div className="text-lg font-bold text-primary-600">
                        ₨{tutor.hourlyRate}/hour
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects?.slice(0, 2).map((subject, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {subject}
                          </span>
                        ))}
                        {tutor.subjects?.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{tutor.subjects.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => onViewProfile && onViewProfile(tutor.Id)}
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => onBookNow && onBookNow(tutor.Id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          tutors.map((tutor) => (
            <Marker
              key={tutor.Id}
              position={[tutor.latitude, tutor.longitude]}
              icon={createCustomIcon(tutor.verified)}
            >
              <Popup className="tutor-popup" maxWidth={280}>
                <div className="p-2">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-semibold text-lg">
                        {tutor.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{tutor.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Rating rating={tutor.rating} size="sm" />
                        <span className="text-sm text-gray-600">({tutor.reviewCount})</span>
                      </div>
                      {tutor.verified && (
                        <Badge variant="success" className="text-xs">
                          <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                      {tutor.city}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
                      {tutor.experience} years experience
                    </div>
                    <div className="text-lg font-bold text-primary-600">
                      ₨{tutor.hourlyRate}/hour
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects?.slice(0, 2).map((subject, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {subject}
                        </span>
                      ))}
                      {tutor.subjects?.length > 2 && (
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{tutor.subjects.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {onViewProfile && onBookNow && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => onViewProfile(tutor.Id)}
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => onBookNow(tutor.Id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default TutorMapContainer;