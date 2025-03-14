
import Header from './showing_components/header';
import UpcomingContests from './showing_components/upcomingContests';
import UserCard from './showing_components/userCard';
import Friends from './showing_components/friends';
import { Col, Container, Row } from 'react-bootstrap';
export default function HomePage() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs={10}>
            <UserCard />
            <UpcomingContests />            
          </Col>
          <Col xs={2}>
            <Friends />
          </Col>
        </Row>
      </Container>
    </>
  );
}