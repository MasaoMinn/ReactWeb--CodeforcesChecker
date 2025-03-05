
import Header from './showing_components/header';
import UpcomingContests from './showing_components/upcomingContests';
import UserCard from './showing_components/userCard';
export default function HomePage() {
  return (
    <>
      <Header />
      <UserCard />
      <UpcomingContests />
    </>
  );
}