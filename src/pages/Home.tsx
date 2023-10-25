import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Fly.css';
import HomeContainer from '../components/HomeContainer';

const Home: React.FC = () => {
  return (
    <IonContent>
      <HomeContainer />
    </IonContent>
  );
};

export default Home;
