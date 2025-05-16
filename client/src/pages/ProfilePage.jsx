import UserProfile from '../components/profile/UserProfile';

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Your Profile</h1>
      </div>

      <div className="profile-content">
        <UserProfile />
      </div>
    </div>
  );
}

export default ProfilePage;