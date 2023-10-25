import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Fly.css';
import HomeContainer from '../components/HomeContainer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HomeContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
